import glob
from dataclasses import dataclass
from typing import Self
import datetime as dt
from bs4 import BeautifulSoup
import sys

MAX_DESCRIPTION_LEN: int = 120


@dataclass
class BlogPost:
    title: str
    date: dt.date
    path: str
    description: str

    @classmethod
    def from_path(cls, path: str) -> Self:
        """Create a blog post from its path."""

        with open(path, "r") as file:
            soup = BeautifulSoup(file, "html.parser")

        title = soup.select_one("main h1")
        if title is None:
            raise ValueError("Blog post does not have a title.")

        first_paragraph = soup.select_one("p")
        if first_paragraph is None:
            raise ValueError("Blog post does not even have a paragraph tag.")

        return cls(
            path=path,
            date=dt.date.fromisoformat("-".join(path.split("/")[-4:-1])),
            title=title.text,
            description=first_paragraph.text[: MAX_DESCRIPTION_LEN - 1] + "...",
        )

    def to_rss(self) -> str:
        """Converts this blog to an RSS post item format."""
        # TODO self.path is probably not the right way of doing this
        date_and_time = dt.datetime(year=self.date.year, month=self.date.month, day=self.date.day)
        ctime = date_and_time.ctime()
        pub_date = f"{ctime[0:3]}, {date_and_time.day:02d} {ctime[4:7]} " + date_and_time.strftime("%Y %H:%M:%S %z")

        rss = f"<item>\n\t<title>{self.title}</title>\n\t<link>https://linguini1.github.io/{self.path}</link>"
        rss += f"\n\t<description>{self.description}</description>\n\t<pubDate>{pub_date}</pubDate>\n</item>"
        return BeautifulSoup(rss, "xml").prettify()

    def to_html(self) -> str:
        """Turn the blog post into its HTML entry representation."""
        return f"""
            <div class="blog-entry">
                <div class="blog-entry-title-container">
                    <a href="/{self.path}">{self.title}</a>
                    <p class="blog-entry-date">{self.date}</p>
                </div>
                <p class="blog-entry-description">{self.description}</p>
            </div>
        """


def main() -> None:

    if len(sys.argv) < 3:
        print("Usage: update_articles.py <blog-directory> <blog-homepage.html>")

    # Get arguments passed
    blog_dir = sys.argv[1]  # The directory where blog posts are located
    blog_html = sys.argv[2]  # The HTML file where blog posts should be listed

    # Get blog posts
    post_paths: list[str] = glob.glob(f"{blog_dir}/**/*.html", recursive=True)

    # Remove index.html files
    for post in post_paths:
        if "index.html" in post:
            post_paths.remove(post)

    # Create posts
    blog_posts: list[BlogPost] = [BlogPost.from_path(p) for p in post_paths]

    # Add the posts to the RSS feed
    rss_feed = BeautifulSoup(
        """
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
       <title>Matteo Golin's Blog</title>
       <description>Matteo Golin's Blog</description>
       <link>https://linguini1.github.io/</link>
    </channel>
    </rss>""",
        "xml",
    )
    rss_tag = rss_feed.select_one("rss")

    for post in blog_posts:
        rss_tag.append(BeautifulSoup(post.to_rss(), "xml"))  # type:ignore

    with open("rss.xml", "w") as file:
        file.write(rss_feed.prettify())

    # Add the posts to the blog page

    with open(blog_html, "r") as file:
        soup = BeautifulSoup(file, "html.parser")

    # Get the location to put the post entries
    post_container = soup.select_one("#blog-posts")
    if post_container is None:
        raise ValueError("Blog HTML file does not contain #blog-posts")

    # Add the entries
    post_container.clear()
    for post in blog_posts:
        post_container.append(BeautifulSoup(post.to_html(), "html.parser"))

    with open(blog_html, "w") as file:
        file.write(soup.prettify())


if __name__ == "__main__":
    main()

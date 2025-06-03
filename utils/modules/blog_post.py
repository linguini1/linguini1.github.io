"""
Module for dealing with blog posts.
"""

import glob
from typing import Self
import datetime as dt
from bs4 import BeautifulSoup

DEFAULT_MAX_DESC_LEN: int = 1024  # Default maximum description length
RSS_DATETIME_FORMAT: str = "%Y %H:%M:%S %z"
SITE_LINK: str = "https://linguini1.github.io"


class BlogPost:
    """
    Represents a blog post.
    """

    def __init__(self, title: str, date: dt.date, file_path: str, description: str) -> None:
        """
        Initialize a new blog post object.
        :param title: Title of the blog post
        :param date: Date the blog post was written
        :param description: Blog post's description
        :param file_path: File path to the blog post original file
        """

        self.title: str = title
        self.__description: str = description
        self.__path: str = file_path
        self.date: dt.date = date

    def description(self, max_len: int = DEFAULT_MAX_DESC_LEN) -> str:
        """
        :param max_len: The maximum allowed length of description. Must be greater than 3.
        :return: The description of the blog post, truncated to `max_len`
        """

        if max_len < 3:
            raise ValueError(f"max_len of '{max_len}' less than 3")

        return self.__description[: max_len - 3] + "..."

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
            raise ValueError("Blog post does not have a paragraph tag to use for the description.")

        return cls(
            file_path=path,
            date=dt.date.fromisoformat("-".join(path.split("/")[-4:-1])),
            title=title.text,
            description=first_paragraph.text,
        )

    def __rss_pubdate(self) -> str:
        """
        Generate the RSS publish-time string.
        :return: The publish date of the blog post in RSS `pubDate` format.
        """

        date_and_time = dt.datetime(year=self.date.year, month=self.date.month, day=self.date.day)
        ctime = date_and_time.ctime()

        return f"{ctime[0:3]}, {date_and_time.day:02d} {ctime[4:7]} " + date_and_time.strftime(RSS_DATETIME_FORMAT)

    def rss_entry(self) -> str:
        """
        Creates an XML RSS entry for this blog post.
        :return: A string containing the XML RSS entry for this blog post.
        """

        # TODO self.path is probably not the right way of selecting the actual path

        rss = f"""
        <item>
            <title>{self.title}</title>
            <author>Matteo Golin</author>
            <link>{SITE_LINK}/{self.__path}</link>
            <description>{self.description()}</descripton>
            <pubDate>{self.__rss_pubdate()}</pubDate>
        </item>
        """

        return BeautifulSoup(rss, "xml").prettify()

    def post_link_entry(self) -> str:
        """
        Turns the blog post into an HTML entry for the main blog post listing page.
        :return: Blog post as an HTML entry.
        """
        # TODO: make this a template that can be loaded from an HTML file, so code doesn't need editing for this
        return f"""
            <div class="blog-entry">
                <div class="blog-entry-title-container">
                    <a href="/{self.__path}">{self.title}</a>
                    <p class="blog-entry-date">{self.date}</p>
                </div>
                <p class="blog-entry-description">{self.description()}</p>
            </div>
        """


def get_blogposts(blogdir: str) -> list[BlogPost]:
    """
    Makes blog objects for all blog posts in a directory structured by yy/mm/dd/post.html.
    :param blogdir: A blog directory structured by yy/mm/dd/post.html.
    :return: A list of the blogs in the directory as BlogPost objects.
    """

    post_paths: list[str] = glob.glob(f"{blogdir}/**/*.html", recursive=True)

    # Remove any page that is an `index.html` file

    for post in post_paths:
        if "index.html" in post:
            post_paths.remove(post)

    # Create posts
    return [BlogPost.from_path(p) for p in post_paths]

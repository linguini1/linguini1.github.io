from bs4 import BeautifulSoup
from .modules.blog_post import BlogPost


def update_blogpage(posts: list[BlogPost], blogpage: str, container_id: str) -> None:
    """
    Adds post entries to the blog page inside element with ID `container_id`.
    :param posts: The blog posts to add.
    :param blogpage: The blog listing home page.
    :param container_id: The ID of the HTML element within which to put the post entries.
    """
    # Add the posts to the blog page

    with open(blogpage, "r") as file:
        blog_soup = BeautifulSoup(file, "html.parser")

    # Get the location to put the post entries
    post_container = blog_soup.select_one(f"#{container_id}")
    if post_container is None:
        raise ValueError(f"Blog HTML file does not contain #{container_id}")

    # Add the entries
    post_container.clear()
    for post in posts:
        post_container.append(BeautifulSoup(post.post_link_entry(), "html.parser"))

    with open(blogpage, "w") as file:
        file.write(blog_soup.prettify())


def update_rss(posts: list[BlogPost], rss: str) -> None:
    """
    Reads all the blog posts from the blogs directory and adds them to the RSS feed.
    :param posts: The blog posts to add to the RSS file
    :param rss: The RSS file for the blog
    """

    with open(rss, "r") as file:
        rss_feed = BeautifulSoup(file, "xml")

    rss_tag = rss_feed.select_one("rss")
    if rss_tag is None:
        raise ValueError(f"RSS feed file '{rss}' is missing the 'rss' tag.")

    rss_tag.clear()

    for post in posts:
        rss_tag.append(BeautifulSoup(post.rss_entry(), "xml"))

    # Overwrite RSS feed with new changes
    with open(rss, "w") as file:
        file.write(rss_feed.prettify())


def html_string(template: str, target: str, substr: str) -> None:
    """
    Turn an HTML file into a string and substitute it into a file.
    :param template: The HTML file containing the template
    :param target: The file containing `substr` to be replace with HTML
    :param substr: The string to replace in the target file with the stringified `template`
    """

    # Load the template as a string
    with open(template, "r") as file:
        template_str = file.read()

    # Load the target file and substitute the strings
    with open(target, "r") as file:
        target_str = file.read()
        target_str = target_str.replace(substr, template_str)

    # Write the target back
    with open(target, "w") as file:
        file.write(target_str)

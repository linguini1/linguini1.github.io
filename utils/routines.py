import copy
from bs4 import BeautifulSoup, Tag
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
        file.write(blog_soup.prettify(formatter="html"))


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
        file.write(rss_feed.prettify(formatter="html"))


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


def inject_navbar(nav_template: str, files: list[str]) -> None:
    """
    Injects the HTML required for the navbar into the HTML files. Injects the navbar as the first element in the <body>
    tag.
    :param nav_template: The HTML file containing the template for the navbar to be included everywhere.
    :param files: The list of files to inject the navbar into.
    """

    with open(nav_template, "r") as file:
        nav = BeautifulSoup(file, "html.parser")

    # Inject it into all the files
    for page in files:

        with open(page, "r") as file:
            soup = BeautifulSoup(file, "html.parser")

        # Check if the navbar item is already there, in which case we should remove it

        existing_nav = soup.find("div", {"id": "navbar"})
        if existing_nav is not None:
            existing_nav.extract()

        # Add the navbar template to the beginning of the body

        body = soup.find("body")
        if body is None:
            raise ValueError(f"Page {page} does not have a body tag!")

        body.insert(0, copy.copy(nav))

        with open(page, "w") as file:
            file.write(soup.prettify(formatter="html"))


def inject_title(title_template: str, files: list[str]) -> None:
    """
    Injects the HTML required for the title into the HTML files. Injects the title as the first element in the <body>
    tag.
    :param nav_template: The HTML file containing the template for the title to be included everywhere.
    :param files: The list of files to inject the title into.
    """

    with open(title_template, "r") as file:
        title = BeautifulSoup(file, "html.parser")

    # Inject it into all the files
    for page in files:

        with open(page, "r") as file:
            soup = BeautifulSoup(file, "html.parser")

        # Check if the title item is already there, in which case we should remove it

        existing_title = soup.find("h1", {"id": "site-title"})
        if existing_title is not None:
            existing_title.extract()

        # Add the title template to the beginning of the body

        body = soup.find("body")
        if body is None:
            raise ValueError(f"Page {page} does not have a body tag!")

        body.insert(0, copy.copy(title))

        with open(page, "w") as file:
            file.write(soup.prettify(formatter="html"))


def inject_head(head: str, files: list[str]) -> None:
    """
    Injects the HTML required for the <head> tag into the <head> tag of each page.
    :param head: The HTML file containing the tags to be included in the <head> tag.
    :param files: The list of files to inject the head into.
    """

    with open(head, "r") as file:
        head_data = BeautifulSoup(file, "html.parser")

    # Inject it into all the files
    for page in files:

        with open(page, "r") as file:
            soup = BeautifulSoup(file, "html.parser")

        # Check if the page has a head tag

        head_tag = soup.find("head")
        if head_tag is None:
            raise ValueError(f"Page {page} does not have a head tag!")

        # If duplicate tags exist, remove them
        for tag in head_data.find_all(recursive=False):
            if type(tag) is not Tag:
                continue

            for existing_tag in head_tag.find_all(recursive=False):
                if type(existing_tag) is not Tag:
                    continue

                # Remove existing tag if its identical to tag being added
                if existing_tag.name == tag.name and dict(existing_tag.attrs) == dict(tag.attrs):
                    existing_tag.extract()

        # Add the title template to the beginning of the body

        head_tag.append(copy.copy(head_data))

        with open(page, "w") as file:
            file.write(soup.prettify(formatter="html"))

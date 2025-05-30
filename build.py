from utils.modules.blog_post import get_blogposts
from utils.routines import html_string, update_blogpage, update_rss
import shutil

PROD_NAVBAR_SCRIPT: str = "scripts/navbar.js"  # Production navbar.js script


def main() -> None:

    # Load in all the blog posts and order from newest to oldest

    blogposts = get_blogposts(blogdir="blog/")
    blogposts.sort(key=lambda x: x.date, reverse=True)

    update_blogpage(posts=blogposts, blogpage="blog.html", container_id="blog-posts")
    update_rss(posts=blogposts, rss="rss.xml")

    # Generate the navbar.js script with the navbar html
    shutil.copy("templates/navbar.js", PROD_NAVBAR_SCRIPT)
    html_string(template="templates/navbar.html", target=PROD_NAVBAR_SCRIPT, substr="NAVBAR_GOES_HERE")


if __name__ == "__main__":
    main()

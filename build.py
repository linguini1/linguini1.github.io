from utils.modules.blog_post import get_blogposts
from utils.routines import inject_navbar, inject_title, update_blogpage, update_rss
import glob

PROD_NAVBAR_SCRIPT: str = "scripts/navbar.js"  # Production navbar.js script


def main() -> None:

    # Load in all the blog posts and order from newest to oldest

    blogposts = get_blogposts(blogdir="blog/")
    blogposts.sort(key=lambda x: x.date, reverse=True)

    update_blogpage(posts=blogposts, blogpage="blog.html", container_id="blog-posts")
    update_rss(posts=blogposts, rss="rss.xml")

    # Get all HTML files for template injection
    pages = glob.glob("**/*.html", recursive=True)

    # Ignore template files
    pages = list(filter(lambda p: not p.startswith("templates/"), pages))

    # Inject HTML additions to all pages
    inject_navbar(nav_template="templates/navbar.html", files=pages)
    inject_title(title_template="templates/title.html", files=pages)


if __name__ == "__main__":
    main()

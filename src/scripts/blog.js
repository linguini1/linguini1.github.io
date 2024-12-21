/* Create a blog post component with the blog information */
function create_blog_listing(blog) {
    let container = document.createElement("div");
    container.className = "blog-entry";

    let link = document.createElement("a");
    link.href = `/src/blog/${blog.url}`;
    link.textContent = blog.title;

    let date = document.createElement("p");
    date.textContent = blog.published;
    date.className = "blog-entry-date";

    let title_container = document.createElement("div");
    title_container.className = "blog-entry-title-container";

    title_container.appendChild(link);
    title_container.appendChild(date);

    let description = document.createElement("p");
    description.textContent = blog.description;
    description.className = "blog-entry-description";

    container.appendChild(title_container);
    container.appendChild(description);

    return container;
}

/* Blog archive navigation */
function create_blog_nav(dirstructure) {
    let nav = document.createElement("nav");
    nav.id = "blog-nav";

    let title = document.createElement("h3");
    title.textContent = "Archives";

    nav.appendChild(title);

    let years = document.createElement("ul");
    years.className = "blog-nav-years";

    nav.appendChild(years);

    /* Create all the year entries */

    for (let i = 0; i < dirstructure.length; i++) {
        let year = document.createElement("li");
        year.textContent = dirstructure[i].year;

        let months = document.createElement("ul");
        months.className = "blog-nav-months";

        year.appendChild(months);

        years.appendChild(year);

        /* Create all the month entries */

        for (let j = 0; j < dirstructure[i].months.length; j++) {
            let month = document.createElement("li");
            month.textContent = String(dirstructure[i].months[j]).padStart(2, "0");
            months.appendChild(month);
        }
    }
    return nav;
}

window.addEventListener("load", () => {
    let blog_posts = [
        {
            title: "Test post",
            description: "This is a test description limited to 12 words.",
            published: "2024-12-21",
            url: "2024/12/21/some_blog_post.html",
        },
        {
            title: "Test post 2",
            description: "This is a test description limited to 12 words.",
            published: "2024-12-21",
            url: "2024/12/21/some_blog_post.html",
        },
        {
            title: "Test post 3",
            description: "This is a test description limited to 12 words.",
            published: "2024-12-21",
            url: "2024/12/21/some_blog_post.html",
        },
        {
            title: "Test post 4",
            description: "This is a test description limited to 12 words.",
            published: "2024-12-21",
            url: "2024/12/21/some_blog_post.html",
        },
    ];

    let dirstructure = [
        {
            year: 2024,
            months: [11, 12],
        },
        {
            year: 2025,
            months: [1],
        },
    ];

    let navbar = create_blog_nav(dirstructure);
    document.getElementById("blog-blurb").appendChild(navbar);

    for (let i = 0; i < blog_posts.length; i++) {
        document.getElementById("blog-posts").appendChild(create_blog_listing(blog_posts[i]));
    }
});

const PAGES = [
    { name: "Home", file: "index.html" },
    { name: "About", file: "about.html" },
];

function create_page_link(page, url) {
    let link = document.createElement("a");
    link.href = url;
    link.innerText = page;
    return link;
}

function create_pages() {
    let pages = document.createElement("div");
    pages.id = "navbar-pages";
    for (let i = 0; i < PAGES.length; i++) {
        pages.appendChild(create_page_link(PAGES[i].name, `/src/pages/${PAGES[i].file}`));
    }
    return pages;
}

function create_socials() {
    // TODO
    let socials = document.createElement("div");
    socials.id = "navbar-socials";
    return socials;
}

function swap_colour() {
    let root = document.documentElement;
    let styles = getComputedStyle(root);

    /* Swap the CSS colours in the root element */
    let bg = styles.getPropertyValue("--bg");
    let fg = styles.getPropertyValue("--fg");
    root.style.setProperty("--fg", bg);
    root.style.setProperty("--bg", fg);

    /* Toggle the slider back and forth */
    let ball = document.getElementById("navbar-toggle-ball");
    ball.className = ball.className ? "" : "toggled";
}

function create_toggle() {
    let container = document.createElement("div");
    container.id = "navbar-toggle";

    let ball = document.createElement("div");
    ball.id = "navbar-toggle-ball";
    ball.className = "";
    ball.onclick = swap_colour;

    let socket = document.createElement("div");
    socket.id = "navbar-toggle-socket";

    container.appendChild(ball);
    container.appendChild(socket);
    return container;
}

function create_navbar() {
    let navbar = document.createElement("nav");
    navbar.id = "navbar";
    navbar.appendChild(create_toggle());
    navbar.appendChild(create_pages(["Home", "About"]));
    navbar.appendChild(create_socials());
    return navbar;
}

function create_title() {
    let title = document.createElement("h1");
    title.textContent = "Matteo Golin";
    title.id = "site-title";
    return title;
}

function populate_header() {
    let body = document.getElementsByTagName("body")[0];
    body.prepend(create_navbar());
    body.prepend(create_title());
}

window.onload = () => {
    populate_header();
};

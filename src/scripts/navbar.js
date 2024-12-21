/* Usable themes */
const THEMES = [
    {
        name: "Monitor Glow",
        link: "https://lospec.com/palette-list/1bit-monitor-glow",
        light: "#f0f6f0",
        dark: "#222323",
    },
    {
        name: "IBM 8503",
        link: "https://lospec.com/palette-list/obra-dinn-ibm-8503",
        light: "#ebe5ce",
        dark: "#2e3037",
    },
    {
        name: "IBM 51",
        link: "https://lospec.com/palette-list/ibm-51",
        light: "#d3c9a1",
        dark: "#323c39",
    },
    {
        name: "IBM 5151",
        link: "https://lospec.com/palette-list/obra-dinn-ibm-5151",
        light: "#01eb5f",
        dark: "#25342f",
    },
    {
        name: "Paperback",
        link: "https://lospec.com/palette-list/paperback-2",
        light: "#b8c2b9",
        dark: "#382b26",
    },
    {
        name: "Giolitti",
        link: "https://lospec.com/palette-list/ys-neutral-green",
        light: "#ffeaf9",
        dark: "#004c3d",
    },
    {
        name: "Mac Paint",
        link: "https://lospec.com/palette-list/mac-paint",
        light: "#8bc8fe",
        dark: "#051b2c",
    },
    {
        name: "Note 2C",
        link: "https://lospec.com/palette-list/note-2c",
        light: "#edf2e2",
        dark: "#222a3d",
    },
    {
        name: "Casio",
        link: "https://lospec.com/palette-list/casio-basic",
        light: "#83b07e",
        dark: "#000000",
    },
    {
        name: "Endgame",
        link: "https://lospec.com/palette-list/st-1-bit-endgame",
        light: "#dcf29d",
        dark: "#1b1233",
    },
    {
        name: "Nokia 3310",
        link: "https://lospec.com/palette-list/nokia-3310",
        light: "#c7f0d8",
        dark: "#43523d",
    },
    {
        name: "Paper & Dust",
        link: "https://lospec.com/palette-list/ys-paper-and-dust",
        light: "#cb9e6a",
        dark: "#252932",
    },
    {
        name: "Iron Blues",
        link: "https://lospec.com/palette-list/iron-blues",
        light: "#e4e8d1",
        dark: "#596e79",
    },
    {
        name: "Bluerown",
        link: "https://lospec.com/palette-list/bluerown-1bit",
        light: "#b4e7ef",
        dark: "#af5534",
    },
    {
        name: "Ongbit",
        link: "https://lospec.com/palette-list/ongbit",
        light: "#ed8463",
        dark: "#151d24",
    },
    {
        name: "Sprite 0",
        link: "",
        light: "#eae6d6",
        dark: "#097941",
    },
];

/* Navigable pages */

const PAGES = [
    { name: "Home", file: "index.html" },
    { name: "About", file: "about.html" },
    { name: "Blog", file: "blog.html" },
];

/* Create header elements */

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

function get_dark_mode() {
    let darkmode = localStorage.getItem("darkmode");

    /* Dark mode by default */
    if (darkmode == null) {
        localStorage.setItem("darkmode", true);
        return true;
    }
    return JSON.parse(darkmode);
}

function get_theme() {
    let theme = localStorage.getItem("theme");
    /* First theme by default */
    if (theme == null) {
        set_theme(THEMES[0]);
        return THEMES[0];
    }
    return JSON.parse(theme);
}

function set_theme(theme) {
    localStorage.setItem("theme", JSON.stringify(THEMES[0]));
}

function set_colours(bg, fg) {
    let root = document.documentElement;

    /* Set the CSS colours in the root element */

    root.style.setProperty("--fg", fg);
    root.style.setProperty("--bg", bg);
}

function swap_colour() {
    let root = document.documentElement;
    let styles = getComputedStyle(root);

    /* Swap the CSS colours in the root element */

    let bg = styles.getPropertyValue("--bg");
    let fg = styles.getPropertyValue("--fg");
    set_colours(fg, bg);

    /* Toggle dark mode */
    let darkmode = get_dark_mode();
    darkmode = !darkmode;
    localStorage.setItem("darkmode", darkmode);

    /* Toggle the slider back and forth */

    let ball = document.getElementById("navbar-toggle-ball");
    ball.className = darkmode ? "" : "toggled";
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

window.onload = () => {
    /* Load the last theme properly */
    let theme = get_theme();
    const darkmode = get_dark_mode();
    if (darkmode) {
        set_colours(theme.dark, theme.light);
    } else {
        set_colours(theme.light, theme.dark);
    }

    /* Inject the navbar and site title */
    let body = document.getElementsByTagName("body")[0];
    body.prepend(create_navbar());
    body.prepend(create_title());

    /* Toggle the slider according to dark mode */
    let ball = document.getElementById("navbar-toggle-ball");
    ball.className = darkmode ? "" : "toggled";
};

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
    { name: "Home", file: "/" },
    { name: "About", file: "/about.html" },
    { name: "Blog", file: "/blog.html" },
];

const SOCIALS = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/matteo-golin-94118021b/",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
    },
    {
        name: "GitHub",
        url: "https://github.com/linguini1/",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    },
];

/* Create header elements */

function create_page_link(page, url) {
    let link = document.createElement("a");
    link.href = url;
    link.innerText = page;
    link.className = "raise-button";
    return link;
}

function create_pages() {
    let pages = document.createElement("div");
    pages.id = "navbar-pages";
    for (let i = 0; i < PAGES.length; i++) {
        pages.appendChild(create_page_link(PAGES[i].name, PAGES[i].file));
    }
    return pages;
}

function create_socials() {
    // TODO
    let socials = document.createElement("div");
    socials.id = "navbar-socials";

    for (let i = 0; i < SOCIALS.length; i++) {
        let link = document.createElement("a");
        link.href = SOCIALS[i].url;
        link.innerHTML = SOCIALS[i].svg;
        link.className = "raise-button";
        socials.appendChild(link);
    }

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
    localStorage.setItem("theme", JSON.stringify(theme));
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

function create_theme_menu() {
    let modal = document.createElement("div");
    modal.id = "theme-menu";
    modal.style.display = "none";

    let container = document.createElement("div");
    container.id = "theme-menu-container";
    modal.appendChild(container);

    let menu_title = document.createElement("h1");
    menu_title.textContent = "Pick a theme";
    container.appendChild(menu_title);

    let menu = document.createElement("div");
    menu.id = "theme-menu-content";
    container.appendChild(menu);

    for (let i = 0; i < THEMES.length; i++) {
        let item = document.createElement("button");
        item.className = "raise-button";
        item.textContent = THEMES[i].name;
        item.onclick = () => {
            set_theme(THEMES[i]);
            if (get_dark_mode()) {
                set_colours(THEMES[i].dark, THEMES[i].light);
            } else {
                set_colours(THEMES[i].light, THEMES[i].dark);
            }
        };
        menu.appendChild(item);
    }

    return modal;
}

function create_title() {
    let title = document.createElement("h1");
    title.textContent = "Matteo Golin";
    title.id = "site-title";
    return title;
}

window.addEventListener("load", () => {
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

    /* Add invisible modal */
    let menu = create_theme_menu();
    body.prepend(menu);
});

document.addEventListener("keypress", (e) => {
    e = e || window.event;
    if (e.key == "M") {
        /* Toggle menu visibility */
        let menu = document.getElementById("theme-menu");
        menu.style.display = menu.style.display === "none" ? "flex" : "none";
    } else if (e.key == "D") {
        /* Toggle dark mode */
        swap_colour();
    }
});

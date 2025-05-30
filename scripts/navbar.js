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

window.addEventListener("load", () => {
  /* Load the last theme properly */

  let theme = get_theme();
  const darkmode = get_dark_mode();
  if (darkmode) {
    set_colours(theme.dark, theme.light);
  } else {
    set_colours(theme.light, theme.dark);
  }

  /* Toggle the slider according to dark mode */

  let ball = document.getElementById("navbar-toggle-ball");
  ball.className = darkmode ? "" : "toggled";

  /* Add invisible modal */

  let menu = create_theme_menu();
  let body = document.getElementsByTagName("body")[0];
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

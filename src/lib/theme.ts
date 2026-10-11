export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** The site always opens in dark mode; light mode is opt-in via the toggle. */
export const DEFAULT_THEME: Theme = "dark";

/**
 * Runs before first paint (inlined in <head>): applies the visitor's saved
 * choice, otherwise the dark default, so the page never flashes the wrong theme.
 */
export const themeInitScript = `(function(){var t="${DEFAULT_THEME}";try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");if(s==="light"||s==="dark")t=s;}catch(e){}document.documentElement.dataset.theme=t;})();`;

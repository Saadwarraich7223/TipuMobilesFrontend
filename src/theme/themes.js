export const themes = {
  atelier: {
    id: "atelier",
    label: "Atelier Sand",
  },
  slate: {
    id: "slate",
    label: "Slate Studio",
  },
  bloom: {
    id: "bloom",
    label: "Bloom Paper",
  },
};

export const DEFAULT_THEME = themes.atelier.id;
export const THEME_STORAGE_KEY = "site-theme";

export const getStoredTheme = () => {
  if (typeof window === "undefined") return DEFAULT_THEME;

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme && themes[storedTheme] ? storedTheme : DEFAULT_THEME;
};

export const applyTheme = (themeId) => {
  if (typeof document === "undefined") return;

  const nextTheme = themes[themeId] ? themeId : DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", nextTheme);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }
};

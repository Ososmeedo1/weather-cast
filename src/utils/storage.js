const THEME_KEY = "weather_theme";
const UNIT_KEY = "weather_unit";
const HISTORY_KEY = "weather_recent_searches";

export const getStoredTheme = () => {
  const value = localStorage.getItem(THEME_KEY);
  return value === "dark" ? "dark" : "light";
};

export const setStoredTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getStoredUnit = () => {
  const value = localStorage.getItem(UNIT_KEY);
  return value === "F" ? "F" : "C";
};

export const setStoredUnit = (unit) => {
  localStorage.setItem(UNIT_KEY, unit);
};

export const getStoredRecentSearches = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const setStoredRecentSearches = (searches) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(searches));
};

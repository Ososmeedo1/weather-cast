import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      aria-label="Toggle theme"
    >
      {themeMode === "light" ? "Dark" : "Light"}
    </button>
  );
};

export default ThemeToggle;

const UnitToggle = ({ unit, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      aria-label="Toggle temperature unit"
    >
      {unit === "C" ? "Celsius" : "Fahrenheit"}
    </button>
  );
};

export default UnitToggle;

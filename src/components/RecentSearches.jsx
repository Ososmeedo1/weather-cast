const RecentSearches = ({ searches, onSelect }) => {
  if (!searches.length) {
    return (
      <section>
        <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
          Recent Searches
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">No recent searches yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
        Recent Searches
      </h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onSelect(city)}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
};

export default RecentSearches;

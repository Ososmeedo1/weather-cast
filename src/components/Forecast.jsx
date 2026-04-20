import { toDisplayTemp } from "../utils/temperature";

const Forecast = ({ items, unit }) => {
  if (!items?.length) return null;

  return (
    <section>
      <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
        24-Hour Forecast
      </h3>
      <div className="forecast-scroll flex gap-3 overflow-x-auto pb-2">
        {items.map((item) => (
          <article
            key={item.timestamp}
            className="min-w-[120px] rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-800"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">{item.hourLabel}</p>
            <img
              src={item.iconPath}
              alt={item.hourLabel}
              className="mx-auto my-2 h-10 w-10"
            />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {toDisplayTemp(item.tempC, item.tempF, unit)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Forecast;

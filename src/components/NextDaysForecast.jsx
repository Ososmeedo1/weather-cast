import { toDisplayTemp } from "../utils/temperature";
import { Link } from "react-router-dom";

const NextDaysForecast = ({ items, unit, cityName }) => {
  if (!items?.length) return null;

  return (
    <section>
      <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
        Next Days Forecast
      </h3>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.date}
            to={`/day/${item.date}`}
            state={{ day: item, unit, cityName }}
            className="rounded-xl bg-slate-100 p-4 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.dayLabel}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{item.fullDateLabel}</p>

            <img
              src={item.iconPath}
              alt={item.conditionText}
              className="my-2 h-10 w-10"
            />

            <p className="text-sm text-slate-700 dark:text-slate-300">{item.conditionText}</p>
            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              {toDisplayTemp(item.maxTempC, item.maxTempF, unit)}
              <span className="mx-1 text-slate-400">/</span>
              {toDisplayTemp(item.minTempC, item.minTempF, unit)}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Rain chance: {item.chanceOfRain}%
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NextDaysForecast;

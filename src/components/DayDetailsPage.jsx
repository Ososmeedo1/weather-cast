import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { toDisplayTemp } from "../utils/temperature";

const DayDetailsPage = () => {
  const { themeMode } = useTheme();
  const { state } = useLocation();

  document.documentElement.classList.toggle("dark", themeMode === "dark");

  const day = state?.day;
  const unit = state?.unit || "C";
  const cityName = state?.cityName || "Selected City";

  if (!day) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-900 dark:text-slate-100 sm:px-6">
        <main className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-xl font-semibold">Day Details Unavailable</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Open this page by clicking a day card in the Next Days Forecast section.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900"
          >
            Back to Home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-900 dark:text-slate-100 sm:px-6">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{cityName}</p>
              <h1 className="text-2xl font-semibold">{day.dayLabel} - {day.fullDateLabel}</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{day.conditionText}</p>
            </div>
            <img src={day.iconPath} alt={day.conditionText} className="h-16 w-16" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-700/60">
              <p className="text-xs text-slate-500 dark:text-slate-300">High / Low</p>
              <p className="text-sm font-semibold">
                {toDisplayTemp(day.maxTempC, day.maxTempF, unit)} / {toDisplayTemp(day.minTempC, day.minTempF, unit)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-700/60">
              <p className="text-xs text-slate-500 dark:text-slate-300">Average Temp</p>
              <p className="text-sm font-semibold">{toDisplayTemp(day.avgTempC, day.avgTempF, unit)}</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-700/60">
              <p className="text-xs text-slate-500 dark:text-slate-300">Sunrise / Sunset</p>
              <p className="text-sm font-semibold">{day.sunrise} / {day.sunset}</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-700/60">
              <p className="text-xs text-slate-500 dark:text-slate-300">Rain Chance</p>
              <p className="text-sm font-semibold">{day.chanceOfRain}%</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-700/60">
              <p className="text-xs text-slate-500 dark:text-slate-300">Total Precip</p>
              <p className="text-sm font-semibold">
                {unit === "F" ? `${Math.round(day.totalPrecipIn * 100) / 100} in` : `${Math.round(day.totalPrecipMm)} mm`}
              </p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-700/60">
              <p className="text-xs text-slate-500 dark:text-slate-300">Max Wind</p>
              <p className="text-sm font-semibold">{Math.round(day.maxWindKph)} kph</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-700/60">
              <p className="text-xs text-slate-500 dark:text-slate-300">Avg Humidity</p>
              <p className="text-sm font-semibold">{Math.round(day.avgHumidity)}%</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-700/60">
              <p className="text-xs text-slate-500 dark:text-slate-300">UV Index</p>
              <p className="text-sm font-semibold">{day.uv}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-3 text-lg font-semibold">Hourly Breakdown</h2>
          <div className="forecast-scroll flex gap-3 overflow-x-auto pb-2">
            {(day.hourly || []).map((hour) => (
              <article
                key={hour.timestamp}
                className="min-w-[140px] rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-700/60"
              >
                <p className="text-xs text-slate-500 dark:text-slate-300">{hour.hourLabel}</p>
                <img src={hour.iconPath} alt={hour.conditionText} className="mx-auto my-2 h-10 w-10" />
                <p className="text-sm font-semibold">{toDisplayTemp(hour.tempC, hour.tempF, unit)}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Rain: {hour.chanceOfRain}%</p>
              </article>
            ))}
          </div>
        </section>

        <Link
          to="/"
          className="inline-flex w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900"
        >
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default DayDetailsPage;

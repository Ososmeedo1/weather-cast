import { toDisplayTemp } from "../utils/temperature";

const WeatherCard = ({ weather, unit }) => {
  if (!weather) return null;

  return (
    <section className="rounded-2xl bg-slate-100 p-6 dark:bg-slate-800">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {weather.cityName}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {weather.region}, {weather.country}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Local time: {weather.localTime}
          </p>
        </div>
        <img
          src={weather.iconPath}
          alt={weather.conditionText}
          className="h-16 w-16"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-5xl font-bold text-slate-900 dark:text-slate-100">
            {toDisplayTemp(weather.temperatureC, weather.temperatureF, unit)}
          </p>
          <p className="mt-1 text-base text-slate-700 dark:text-slate-200">
            {weather.conditionText}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.windKph} kph</p>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;

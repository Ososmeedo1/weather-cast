import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import TopNav from "./components/TopNav";
import ThemeToggle from "./components/ThemeToggle";
import UnitToggle from "./components/UnitToggle";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import NextDaysForecast from "./components/NextDaysForecast";
import DayDetailsPage from "./components/DayDetailsPage";
import RecentSearches from "./components/RecentSearches";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import {
  getStoredRecentSearches,
  getStoredUnit,
  setStoredRecentSearches,
  setStoredUnit,
} from "./utils/storage";
import { fetchWeatherByCity } from "./utils/weatherApi";

const WeatherPage = () => {
  const { themeMode } = useTheme();
  const [unit, setUnit] = useState(getStoredUnit());
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState(getStoredRecentSearches());

  document.documentElement.classList.toggle("dark", themeMode === "dark");

  const updateHistory = (city) => {
    const normalized = city.trim();
    const deduped = recentSearches.filter(
      (item) => item.toLowerCase() !== normalized.toLowerCase()
    );
    const next = [normalized, ...deduped].slice(0, 5);
    setRecentSearches(next);
    setStoredRecentSearches(next);
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data.cityWeather);
      setForecast(data.forecast);
      setDailyForecast(data.dailyForecast || []);
      updateHistory(city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = () => {
    const next = unit === "C" ? "F" : "C";
    setUnit(next);
    setStoredUnit(next);
  };

  useEffect(() => {
    const initialCity = recentSearches[0] || "Cairo";
    handleSearch(initialCity);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition dark:bg-slate-900 dark:text-slate-100">
      <TopNav
        searchSlot={<SearchBar onSearch={handleSearch} disabled={loading} />}
        themeSlot={<ThemeToggle />}
        unitSlot={<UnitToggle unit={unit} onToggle={handleUnitToggle} />}
      />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-400/40 dark:bg-red-950 dark:text-red-200">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading weather data...</p>
        ) : null}

        {!weather && !loading && !error ? (
          <p className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            No weather data yet. Search for a city to load current conditions and forecast.
          </p>
        ) : null}

        <WeatherCard weather={weather} unit={unit} />
        <Forecast items={forecast} unit={unit} />
        <NextDaysForecast items={dailyForecast} unit={unit} cityName={weather?.cityName} />
        <RecentSearches searches={recentSearches} onSelect={handleSearch} />
      </main>
    </div>
  );
};

const App = () => {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: (
            <ThemeProvider>
              <WeatherPage />
            </ThemeProvider>
          ),
        },
        {
          path: "/day/:date",
          element: (
            <ThemeProvider>
              <DayDetailsPage />
            </ThemeProvider>
          ),
        },
      ]),
    []
  );

  return <RouterProvider router={router} />;
};

export default App;

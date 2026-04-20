import axios from "axios";
import { mapWeatherCodeToIcon } from "./mapWeatherCodeToIcon";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;

export const fetchWeatherByCity = async (city) => {
  if (!API_KEY || !BASE_URL) {
    throw new Error("Missing Weather API config. Add VITE_WEATHER_API_KEY and VITE_WEATHER_API_BASE_URL in frontend/.env and restart dev server.");
  }

  try {
    const normalizedBaseUrl = BASE_URL.replace(/\/$/, "");
    const response = await axios.get(`${normalizedBaseUrl}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 5,
        aqi: "no",
        alerts: "no",
      },
    });

    const data = response.data;
    const current = data.current;
    const location = data.location;
    const hourData = data.forecast.forecastday[0]?.hour || [];

    const cityWeather = {
      cityName: location.name,
      region: location.region,
      country: location.country,
      localTime: location.localtime,
      conditionCode: current.condition.code,
      conditionText: current.condition.text,
      iconPath: mapWeatherCodeToIcon(current.condition.code, current.is_day),
      temperatureC: current.temp_c,
      temperatureF: current.temp_f,
      humidity: current.humidity,
      windKph: current.wind_kph,
    };

    const forecast = hourData.slice(0, 24).map((hour) => ({
      timestamp: hour.time,
      hourLabel: hour.time.split(" ")[1],
      conditionCode: hour.condition.code,
      iconPath: mapWeatherCodeToIcon(hour.condition.code, hour.is_day),
      tempC: hour.temp_c,
      tempF: hour.temp_f,
      chanceOfRain: hour.chance_of_rain,
    }));

    const dailyForecast = (data.forecast.forecastday || []).slice(1).map((day) => {
      const localDate = new Date(day.date);
      const hourlyItems = (day.hour || []).map((hour) => ({
        timestamp: hour.time,
        hourLabel: hour.time.split(" ")[1],
        conditionCode: hour.condition.code,
        iconPath: mapWeatherCodeToIcon(hour.condition.code, hour.is_day),
        conditionText: hour.condition.text,
        tempC: hour.temp_c,
        tempF: hour.temp_f,
        chanceOfRain: hour.chance_of_rain,
        windKph: hour.wind_kph,
        humidity: hour.humidity,
      }));

      return {
        date: day.date,
        dayLabel: localDate.toLocaleDateString("en-US", { weekday: "short" }),
        fullDateLabel: localDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        conditionCode: day.day.condition.code,
        iconPath: mapWeatherCodeToIcon(day.day.condition.code, 1),
        conditionText: day.day.condition.text,
        maxTempC: day.day.maxtemp_c,
        maxTempF: day.day.maxtemp_f,
        minTempC: day.day.mintemp_c,
        minTempF: day.day.mintemp_f,
        avgTempC: day.day.avgtemp_c,
        avgTempF: day.day.avgtemp_f,
        maxWindKph: day.day.maxwind_kph,
        avgHumidity: day.day.avghumidity,
        uv: day.day.uv,
        totalPrecipMm: day.day.totalprecip_mm,
        totalPrecipIn: day.day.totalprecip_in,
        chanceOfRain: day.day.daily_chance_of_rain,
        sunrise: day.astro?.sunrise || "N/A",
        sunset: day.astro?.sunset || "N/A",
        hourly: hourlyItems,
      };
    });

    return { cityWeather, forecast, dailyForecast };
  } catch (error) {
    const message =
      error?.response?.data?.error?.message ||
      "Unable to fetch weather right now. Please try again.";
    throw new Error(message);
  }
};

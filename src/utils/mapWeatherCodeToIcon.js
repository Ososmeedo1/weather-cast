import clearDay from "../assets/weather-icons/clear-day.svg";
import clearNight from "../assets/weather-icons/clear-night.svg";
import cloudy from "../assets/weather-icons/cloudy.svg";
import rain from "../assets/weather-icons/rain.svg";
import snow from "../assets/weather-icons/snow.svg";
import storm from "../assets/weather-icons/storm.svg";
import mist from "../assets/weather-icons/mist.svg";
import fallback from "../assets/weather-icons/default.svg";

const ICON_MAP = {
  1000: clearDay,
  1003: cloudy,
  1006: cloudy,
  1009: cloudy,
  1030: mist,
  1063: rain,
  1066: snow,
  1087: storm,
  1114: snow,
  1117: snow,
  1135: mist,
  1183: rain,
  1186: rain,
  1189: rain,
  1192: rain,
  1195: rain,
  1210: snow,
  1213: snow,
  1216: snow,
  1219: snow,
  1240: rain,
  1243: rain,
  1273: storm,
  1276: storm,
};

export const mapWeatherCodeToIcon = (code, isDay = 1) => {
  if (code === 1000) {
    return isDay ? clearDay : clearNight;
  }

  return ICON_MAP[code] || fallback;
};

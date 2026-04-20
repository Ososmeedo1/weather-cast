export const toDisplayTemp = (celsius, fahrenheit, unit) => {
  return unit === "F" ? `${Math.round(fahrenheit)}°F` : `${Math.round(celsius)}°C`;
};

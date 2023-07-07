import { formatDay, getWeatherIcon } from "./helper";
export default function Day({ date, max, min, code, isToday }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}° &mdash; <strong>{Math.floor(max)}°</strong>
      </p>
    </li>
  );
}

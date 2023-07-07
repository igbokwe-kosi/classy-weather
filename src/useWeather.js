import { useEffect, useState } from "react";
import { convertToFlag } from "./helper";

export function useWeather(location) {
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(
    function () {
      const abortController = new AbortController();

      async function getWeather(location) {
        try {
          setIsLoading(true);
          // 1) Getting location (geocoding)
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
            { signal: abortController.signal }
          );
          const geoData = await geoRes.json();
          console.log(geoData);

          if (!geoData.results) throw new Error("Location not found");

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);
          setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

          // 2) Getting actual weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData.daily);
          console.log(weatherData.daily);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      }

      if (location.length < 2) return setWeather({});
      getWeather(location);

      return function () {
        abortController.abort();
      };
    },
    [location]
  );

  return {
    isLoading,
    displayLocation,
    weather,
  };
}

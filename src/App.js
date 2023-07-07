import { useState } from "react";
import { useWeather } from "./useWeather";
import Weather from "./Weather";

function App() {
  const [location, setLocation] = useState("");

  const { isLoading, displayLocation, weather } = useWeather(location);

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <div>
        <input
          type="text"
          placeholder="Search from location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {isLoading && <p className="loader">Loading...</p>}

      {weather.weathercode && (
        <Weather weather={weather} location={displayLocation} />
      )}
    </div>
  );
}

export default App;

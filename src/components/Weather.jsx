import { useState } from "react";
import "../style/Weather.css";

// Weather component: modern, responsive card with clear comments for quick review
export default function Weather() {
  // --- state ---
  const [input, setInput] = useState(""); // user input for city
  const [weather, setWeather] = useState(null); // holds API response
  const [error, setError] = useState(""); // error message (if any)
  const [loading, setLoading] = useState(false); // loading flag for spinner

  // handle input change
  const handleInput = (e) => setInput(e.target.value);

  // perform search: async/await for readability
  const search = async () => {
    if (!input) return; // don't search empty input

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=de5baa933d504e1892c172026253009&q=${encodeURIComponent(
          input
        )}&aqi=yes`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      // display friendly error
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // helper to normalize icon url (some APIs return //cdn...)
  const normalizeIcon = (icon) => {
    if (!icon) return "";
    return icon.startsWith("//") ? `https:${icon}` : icon;
  };

  return (
    <div className="weather-root">
      <div className="weather-card" role="region" aria-label="Weather card">
        {/* Header */}
        <header className="weather-header">
          <h1 className="weather-title">Weather</h1>
          <p className="weather-sub">Fast, clean and responsive</p>
        </header>

        {/* Search box: input + button (accessible) */}
        <div className="weather-controls">
          <label htmlFor="city" className="visually-hidden">
            Enter city name
          </label>
          <input
            id="city"
            type="text"
            placeholder="e.g. New York"
            className="weather-input"
            value={input}
            onChange={handleInput}
            onKeyDown={(e) => e.key === "Enter" && search()}
            aria-label="City name"
          />
          <button
            className="weather-btn"
            onClick={search}
            aria-label="Search weather"
            disabled={loading}
          >
            {loading ? <span className="loader" aria-hidden="true" /> : "Search"}
          </button>
        </div>

        {/* Messages */}
        <div className="weather-messages">
          {error && <div className="weather-error">{error}</div>}
        </div>

        {/* Weather details (render only when available) */}
        {weather && (
          <section className="weather-details" aria-live="polite">
            <div className="location-row">
              <div className="location-name">{weather.location.name}</div>
              <div className="localtime">{weather.location.localtime}</div>
            </div>

            <div className="main-row">
              <div className="temperature">
                <div className="temp-value">{weather.current.temp_c}°</div>
                <div className="temp-text">{weather.current.condition.text}</div>
              </div>

              <div className="condition-icon">
                <img
                  src={normalizeIcon(weather.current.condition.icon)}
                  alt={weather.current.condition.text}
                  width={96}
                  height={96}
                />
              </div>
            </div>

            <div className="extra-grid">
              <div className="extra-item">Feels: {weather.current.feelslike_c}°C</div>
              <div className="extra-item">Humidity: {weather.current.humidity}%</div>
              <div className="extra-item">Wind: {weather.current.wind_kph} kph</div>
              <div className="extra-item">Pressure: {weather.current.pressure_mb} mb</div>
            </div>
          </section>
        )}

        {/* small footer note */}
        <footer className="weather-footer">Weather Status</footer>
      </div>
    </div>
  );
}

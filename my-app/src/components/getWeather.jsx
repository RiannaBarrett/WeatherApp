function getWeatherClass(description) {
    switch (description) {
      case "clear sky":
        return "weather-sunny";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return "weather-cloudy";
      case "shower rain":
      case "rain":
        return "weather-rainy";
      case "thunderstorm":
        return "weather-stormy";
      case "snow":
        return "weather-snowy";
      case "mist":
        return "weather-foggy";
      default:
        return "";
    }
  }
  
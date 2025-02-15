const INTRO = {
  CZ: 'Venku je to na:'
};

const CLOTHES = {
  CZ: {
    'T-SHIRT': '👕 triko',
    JACKET: '🧥 bunda',
    'LONG-SLEEVE': '🥼 dlouhej rukáv',
    SHORTS: '🩳 kraťasy',
    TROUSERS: '👖 kalhoty',
    'BATHING-SUIT': '🩲 plavky',
    GLOVES: '🧤 rukavice',
    SCARF: '🧣 šála'
  }
};

const ACCESSORIES = {
  CZ: {
    GLASSES: '🕶 brejle',
    UMBRELLA: '☂️ deštník'
  }
};

export const temperatureMapper = (weatherData) => {
  const feelsLike = weatherData.main.feels_like;

  if (feelsLike > 25) return [CLOTHES.CZ['BATHING-SUIT']];
  if (feelsLike > 20) return [CLOTHES.CZ['T-SHIRT'], CLOTHES.CZ.SHORTS];
  if (feelsLike > 15) return [CLOTHES.CZ['LONG-SLEEVE'], CLOTHES.CZ.SHORTS];
  if (feelsLike > 10) return [CLOTHES.CZ['LONG-SLEEVE'], CLOTHES.CZ.TROUSERS];
  if (feelsLike >= 0) return [CLOTHES.CZ.JACKET, CLOTHES.CZ.TROUSERS];
  if (feelsLike < 0) return [CLOTHES.CZ.JACKET, CLOTHES.CZ.GLOVES, CLOTHES.CZ.SCARF];

  return [];
};

export const conditionMapper = (weatherData) => {
  const [mainWeather] = weatherData.weather;
  const { main: condition, id } = mainWeather;
  const isDay = (weatherData.sys.sunset - weatherData.dt) > 0;

  // check codes in https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  if (condition === 'Clear' && isDay) return [ACCESSORIES.CZ.GLASSES];
  if (condition === 'Clouds' && isDay && id === 801) return [ACCESSORIES.CZ.GLASSES];
  if (condition === 'Rain') return [ACCESSORIES.CZ.UMBRELLA];
  if (condition === 'Drizzle') return [ACCESSORIES.CZ.UMBRELLA];
  if (condition === 'Thunderstorm') return [ACCESSORIES.CZ.UMBRELLA];

  return [];
};

export const weatherMapper = (weatherData) => {
  const [mainWeather] = weatherData.weather;

  return {
    icon: `https://openweathermap.org/img/wn/${mainWeather.icon}@2x.png`,
    description: mainWeather.description,
    temperature: `${Math.round(weatherData.main.temp)} °C`
  };
};

export const finalMapper = (clothes, weather, condition) => {
  return {
    clothes: [INTRO.CZ, ...clothes, ...condition],
    weather
  };
};

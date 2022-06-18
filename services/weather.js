const INTRO = {
	'CZ': 'Je to na '
};

const CLOTHES = {
	'CZ': {
		'T-SHIRT': 'triko 👕',
		'JACKET': 'bundu 🧥',
		'LONG-SLEEVE': 'dlouhej rukáv 🥼',
		'SHORTS': 'kraťasy 🩳',
		'TROUSERS': 'kalhoty 👖',
		'BATHING-SUIT': 'plavky 🩲',
		'GLOVES': 'rukavice 🧤',
		'SCARF': 'šála 🧣',
		'GLASSES': 'brejle 🕶',
	}
};

export const temperatureMapper = (weatherData) => {
	const feelsLike = weatherData.main.feels_like;

	if (feelsLike > 25) return [CLOTHES['CZ']['BATHING-SUIT']];
	if (feelsLike > 20) return [CLOTHES['CZ']['T-SHIRT'], CLOTHES['CZ']['SHORTS']];
	if (feelsLike > 15) return [CLOTHES['CZ']['LONG-SLEEVE'], CLOTHES['CZ']['SHORTS']];
	if (feelsLike > 10) return [CLOTHES['CZ']['LONG-SLEEVE'], CLOTHES['CZ']['TROUSERS']];
	if (feelsLike >= 0) return [CLOTHES['CZ']['JACKET'], CLOTHES['CZ']['TROUSERS']];
	if (feelsLike < 0) return [CLOTHES['CZ']['JACKET'], CLOTHES['CZ']['GLOVES'], CLOTHES['CZ']['SCARF']];

	return [];
};

export const weatherMapper = (weatherData) => {
	const [mainWeather] = weatherData.weather;
	
	return {
		icon: `http://openweathermap.org/img/wn/${mainWeather.icon}@2x.png`,
		description: mainWeather.description,
		temperature: `${Math.round(weatherData.main.temp)} °C`
	};
};

export const finalMapper = (clothes, weather) => {
	return {
		clothes: `${INTRO.CZ}${clothes.join(' a ')}`,
		weather: weather
	};
};
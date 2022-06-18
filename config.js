export const CONFIG = (() => {
	const PORT = process.env.PORT || 3000;
	const hostname = process.env.NODE_ENV === 'development' ? `localhost:${PORT}` : process.env.HOSTNAME;

	return {
		ROUTES: {
			getWeather: `http://${hostname}/weather`,
			getWeatherByIP: `http://${hostname}/weather/by-ip`
		},
		PORT: PORT
	};
})();

export const CONFIG = (() => {
	const PORT = process.env.PORT || 3000;
	const PORT_HTTPS = 3001;

	const hostname = process.env.NODE_ENV === 'development' ? `localhost:${PORT_HTTPS}` : process.env.HOSTNAME;

	console.log('env: ', {
		PORT,
		HOSTNAME: process.env.HOSTNAME
	});

	return {
		HOSTNAME: hostname,
		ROUTES: {
			getWeather: `https://${hostname}/weather`,
			getWeatherByIP: `https://${hostname}/weather/by-ip`
		},
		PORT: PORT,
		PORT_HTTPS: PORT_HTTPS,
	};
})();

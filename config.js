export const CONFIG = (() => {
  const PORT = process.env.PORT || 3000;
  const PORT_HTTPS = 3001;

  const hostname = process.env.NODE_ENV === 'development' ? `localhost:${PORT_HTTPS}` : process.env.HTTP_HOST;

  console.log('env: ', {
    PORT,
    HTTP_HOST: hostname
  });

  return {
    HTTP_HOST: hostname,
    ROUTES: {
      getWeather: `https://${hostname}/weather`,
      getWeatherByIP: `https://${hostname}/weather/by-ip`
    },
    PORT,
    PORT_HTTPS
  };
})();

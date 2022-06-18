import express from 'express';
import fetch from 'node-fetch';
import geoip from 'geoip-lite';
import createError from 'http-errors'

const router = express.Router();

const INTRO = {
  'CZ': 'Je to na '
}

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
}

const temperatureMapper = (weatherData) => {
  const feelsLike = weatherData.main.feels_like

  if (feelsLike > 25) return [CLOTHES['CZ']['BATHING-SUIT']]
  if (feelsLike > 20) return [CLOTHES['CZ']['T-SHIRT'], CLOTHES['CZ']['SHORTS']]
  if (feelsLike > 15) return [CLOTHES['CZ']['LONG-SLEEVE'], CLOTHES['CZ']['SHORTS']]
  if (feelsLike > 10) return [CLOTHES['CZ']['LONG-SLEEVE'], CLOTHES['CZ']['TROUSERS']]
  if (feelsLike <= 10) return [CLOTHES['CZ']['JACKET'], CLOTHES['CZ']['TROUSERS']]
  if (feelsLike < 0) return [CLOTHES['CZ']['JACKET'], CLOTHES['CZ']['GLOVES'], CLOTHES['CZ']['SCARF']]

  return []
}

const finalMapper = (clothes) => {
  return `${INTRO.CZ}${clothes.join(' a ')}`
}

/* GET weather listing. */
router.get('/', async function(req, res, next) {
  const {lat, lon} = req.query
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&lang=cz`);
  const data = await response.json();

  const clothes = temperatureMapper(data)
  const output = finalMapper(clothes)

  res.json(output);
});

router.get('/by-ip', async function(req, res, next) {
  const geo = geoip.lookup(req.ip);

  if (!geo) {
    const httpError = new createError.BadRequest(`Ip address not found: ${req.ip}`)
    return next(httpError)
  }

  const [lat, lon] = geo.ll
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&lang=cz`);
  const data = await response.json();

  res.json(data);
});

export default router;

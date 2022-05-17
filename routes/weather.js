import express from 'express';
import fetch from 'node-fetch';
import geoip from 'geoip-lite';
import createError from 'http-errors'

const router = express.Router();

/* GET weather listing. */
router.get('/', async function(req, res, next) {
  const {lat, lon} = req.query
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&lang=cz`);
  const data = await response.json();

  res.json(data);
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

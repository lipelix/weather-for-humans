import express from 'express';
import fetch from 'node-fetch';
import geoip from 'geoip-lite';
import createError from 'http-errors';
import { temperatureMapper, weatherMapper, conditionMapper, finalMapper } from '../services/weather.js';

const router = express.Router();

/* GET weather listing. */
router.get('/', async (req, res, next) => {
  const { lat, lon } = req.query;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&lang=cz`);
  const data = await response.json();

  const clothes = temperatureMapper(data);
  const weather = weatherMapper(data);
  const conditions = conditionMapper(data);
  const output = finalMapper(clothes, weather, conditions);

  res.json(output);
});

router.get('/by-ip', async (req, res, next) => {
  let geo = geoip.lookup(req.ip);

  if (!geo) {
    const forwardedIp = Array.isArray(req.headers['cf-connecting-ip']) ? req.headers['cf-connecting-ip'][0] : req.headers['cf-connecting-ip'];
    geo = geoip.lookup(forwardedIp || '');

    if (!geo) {
      const httpError = new createError.BadRequest(`Ip address not found: ${req.ip}`);
      return next(httpError);
    }
  }

  const [lat, lon] = geo.ll;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&lang=cz`);
  const data = await response.json();

  const clothes = temperatureMapper(data);
  const weather = weatherMapper(data);
  const conditions = conditionMapper(data);
  const output = finalMapper(clothes, weather, conditions);

  res.json(output);
});

export default router;

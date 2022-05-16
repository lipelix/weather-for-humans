import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

/* GET weather listing. */
router.get('/', async function(req, res, next) {
  const {lat, lon} = req.query
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`);
  const data = await response.json();

  res.json(data);
});

export default router;

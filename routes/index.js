import express from 'express';
import { CONFIG } from '../config.js';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('home', {
		layout: 'main',
		routeGetWeather: CONFIG.ROUTES.getWeather,
		routeGetWeatherByIP: CONFIG.ROUTES.getWeatherByIP,
	});
});

export default router;

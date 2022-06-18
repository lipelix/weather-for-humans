import { temperatureMapper } from './weather.js';

describe('Weather clothes mapper', () => {
	test('When temperature over 25 degrees, should have BATHING-SUIT', () => {
		//Arrange
		const weatherData = {main: {feels_like: 28}};

		//Act
		const clothes = temperatureMapper(weatherData);

		//Assert
		expect(clothes).toEqual(['plavky 🩲']);
	});

	test('When temperature over 20 degrees, should have T-SHIRT and SHORTS', () => {
		//Arrange
		const weatherData = {main: {feels_like: 22}};

		//Act
		const clothes = temperatureMapper(weatherData);

		//Assert
		expect(clothes).toEqual(['triko 👕', 'kraťasy 🩳']);
	});

	test('When temperature over 15 degrees, should have LONG-SLEEVE and SHORTS', () => {
		//Arrange
		const weatherData = {main: {feels_like: 16}};

		//Act
		const clothes = temperatureMapper(weatherData);

		//Assert
		expect(clothes).toEqual(['dlouhej rukáv 🥼', 'kraťasy 🩳']);
	});

	test('When temperature over 10 degrees, should have LONG-SLEEVE and TROUSERS', () => {
		//Arrange
		const weatherData = {main: {feels_like: 11}};

		//Act
		const clothes = temperatureMapper(weatherData);

		//Assert
		expect(clothes).toEqual(['dlouhej rukáv 🥼', 'kalhoty 👖']);
	});

	test('When temperature over 0 degrees, should have JACKET and TROUSERS', () => {
		//Arrange
		const weatherData = {main: {feels_like: 3}};

		//Act
		const clothes = temperatureMapper(weatherData);

		//Assert
		expect(clothes).toEqual(['bundu 🧥', 'kalhoty 👖']);
	});

	test('When temperature under 0 degrees, should have JACKET and GLOVES and SCARF', () => {
		//Arrange
		const weatherData = {main: {feels_like: -6}};

		//Act
		const clothes = temperatureMapper(weatherData);

		//Assert
		expect(clothes).toEqual(['bundu 🧥', 'rukavice 🧤' , 'šála 🧣']);
	});

});
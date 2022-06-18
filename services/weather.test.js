import { temperatureMapper, conditionMapper } from './weather.js';

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

	test('When temperature unknown, should return empty', () => {
		//Arrange
		const weatherData = {main: {}};

		//Act
		const conditions = temperatureMapper(weatherData);

		//Assert
		expect(conditions).toEqual([]);
	});

});

describe('Conditions mapper', () => {
	test('When condition is Clear, should have GLASSES', () => {
		//Arrange
		const weatherData = {weather: [ { main: 'Clear' } ]};

		//Act
		const conditions = conditionMapper(weatherData);

		//Assert
		expect(conditions).toEqual(['brejle 🕶']);
	});

	test('When condition is Rain, should have UMBRELLA', () => {
		//Arrange
		const weatherData = {weather: [ { main: 'Rain' } ]};

		//Act
		const conditions = conditionMapper(weatherData);

		//Assert
		expect(conditions).toEqual(['deštník ☂️']);
	});

	test('When condition is Drizzle, should have UMBRELLA', () => {
		//Arrange
		const weatherData = {weather: [ { main: 'Drizzle' } ]};

		//Act
		const conditions = conditionMapper(weatherData);

		//Assert
		expect(conditions).toEqual(['deštník ☂️']);
	});

	test('When condition is Thunderstorm, should have UMBRELLA', () => {
		//Arrange
		const weatherData = {weather: [ { main: 'Thunderstorm' } ]};

		//Act
		const conditions = conditionMapper(weatherData);

		//Assert
		expect(conditions).toEqual(['deštník ☂️']);
	});

	test('When condition is Unknown, should return empty', () => {
		//Arrange
		const weatherData = {weather: [ { main: 'Blabl' } ]};

		//Act
		const conditions = conditionMapper(weatherData);

		//Assert
		expect(conditions).toEqual([]);
	});

});
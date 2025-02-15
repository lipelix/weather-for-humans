import { temperatureMapper, conditionMapper } from './weather.js';

describe('Weather clothes mapper', () => {
  test('When temperature over 25 degrees, should have BATHING-SUIT', () => {
    // Arrange
    const weatherData = { main: { feels_like: 28 } };

    // Act
    const clothes = temperatureMapper(weatherData);

    // Assert
    expect(clothes).toEqual(['🩲 plavky']);
  });

  test('When temperature over 20 degrees, should have T-SHIRT and SHORTS', () => {
    // Arrange
    const weatherData = { main: { feels_like: 22 } };

    // Act
    const clothes = temperatureMapper(weatherData);

    // Assert
    expect(clothes).toEqual(['👕 triko', '🩳 kraťasy']);
  });

  test('When temperature over 15 degrees, should have LONG-SLEEVE and SHORTS', () => {
    // Arrange
    const weatherData = { main: { feels_like: 16 } };

    // Act
    const clothes = temperatureMapper(weatherData);

    // Assert
    expect(clothes).toEqual(['🥼 dlouhej rukáv', '🩳 kraťasy']);
  });

  test('When temperature over 10 degrees, should have LONG-SLEEVE and TROUSERS', () => {
    // Arrange
    const weatherData = { main: { feels_like: 11 } };

    // Act
    const clothes = temperatureMapper(weatherData);

    // Assert
    expect(clothes).toEqual(['🥼 dlouhej rukáv', '👖 kalhoty']);
  });

  test('When temperature over 0 degrees, should have JACKET and TROUSERS', () => {
    // Arrange
    const weatherData = { main: { feels_like: 3 } };

    // Act
    const clothes = temperatureMapper(weatherData);

    // Assert
    expect(clothes).toEqual(['🧥 bunda', '👖 kalhoty']);
  });

  test('When temperature under 0 degrees, should have JACKET and GLOVES and SCARF', () => {
    // Arrange
    const weatherData = { main: { feels_like: -6 } };

    // Act
    const clothes = temperatureMapper(weatherData);

    // Assert
    expect(clothes).toEqual(['🧥 bunda', '🧤 rukavice', '🧣 šála']);
  });

  test('When temperature unknown, should return empty', () => {
    // Arrange
    const weatherData = { main: {} };

    // Act
    const conditions = temperatureMapper(weatherData);

    // Assert
    expect(conditions).toEqual([]);
  });
});

describe('Conditions mapper', () => {
  test('When condition is Clear, should have GLASSES', () => {
    // Arrange
    const weatherData = { weather: [{ main: 'Clear', id: 800 }], dt: 1657645090, sys: { sunset: 1657653136 } };

    // Act
    const conditions = conditionMapper(weatherData);

    // Assert
    expect(conditions).toEqual(['🕶 brejle']);
  });

  test('When condition is few clouds, should have GLASSES', () => {
    // Arrange
    const weatherData = { weather: [{ main: 'Clouds', id: 801 }], dt: 1657645090, sys: { sunset: 1657653136 } };

    // Act
    const conditions = conditionMapper(weatherData);

    // Assert
    expect(conditions).toEqual(['🕶 brejle']);
  });

  test('When condition is Rain, should have UMBRELLA', () => {
    // Arrange
    const weatherData = { weather: [{ main: 'Rain' }], dt: 1657645090, sys: { sunset: 1657653136 } };

    // Act
    const conditions = conditionMapper(weatherData);

    // Assert
    expect(conditions).toEqual(['☂️ deštník']);
  });

  test('When condition is Drizzle, should have UMBRELLA', () => {
    // Arrange
    const weatherData = { weather: [{ main: 'Drizzle' }], dt: 1657645090, sys: { sunset: 1657653136 } };

    // Act
    const conditions = conditionMapper(weatherData);

    // Assert
    expect(conditions).toEqual(['☂️ deštník']);
  });

  test('When condition is Thunderstorm, should have UMBRELLA', () => {
    // Arrange
    const weatherData = { weather: [{ main: 'Thunderstorm' }], dt: 1657645090, sys: { sunset: 1657653136 } };

    // Act
    const conditions = conditionMapper(weatherData);

    // Assert
    expect(conditions).toEqual(['☂️ deštník']);
  });

  test('When over sunset, no glasses', () => {
    // Arrange
    const weatherData = { weather: [{ main: 'Clouds' }], dt: 1657659534, sys: { sunset: 1657653136 } };

    // Act
    const conditions = conditionMapper(weatherData);

    // Assert
    expect(conditions).toEqual([]);
  });

  test('When condition is Unknown, should return empty', () => {
    // Arrange
    const weatherData = { weather: [{ main: 'Blabl' }], dt: 1657645090, sys: { sunset: 1657653136 } };

    // Act
    const conditions = conditionMapper(weatherData);

    // Assert
    expect(conditions).toEqual([]);
  });
});

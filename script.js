document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('search-box').value;
    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    const url = `https://weathernow-wigc.onrender.com/?city=${city}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayWeatherData(data);
    })
    .catch(error => console.log(error));
}

function displayWeatherData(data) {
    const weatherDetails = document.getElementById('weather-details');
    // Update this part based on the structure of the data you receive
    weatherDetails.innerHTML = `
        <h3>${data.cityName}</h3>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
}

fetchWeatherData('New York');

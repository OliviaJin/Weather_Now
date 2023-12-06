document.getElementById('search-button').addEventListener('click', function() {
    const locationName = document.getElementById('search-box').value;
    fetchWeatherData(locationName);
});

function fetchWeatherData(city) {
    const url = `https://weathernow-wigc.onrender.com/?locationName=${city}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayWeatherData(data);
    })
    .catch(error => console.log(error));
}

function displayWeatherData(data) {
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = `
        <h3>${data.city}</h3>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
}

fetchWeatherData('New York');

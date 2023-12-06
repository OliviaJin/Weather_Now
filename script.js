document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('search-box').value;
    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    const url = `https://weathernow-wigc.onrender.com/${encodeURIComponent(NameInput.value)}`;

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
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

fetchWeatherData('New York');

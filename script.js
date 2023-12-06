document.getElementById('search-button').addEventListener('click', function() {
    const locationName = document.getElementById('search-box').value;
    fetchWeatherData(locationName);
});

function fetchWeatherData(locationName) {

    const url = `https://weathernow-wigc.onrender.com/?location=${locationName}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        displayWeatherData(data);
    })
    .catch(error => console.log('Error fetching data: ', error));
}

function displayWeatherData(data) {
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = `
        <h3>${data.locationName}</h3>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
}
//11
fetchWeatherData('New York'); 

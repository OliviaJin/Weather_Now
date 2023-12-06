  document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('locationInput');
    const searchButton = document.getElementById('search');
    const weatherInfoContainer = document.getElementById('weatherInfoContainer');

    locationInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        searchWeather();
      }
    });

    searchButton.addEventListener('click', searchWeather);

    function searchWeather() {
      const url = `https://weathernow-wigc.onrender.com/weather?locationName=${encodeURIComponent(locationInput.value)}`;

      // Fetch data from the weather API
      fetch(url)
        .then(response => response.json())
        .then(data => {
          weatherInfoContainer.style.display = 'block';
          weatherInfoContainer.innerHTML = `
            <h2>${data.location}</h2>
            <p>Temperature: ${data.temperature}</p>
            <p>Humidity: ${data.humidity}</p>
            <p>Wind Speed: ${data.windSpeed}</p>`;
          // You can add more data points here as per the structure of your weather data
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          weatherInfoContainer.innerHTML = 'Error fetching weather data. Please try again later.';
        });
    }
  });

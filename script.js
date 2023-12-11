document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const locationInput = document.getElementById("locationInput");
  const weatherResultDiv = document.getElementById("weatherResult");

  searchButton.addEventListener("click", function() {
      searchWeather();
  });

  async function searchWeather() {
      const locationName = locationInput.value;
      if (!locationName) {
          weatherResultDiv.innerHTML = "<p>Please enter a location.</p>";
          return;
      }

      try {
          const response = await fetch(`https://weathernow-wigc.onrender.com/weather?locationName=${encodeURIComponent(locationName)}`);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const weatherData = await response.json();
          await displayWeatherData(weatherData);
      } catch (error) {
          console.error("Error fetching weather data:", error);
          weatherResultDiv.innerHTML = `<p>Error fetching weather data.</p>`;
      }
  }

  async function displayWeatherData(data) {
      if (data && data.success && data.data) {
          const weatherInfo = data.data;
          const cityImageSrc = await getCityImageUrl(weatherInfo.name);

          weatherResultDiv.innerHTML = `
              <div class="weather-info">
                  <div>
                      <h2>Weather in ${weatherInfo.name}, ${weatherInfo.sys.country}</h2>
                      <p>Temperature: ${weatherInfo.main.temp} K</p>
                      <p>Feels Like: ${weatherInfo.main.feels_like} K</p>
                      <p>Min Temperature: ${weatherInfo.main.temp_min} K</p>
                      <p>Max Temperature: ${weatherInfo.main.temp_max} K</p>
                      <p>Humidity: ${weatherInfo.main.humidity}%</p>
                      <p>Wind Speed: ${weatherInfo.wind.speed} m/s</p>
                      <p>Cloudiness: ${weatherInfo.clouds.all}%</p>
                      <p>Weather: ${weatherInfo.weather[0].main} (${weatherInfo.weather[0].description})</p>
                  </div>
                  <div class="city-image">
                      <img src="${cityImageSrc}" alt="${weatherInfo.name}">
                  </div>
              </div>
          `;
      } else {
          weatherResultDiv.innerHTML = "<p>Weather data not available for this location.</p>";
      }
  }

  async function getCityImageUrl(cityName) {
      const accessKey = 'sws-5tCuhMq8ZvUpD031hGlBzaZpf-Lo75htof_Xduo';
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&client_id=${accessKey}`;

      try {
          const response = await fetch(url);
          const data = await response.json();
          return data.results[0]?.urls?.regular;
      } catch (error) {
          console.error("Error fetching city image:", error);
          return 'background.jpg';
      }
  }
});

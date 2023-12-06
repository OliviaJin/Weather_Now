async function getWeatherByLocationName(locationName) {
    try {
        const response = await fetch(`https://weathernow-wigc.onrender.com/weather?locationName=${locationName}`);
        const weatherData = await response.json();

        if (response.ok) {
            return { success: true, data: weatherData };
        } else {
            return { success: false, error: weatherData.error || "Unknown error" };
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return { success: false, error: "Error fetching weather data" };
    }
}

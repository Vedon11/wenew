async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "f058c812be1bb1967a0f9a8ca3ed8958"; // ✅ Use your real API key

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const iconUrl = getWeatherImage(data.weather[0].main);

      document.getElementById("weatherResult").innerHTML = `
        <h3>🌍 Weather in ${data.name}</h3>
        <img src="${iconUrl}" alt="Weather condition image" style="width: 100px; height: 100px; margin-bottom: 10px;" />
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
      `;
    } else {
      document.getElementById("weatherResult").innerHTML = `<p>Error: ${data.message}</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("weatherResult").innerHTML = `<p>⚠️ Failed to fetch weather data.</p>`;
  }
}

function getWeatherImage(condition) {
  const imageMap = {
    Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    Clouds: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
    Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
    Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
    Drizzle: "https://cdn-icons-png.flaticon.com/512/414/414974.png",
    Mist: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"
  };
  return imageMap[condition] || "https://cdn-icons-png.flaticon.com/512/869/869869.png";
}

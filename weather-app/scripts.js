const apiKey = '6d43156b433f5e95750e894ea5fae1d6';

function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeatherInfo(data);
            } else {
                alert('City not found, please try again!');
            }
        })
        .catch(error => {
            alert('Error fetching weather data. Please try again!');
        });
}

function updateWeatherInfo(data) {
    const weatherIcons = {
        Clear: './images/sunny.png',
        Clouds: './images/cloudy.png',
        Rain: './images/rainy.png',
        Snow: './images/snow.png',
    };
    

    const weatherCondition = data.weather[0].main;
    const iconUrl = weatherIcons[weatherCondition] || 'https://img.icons8.com/clouds/100/000000/question-mark.png'; // Fallback icon

    document.getElementById('weather-info').innerHTML = `
        <div class="weather-icon">
            <img src="${iconUrl}" alt="${weatherCondition}" />
        </div>
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="weather-details">
            <div>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>
            </div>
            <div>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            </div>
        </div>
    `;
}

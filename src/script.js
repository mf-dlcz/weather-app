function displayDate(timestamp) {
	let date = new Date(timestamp);
	let hour = date.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let min = date.getMinutes();
	if (min < 10) {
		min = `0${min}`;
	}
	let dayofWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let daysOfWeek = dayofWeek[date.getDay()];
	return `${daysOfWeek} ${hour}:${min}`;
}

function searchCity(city) {
	let apiKey = "8478c376956a3e191ae5d6af99d9891c";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showTemp);
}

function cityInput(event) {
	event.preventDefault();
	let city = document.querySelector("#city-input");
	searchCity(city.value);
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}
function displayForecast(response) {
	let sevenDayforecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	sevenDayforecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
					<div class="col-2">
						<div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
							<img
							src="http://openweathermap.org/img/wn/${
								forecastDay.weather[0].icon
							}@2x.png" alt="" width="42" />
							<div class="weather-forecast-temp">
								<span class="max-temp">${Math.round(forecastDay.temp.max)}°</span>
								<span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
							</div>
					</div>
	`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(cordinates) {
	let apiKey = "8478c376956a3e191ae5d6af99d9891c";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
	let numbEl = document.querySelector("#numb");
	let cityEl = document.querySelector("#city");
	let conditionEl = document.querySelector("#condition");
	let humidityEl = document.querySelector("#humidity");
	let windEl = document.querySelector("#wind");
	let dateEl = document.querySelector("#date");
	let iconEl = document.querySelector("#icon");

	celsiusTemp = response.data.main.temp;

	numbEl.innerHTML = Math.round(celsiusTemp);
	cityEl.innerHTML = response.data.name;
	conditionEl.innerHTML = response.data.weather[0].description;
	humidityEl.innerHTML = response.data.main.humidity;
	windEl.innerHTML = Math.round(response.data.wind.speed);
	dateEl.innerHTML = displayDate(response.data.dt * 1000);
	iconEl.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconEl.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityInput);

searchCity("Tokyo");

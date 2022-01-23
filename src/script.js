function displayDate(timestamp) {
	let date = new Date(timestamp);
	let hour = now.getHours();
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
	return `${daysOfWeek} ${date}, ${hour}:${min}`;
}

function displayFahrenheitTemp(event) {
	event.preventDefault();
	let tempEl = document.querySelector("#numb");

	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
	tempEl.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let tempEl = document.querySelector("#numb");
	tempEl.innerHTML = Math.round(celsiusTemp);
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

function displayForecast() {
	let forecastElement = document.querySelector("#forecast");

	let days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
	let forecastHTML = `<div class="row">`;
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`
					<div class="col-2">
						<div class="weather-forecast-date">${day}</div>
							⛅
							<div class="weather-forecast-temp">
								<span class="max-temp"> 68° </span>
								<span class="min-temp"> 54° </span>
							</div>
					</div>
	`;
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
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
		`http:\\openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconEl.setAttribute("alt", response.data.weather[0].description);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityInput);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("Tokyo");
displayForecast();

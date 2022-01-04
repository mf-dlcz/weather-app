function displayDate() {
	let day = now.getDate();
	let hour = now.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let min = now.getMinutes();
	if (min < 10) {
		min = `0${min}`;
	}
	let dayofWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let daysOfWeek = dayofWeek[now.getDay()];

	return `${daysOfWeek} ${day}, ${hour}:${min} `;
}

let now = new Date();
let date = document.querySelector("#date");

date.innerHTML = displayDate(date);

function searchCity(city) {
	let apiKey = "8478c376956a3e191ae5d6af99d9891c";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showTemp);
}

function cityInput(event) {
	event.preventDefault();
	let city = document.querySelector("#city-input").value;
	searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityInput);
//Challenge 2:
function showTemp(response) {
	console.log(response.data.name);
	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#numb").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector("#humidity").innerHTML =
		response.data.main.humidity;
	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#condition").innerHTML =
		response.data.weather[0].main;
}

let currentLocationBtn = document.querySelector("#currentBtn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

function searchLocation(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let units = "imperial";
	let apiKey = "8478c376956a3e191ae5d6af99d9891c";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}
searchCity("Tokyo");

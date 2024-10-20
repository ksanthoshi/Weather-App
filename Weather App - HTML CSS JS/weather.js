const apiKey = "afdb7ab869e43470bb9fd5b3379cdb70";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const clearBtn = document.querySelector(".clear-btn");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "Weather-images/clouds.png";
}
else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "Weather-images/clear.png";
}
else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "Weather-images/rain.png";
}
else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "Weather-images/drizzle.png";
}
else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "Weather-images/mist.png";
}

document.querySelector(".weather").style.display = "block";
document.querySelector(".error").style.display = "none";
    }
}

// Handle search button click and Enter key press
searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkWeather(searchBox.value);
});

// Show the clear button when input has value
searchBox.addEventListener("input", () => {
    clearBtn.style.display = searchBox.value ? "inline-block" : "none";
});

// Clear the input field when the clear button is clicked
clearBtn.addEventListener("click", () => {
    searchBox.value = "";
    clearBtn.style.display = "none";
});
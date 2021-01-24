// starting again, struggling with jquery, going to try again with just vanilla javascript 

function startPage() {
    var inputEl = document.getElementById("input-city");
    var searchEl = document.getElementById("search-btn");
    var clearEl = document.getElementById("clear-btn");
    var nameEl = document.getElementById("city-name");
    var currentPicEl = document.getElementById("current-pic");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");4
    var currentWindEl = document.getElementById("wind-speed");
    var currentUVEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history");
    var todayEl = document.getElementById("current-weather");

    var APIKey = "02b7a9ea356212ecbd2304bcb80a5365"

    // getting current weather
    function getWeather(cityName) {
        var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //removing hidden class to display data
            todayEl.classList.remove("d-none");
            
            var currentDate = new Date(response.data.dt *  1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            nameEl.innerHTML = response.data.name  + day + "/" + month + "/" + year;
            var weatherIcon = response.data[0].weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + ".png");
            currentPicEl.innerHTML = "Temp:" + k2c(response.data.main.temp) + "c";
            currentHumidityEl.innerHTML = "Humidity:" + response.data.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed:" + response.data.wind.speed + "MPH";

           



        })
    }


function k2c(K) {
    return Math.floor(K - 2273.15);}

}

startPage()
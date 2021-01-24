// starting again, struggling with jquery, going to try again with just vanilla javascript 

function startPage() {
    var inputEl = document.getElementById("input-city");
    var searchEl = document.getElementById("search-btn");
    var clearEl = document.getElementById("clear-btn");
    var nameEl = document.getElementById("city-name");
    var currentPicEl = document.getElementById("current-pic");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity"); 4
    var currentWindEl = document.getElementById("wind-speed");
    var currentUVEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history");
    var todayEl = document.getElementById("current-weather");
    var fiveDayEl = document.getElementById("five-header");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    var APIKey = "02b7a9ea356212ecbd2304bcb80a5365"

    // getting current weather
    function getWeather(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //removing hidden class to display data
            todayEl.classList.remove("d-none");

            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            nameEl.innerHTML = response.name + " " + day + "/" + month + "/" + year;
            var weatherIcon = response.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + ".png");
            currentTempEl.innerHTML = "Temp: " + k2c(response.main.temp) + "°C";
            currentHumidityEl.innerHTML = "Humidity: " + response.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.wind.speed + "MPH";

            // need another url for the UV index and lat and lon coords to use for the forecast API
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var UVQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            $.ajax({
                url: UVQueryURL,
                method: "GET"
            }).then(function (uvresponse) {
                var UVindex = document.createElement("span");
                //  changes colour depending on uv index, using bootstrap badges
                if (uvresponse.current.uvi < 5) {
                    UVindex.setAttribute("class", "badge badge-success");
                }
                else if (uvresponse.current.uvi < 8) {
                    UVindex.setAttribute("class", "badge badge-warning");
                }
                else {
                    UVindex.setAttribute("class", "badge badge-danger");
                }
                // UVindex.innerHTML = response.list[0].value;
                currentUVEl.innerHTML = "UV:";
                currentUVEl.append(UVindex);
            });

            var cityID = response.main.city.id;
            var foreQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
            $.ajax({
                url: foreQueryURL,
                method: "GET"
            }).then(function (reponse) {

                fiveDayEl.classList.remove("d-none");

                var forecastEl = document.querySelectorAll(".forecast");
                for (i = 0; i < forecastEl.length; i++) {
                    forecastEl[i].innerHTML = "";
                    var foreIndex = i * 8 + 4;
                    var foreDate = new Date(response.list[foreIndex].dt * 1000);
                    var foreDay = foreDate.getDate();
                    var foreMonth = foreDate.getMonth();
                    var foreYear = foreDate.getFullYear();
                    var foreDateEl = document.createElement("p");
                    foreDateEl.setAttribute("class", "forecast-date");
                    foreDateEl.innerHTML = foreDay + "/" + foreMonth + "/" + foreYear;
                    forecastEl[i].append(foreDateEl);


                    var forecastWeatherEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + ".png");
                    forecastEl[i].append(forecastWeatherEl);
                    var forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Temp: " + k2c(response.list[forecastIndex].main.temp + "°C");
                    forecastEl[i].append(forecastTempEl);
                    var forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + response.list[forecastIndex].main.humidity + "%";
                    forecastEl[i].append(forecastHumidityEl);

                }


            })



        })
    }


    function k2c(K) {
        return Math.floor(K - 273.15);
    }

    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        createSearchHistory();
    })


    searchEl.addEventListener("click", function () {
        var searchTerm = inputEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        createSearchHistory();
    })

    

    function createSearchHistory() {
        historyEl.innerHTML = "";
        for (i = 0; i < searchHistory.length; i++) {
            var historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function () {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    createSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
}

startPage()
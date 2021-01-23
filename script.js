$(document).ready(function() {

var searchEl = document.getElementById("search-btn");
var clearEl = document.getElementById("clear-btn");
var inputEl = document.getElementById("input-city");
var currentWeather = document.getElementById("current-weather");
var cityNameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var tempEl = document.getElementById("temperature");
var humidityEl = document.getElementById("humidity");
var windEl = document.getElementById("wind-speed");
var uvEl = document.getElementById("uv-index");
var currentPicEl = document.getElementById("current-pic");
var fiveDay = document.getElementById("five-header");

var APIKey = "02b7a9ea356212ecbd2304bcb80a5365"

function getWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        var currentDate = new Date (response.data.dt*1000);
        var day = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        cityNameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
        var weatherIcon = response.data.weather[0].icon;
        $("#weatherIcon").attr("src", "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");
        $("#tempEl").html() = "Temperature:" + response.data.main.temp;
        $("#humidityEl").html() = "Humidity:" + response.data.main.humidity + "%";
        $("windEl").html() = "Wind Speed:" + response.data.wind.speed + "MPH";
        
        var lat = response.data.coord.lat;
        var lon = response.data.coord.lon;
        var UVQueryUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
        $.ajax({
            url: UVQueryUrl,
            method: "GET"
        }).then(function(response){
            var UVIndex = document.createElement("p");
            UVIndex.setAttribute("class", "badge badge-danger");
            UVIndex.innerHTML = response.data[0].value;
            $("#uvEl").html = "UV index: ";
            $("#uvEl").append(UVIndex);
           })


    })
}

});
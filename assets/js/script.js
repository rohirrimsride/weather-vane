var date = new Date()
console.log(date);
var day = date.getDate();
console.log(day);
var month = date.getMonth()+1;
console.log(month);
var year = date.getFullYear();
console.log(year);
var currentDate = " (" + month + "/" + day + "/" + year + ") ";
console.log(currentDate)+1;
// figure out how to add days to currentDate

var searchForm = document.querySelector("#searchForm");
var searchInput = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");
var searchHistory = document.querySelector("#searchHistory");
var cityResults = document.querySelector("#cityResults");
var cityName = document.querySelector("#cityName");
var foreCast = document.querySelector("#foreCast");
// debugger;
var searchSubmit = function(event){
    // debugger;
    event.preventDefault();
    var citySearch = searchInput.value.trim();
    console.log(citySearch);

    if (citySearch) {
        searchLatLon(citySearch);
        // console.log(citySearch);
        // searchInput.value = "";
    } 
    // else {
    //     alert("Please enter: city name, state code(ex. TX), country code(ex. US)")
    // }
};

// fetch API for getting latitude and longitude
var searchLatLon = function(city){
    console.log(city);

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=f64460980741f108f643fa3eeb49f4b2";

    fetch(apiUrl).then(function(response) {

        // request was successful
        if (response.ok) {
            response.json().then(function(cityData) {
            console.log(cityData);
            console.log(cityData[0].name);
            console.log(cityData[0].lat); 
            console.log(cityData[0].lon);
            // displayResults(data);
            getLocationInfo(cityData);
            });
        } 
        // else {
        // console.log(response);
        // alert("There was a problem with your request!");
        // }
    }); 
};

// fetch API to pull weather data for searched location
var getLocationInfo = function(cityData){
        
    // openweather API url
    var apiUrl = "https:api.openweathermap.org/data/2.5/onecall?lat=" + cityData[0].lat + "&lon=" + cityData[0].lon + "&units=imperial&exclude=hourly,minutely&appid=f64460980741f108f643fa3eeb49f4b2";
    
    fetch(apiUrl).then(function(response) {

        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
            console.log(data);
            console.log(data.current.humidity);  
            console.log(data.current.temp);
            console.log(data.current.wind_speed);
            console.log(data.current.uvi);
            displayResults(data, cityData);
          });
        }
    });
};

var displayResults = function(data, cityData) {
    // create textContent City Name
    cityName.textContent = cityData[0].name + currentDate + data.current.weather.icon;

    var cityTemp = document.querySelector("#cityTemp");
    cityTemp.textContent = data.current.temp;

    var cityWind = document.querySelector("#cityWind");
    cityWind.textContent = data.current.wind_speed;

    var cityHumidity = document.querySelector("#cityHumidity");
    cityHumidity.textContent = data.current.humidity;

    var uvContainer = document.querySelector("#uvContainer");
    var cityUvi = document.createElement("button");
    cityUvi.textContent = "  " + data.current.uvi + "  ";
    uvContainer.appendChild(cityUvi);
        if (data.current.uvi <= 2.99) {
            
            cityUvi.className = ("uvi-low");
            
        } else if (data.current.uvi >= 3 && data.current.uvi <= 5.99) {

            cityUvi.className = ("uvi-moderate");

        } else if (data.current.uvi >= 6 && data.current.uvi <= 7.99) {

            cityUvi.className = ("uvi-high");

        } else if (data.current.uvi >= 8 && data.current.uvi <= 10.99) {

            cityUvi.className = ("uvi-very-high");

        } else if (data.current.uvi >= 11) {

            cityUvi.className = ("uvi-extreme");

        };

    var dayOneDate = document.querySelector("#dayOneDate");
    dayOneDate.textContent = data.daily[0].dt;
    console.log(data.daily[0].dt);
// finish up cards
    


};


searchForm.addEventListener("submit", searchSubmit);
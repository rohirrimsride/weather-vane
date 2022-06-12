var date = new Date()
console.log(date);
var day = date.getDate();
console.log(day);
var month = date.getMonth()+1;
console.log(month);
var year = date.getFullYear();
console.log(year);

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

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=f64460980741f108f643fa3eeb49f4b2";

    fetch(apiUrl).then(function(response) {

        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
            console.log(data);
            console.log(data[0].name);
            console.log(data[0].lat); 
            console.log(data[0].lon);
            // displayResults(data);
            getLocationInfo(data);
            });
        } 
        // else {
        // console.log(response);
        // alert("There was a problem with your request!");
        // }
    }); 
};

// fetch API to pull weather data for searched location
var getLocationInfo = function(data){
    // create textContent City Name
    cityName.textContent = data[0].name + " (" + month + "/" + day + "/" + year + ") ";
        if (data[0].clouds >= 66) {
            var skyCondition = document.createElement("i");
            skyCondition
        }
    // openweather API url
    var apiUrl = "https:api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&exclude=hourly,minutely&appid=f64460980741f108f643fa3eeb49f4b2";
    
    fetch(apiUrl).then(function(response) {

        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
            console.log(data);
            console.log(data.current.humidity);  
            console.log(data.current.temp);
            console.log(data.current.wind_speed);
            console.log(data.current.uvi);
            displayResults(data);
          });
        }
    });
};

var displayResults = function(data) {

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

};


searchForm.addEventListener("submit", searchSubmit);
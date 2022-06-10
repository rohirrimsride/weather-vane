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
    } else {
        alert("Please enter: city name, state code(ex. TX), country code(ex. US)")
    }
};

var searchLatLon = function(city){
    console.log(city);
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=f64460980741f108f643fa3eeb49f4b2";

    fetch(apiUrl).then(function(response) {

        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
          console.log(data);
          console.log(data[0].lat); 
          console.log(data[0].lon);
          getLocationInfo(data);
        });
    }
    // else {
    //   console.log(response);
    //   alert("There was a problem with your request!");
    // }
  }); 
};

var getLocationInfo = function(data){
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
        //   displayResults(data);
          });
        }
        else {
          console.log(response);
          alert("There was a problem with your request!");
        }
      });
};


searchForm.addEventListener("submit", searchSubmit);

// searchLatLon();
// getLocationInfo();
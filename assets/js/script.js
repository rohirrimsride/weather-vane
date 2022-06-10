var searchBtn = document.querySelector("#searchBtn");
var searchHistory = document.querySelector("#searchHistory");
var cityResults = document.querySelector("#cityResults");
var cityName = document.querySelector("#cityName");
var foreCast = document.querySelector("#foreCast");
// debugger;
var getLocationInfo = function(){
    // openweather API url
    var apiUrl = "https:api.openweathermap.org/data/2.5/onecall?lat=" + 47.6062 + "&lon=" + -122.3321 + "&units=imperial&exclude=hourly,minutely&appid=f64460980741f108f643fa3eeb49f4b2";
    
    fetch(apiUrl).then(function(response) {

        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
          console.log(data);  
          displayResults(data);
          });
        }
        else {
          console.log(response);
          alert("There was a problem with your request!");
        }
      });
};



getLocationInfo();
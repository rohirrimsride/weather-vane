// date info for main card and daily forecast cards
var date = new Date()
console.log(date);
var day = date.getDate();
console.log(day);
var month = date.getMonth()+1;
console.log(month);
var year = date.getFullYear();
console.log(year);
var currentDate = " (" + month + "/" + day + "/" + year + ") ";

// declare global variables
var searchForm = document.querySelector("#searchForm");
var searchInput = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");
var searchHistory = document.querySelector("#searchHistory");
var cityResults = document.querySelector("#cityResults");
var cityName = document.querySelector("#cityName");
var foreCast = document.querySelector("#foreCast");

// declare array variable for saving to localStorage
var cityNameInfo = [];
var cityDataInfo = [];

console.log(cityNameInfo);
console.log(cityDataInfo);

var searchSubmit = function(event){
   
    event.preventDefault();
    var citySearch = searchInput.value.trim();
    console.log(citySearch);

    if (citySearch) {
        searchLatLon(citySearch);
    } 
    // else {
    //     alert("Please enter: city name, state code(ex. TX), country code(ex. US)")
    // }
};

// fetch API for getting latitude and longitude
var searchLatLon = function(city){
    console.log(city);
// debugger;
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
            cityNameInfo.unshift(cityData);
            cityDataInfo.unshift(data);
            displayResults(data, cityData);            
          });
        }
    });   
};

var displayResults = function(data, cityData) {
    // "http:openweathermap.org/img/wn/10d@2x.png"
    // + data.current.weather[0].icon + ;
    // create textContent City Name
    cityName.textContent = cityData[0].name + currentDate; 
    
    // main card city temperature
    var cityTemp = document.querySelector("#cityTemp");
    cityTemp.textContent = data.current.temp;
    
    // main card city wind speed
    var cityWind = document.querySelector("#cityWind");
    cityWind.textContent = data.current.wind_speed;
    
    // main card city humidity
    var cityHumidity = document.querySelector("#cityHumidity");
    cityHumidity.textContent = data.current.humidity;
    
    var uvContainer = document.querySelector("#uvContainer");
        // remove any previous child buttons
        if (uvContainer.children.length >= 2){
            uvContainer.removeChild(uvContainer.children[1]);
        };
    var cityUvi = document.createElement("button");
    cityUvi.textContent = data.current.uvi;
    uvContainer.appendChild(cityUvi);
        
        if (data.current.uvi <= 2.99) {
            
            cityUvi.classList.add("uvi-low", "uvi-btn");
            
        } else if (data.current.uvi >= 3 && data.current.uvi <= 5.99) {

            cityUvi.classList.add("uvi-moderate", "uvi-btn");

        } else if (data.current.uvi >= 6 && data.current.uvi <= 7.99) {

            cityUvi.classList.add("uvi-high", "uvi-btn");

        } else if (data.current.uvi >= 8 && data.current.uvi <= 10.99) {

            cityUvi.classList.add("uvi-very-high", "uvi-btn");

        } else if (data.current.uvi >= 11) {

            cityUvi.classList.add("uvi-extreme", "uvi-btn");
        };

    // forecast card day one
    var dayOneDate = document.querySelector("#dayOneDate");
    var dayOne = date.getDate()+1;
    dayOneDate.textContent = month + "/" + dayOne + "/" + year;
    dayOneTemp.textContent = data.daily[0].temp.day;
    dayOneWind.textContent = data.daily[0].wind_speed;
    dayOneHumidity.textContent = data.daily[0].humidity;
    
    // forecast card day two
    var dayTwoDate = document.querySelector("#dayTwoDate");
    var dayTwo = date.getDate()+2;
    dayTwoDate.textContent = month + "/" + dayTwo + "/" + year;
    dayTwoTemp.textContent = data.daily[1].temp.day;
    dayTwoWind.textContent = data.daily[1].wind_speed;
    dayTwoHumidity.textContent = data.daily[1].humidity;
    
    // forecast card day three
    var dayThreeDate = document.querySelector("#dayThreeDate");
    var dayThree = date.getDate()+3;
    dayThreeDate.textContent = month + "/" + dayThree + "/" + year;
    dayThreeTemp.textContent = data.daily[2].temp.day;
    dayThreeWind.textContent = data.daily[2].wind_speed;
    dayThreeHumidity.textContent = data.daily[2].humidity;
    
    // forecast card day four
    var dayFourDate = document.querySelector("#dayFourDate");
    var dayFour = date.getDate()+4;
    dayFourDate.textContent = month + "/" + dayFour + "/" + year;
    dayFourTemp.textContent = data.daily[3].temp.day;
    dayFourWind.textContent = data.daily[3].wind_speed;
    dayFourHumidity.textContent = data.daily[3].humidity;
    
    // forecast card day five
    var dayFiveDate = document.querySelector("#dayFiveDate");
    var dayFive = date.getDate()+5;
    dayFiveDate.textContent = month + "/" + dayFive + "/" + year;
    dayFiveTemp.textContent = data.daily[4].temp.day;
    dayFiveWind.textContent = data.daily[4].wind_speed;
    dayFiveHumidity.textContent = data.daily[4].humidity;

    saveCityData();
};

var saveCityData = function () {
    localStorage.setItem("cityNameInfo", JSON.stringify(cityNameInfo));
    localStorage.setItem("cityDataInfo", JSON.stringify(cityDataInfo));

    citySearchHistory();
};

var citySearchHistory = function(){

        if (searchHistory.children.length <= 7){
            // add history button
            var historyBtn = document.createElement("button");
            historyBtn.className = ("history-btns");
            historyBtn.textContent = cityNameInfo[0][0].name;
            historyBtn.setAttribute("id", cityNameInfo[0][0].name);
            historyBtn.setAttribute("type", "submit");
            searchHistory.prepend(historyBtn);
        } 
        else if (searchHistory.children.length === 8){
            cityNameInfo.slice(7,8);
            console.log(cityNameInfo);
            cityDataInfo.slice(7,8);
            console.log(cityDataInfo);
            searchHistory.removeChild(searchHistory.lastElementChild);
            // add most recent city search
            var historyBtn = document.createElement("button");
            historyBtn.className = ("history-btns");
            historyBtn.textContent = cityNameInfo[0][0].name;
            historyBtn.setAttribute("id", cityNameInfo[0][0].name);
            historyBtn.setAttribute("type", "submit");
            searchHistory.prepend(historyBtn);
        };
};

// var retrieveHistory = function(){
//     if (localStorage.getItem("cityNameInfo") !== null) {
//         var cityName = localStorage.getItem("cityNameInfo");
//         cityNameInfo.push(cityName);
//     } 
//     if (localStorage.getItem("cityDataInfo") !== null) {
//         var cityData = localStorage.getItem("cityDataInfo");
//         cityDataInfo.push(cityData);
//     } else {
//         searchForm.addEventListener("submit", searchSubmit); 
//     };  
// };

var loadPreviousSearch = function(event){

    event.preventDefault();
    var citySearch = `${event.submitter.textContent}`;
   
    searchLatLon(citySearch);
};

searchForm.addEventListener("submit", searchSubmit);

searchHistory.addEventListener("submit", retrieveHistory);


// retrieveHistory();
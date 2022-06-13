// date info for main card and daily forecast cards
var date = new Date()
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
var currentDate = " (" + month + "/" + day + "/" + year + ") ";

// declare global variables
var searchForm = document.querySelector("#searchForm");
var searchInput = document.querySelector("#searchInput");
var searchHistory = document.querySelector("#searchHistory");
// var cityResults = document.querySelector("#cityResults");
// var cityName = document.querySelector("#cityName");
// var foreCast = document.querySelector("#foreCast");

// declare array variable for saving to localStorage
var cityNameInfo = [];
// console.log(cityNameInfo);


var searchSubmit = function(event){
   
    event.preventDefault();
    var citySearch = searchInput.value.trim();

    if (citySearch) {
        searchLatLon(citySearch);
    } 
};

// fetch API for getting latitude and longitude
var searchLatLon = function(city){

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f64460980741f108f643fa3eeb49f4b2";

    fetch(apiUrl).then(function(response){

        // request was successful
        if (response.ok){
            response.json().then(function(cityData){
            console.log(cityData);
            console.log(cityData.name);
            console.log(cityData.coord.lat); 
            console.log(cityData.coord.lon);
            
                if (cityData === undefined){
                    alert("There was a problem with your request!");
                } 
                else {
                    getLocationInfo(cityData);
                }
        
            });
        };
    }); 
};

// fetch API to pull weather data for searched location
var getLocationInfo = function(cityData){
        
    // openweather API url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityData.coord.lat + "&lon=" + cityData.coord.lon + "&units=imperial&exclude=hourly,minutely&appid=f64460980741f108f643fa3eeb49f4b2";
    
    fetch(apiUrl).then(function(response){

        // request was successful
        if (response.ok){
            response.json().then(function(data){
            console.log(data);
            // console.log(data.current.humidity);  
            // console.log(data.current.temp);
            // console.log(data.current.wind_speed);
            // console.log(data.current.uvi);
            cityNameInfo.unshift(cityData.name);
        
            displayResults(data, cityData);            
          });
        }
    });   
};

var displayResults = function(data, cityData){
    // create textContent City Name
    cityName.textContent = cityData.name + currentDate;
    var cityNameContainer = document.querySelector("#cityNameContainer")
    var iconCode = data.current.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
    console.log(iconUrl);
    cityNameContainer.children.length
    console.log(cityNameContainer.children.length);
    
    if (cityNameContainer.children.length === 1){
        var weatherIcon = document.createElement("img");
        weatherIcon.className = ("weather-icon");
        weatherIcon.setAttribute("src", iconUrl);
        cityNameContainer.appendChild(weatherIcon);
    } else if (cityNameContainer.children.length === 2){
        cityNameContainer.removeChild(cityNameContainer.lastElementChild);
        var weatherIcon = document.createElement("img");
        weatherIcon.className = ("weather-icon");
        weatherIcon.setAttribute("src", iconUrl);
        cityNameContainer.appendChild(weatherIcon);
    }
    

    
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
        
        if (data.current.uvi <= 2.99){
            
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
    // date
    var dayOneDate = document.querySelector("#dayOneDate");
    var dayOne = date.getDate()+1;
    dayOneDate.textContent = month + "/" + dayOne + "/" + year;
    // icon
    dayOneIcon = document.querySelector("#dayOneIcon")
    dayOneIcon.className = ("forecast-icon");
    dayOneCode = data.daily[0].weather[0].icon;
    dayOneIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + dayOneCode + ".png")
    dayOneIcon.setAttribute("alt", data.daily[0].weather[0].description);
    // temp
    dayOneTemp.textContent = data.daily[0].temp.day;
    // wind speed
    dayOneWind.textContent = data.daily[0].wind_speed;
    // humidity
    dayOneHumidity.textContent = data.daily[0].humidity;
    
    
    
    // forecast card day two
    // date
    var dayTwoDate = document.querySelector("#dayTwoDate");
    var dayTwo = date.getDate()+2;
    dayTwoDate.textContent = month + "/" + dayTwo + "/" + year;
    // icon
    dayTwoIcon = document.querySelector("#dayTwoIcon")
    dayTwoIcon.className = ("forecast-icon");
    dayTwoCode = data.daily[1].weather[0].icon;
    dayTwoIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + dayTwoCode + ".png")
    dayTwoIcon.setAttribute("alt", data.daily[1].weather[0].description);
    // temp
    dayTwoTemp.textContent = data.daily[1].temp.day;
    // wind speed
    dayTwoWind.textContent = data.daily[1].wind_speed;
    // humidity
    dayTwoHumidity.textContent = data.daily[1].humidity;
    
    // forecast card day three
    // date
    var dayThreeDate = document.querySelector("#dayThreeDate");
    var dayThree = date.getDate()+3;
    dayThreeDate.textContent = month + "/" + dayThree + "/" + year;
    // icon
    dayThreeIcon = document.querySelector("#dayThreeIcon")
    dayThreeIcon.className = ("forecast-icon");
    dayThreeCode = data.daily[2].weather[0].icon;
    dayThreeIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + dayThreeCode + ".png")
    dayThreeIcon.setAttribute("alt", data.daily[2].weather[0].description);
    // temp
    dayThreeTemp.textContent = data.daily[2].temp.day;
    // wind speed
    dayThreeWind.textContent = data.daily[2].wind_speed;
    // humidity
    dayThreeHumidity.textContent = data.daily[2].humidity;
    
    // forecast card day four
    // date
    var dayFourDate = document.querySelector("#dayFourDate");
    var dayFour = date.getDate()+4;
    dayFourDate.textContent = month + "/" + dayFour + "/" + year;
    // icon
    dayFourIcon = document.querySelector("#dayFourIcon")
    dayFourIcon.className = ("forecast-icon");
    dayFourCode = data.daily[3].weather[0].icon;
    dayFourIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + dayFourCode + ".png")
    dayFourIcon.setAttribute("alt", data.daily[3].weather[0].description);
    // temp
    dayFourTemp.textContent = data.daily[3].temp.day;
    // wind speed
    dayFourWind.textContent = data.daily[3].wind_speed;
    // humidity
    dayFourHumidity.textContent = data.daily[3].humidity;
    
    // forecast card day five
    // date
    var dayFiveDate = document.querySelector("#dayFiveDate");
    var dayFive = date.getDate()+5;
    dayFiveDate.textContent = month + "/" + dayFive + "/" + year;
    // icon
    dayFiveIcon = document.querySelector("#dayFiveIcon")
    dayFiveIcon.className = ("forecast-icon");
    dayFiveCode = data.daily[4].weather[0].icon;
    dayFiveIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + dayFiveCode + ".png")
    dayFiveIcon.setAttribute("alt", data.daily[4].weather[0].description);
    // temp
    dayFiveTemp.textContent = data.daily[4].temp.day;
    // wind speed
    dayFiveWind.textContent = data.daily[4].wind_speed;
    // humidity
    dayFiveHumidity.textContent = data.daily[4].humidity;
    
    citySearchHistory();   
};

var savedCityData = function(){
    
    localStorage.setItem("cityNameInfo", JSON.stringify(cityNameInfo));
};

var citySearchHistory = function(){

        if (searchHistory.children.length <= 7){
            // add history button
            var historyBtn = document.createElement("button");
            historyBtn.className = ("history-btns");
            historyBtn.textContent = cityNameInfo[0];
            historyBtn.setAttribute("id", cityNameInfo[0]);
            historyBtn.setAttribute("type", "submit");
            searchHistory.prepend(historyBtn);
        } 
        else if (searchHistory.children.length === 8){
            cityNameInfo.slice(7,8);
            console.log(cityNameInfo);
            searchHistory.removeChild(searchHistory.lastElementChild);
            // add most recent city search
            var historyBtn = document.createElement("button");
            historyBtn.className = ("history-btns");
            historyBtn.textContent = cityNameInfo[0];
            historyBtn.setAttribute("id", cityNameInfo[0]);
            historyBtn.setAttribute("type", "submit");
            searchHistory.prepend(historyBtn);
        };
        savedCityData();
};

// unable to recreate search history buttons from localStorage
/*var retrieveHistory = function(){
    
    if (localStorage.getItem("cityNameInfo") !== null){
        for (var i = 0; i < JSON.parse(localStorage.getItem(cityNameInfo).length); i++){
        var cityName = JSON.parse(localStorage.getItem(cityNameInfo).length[i])
        
        console.log(cityName);
        cityNameInfo.push(cityName);
        }
        localStorage.setItem("cityNameInfo", JSON.stringify(cityName));
    
        // citySearchHistory();
    } else {
        return;
    };
};*/

var loadPreviousSearch = function(event){

    event.preventDefault();
    var citySearch = `${event.submitter.textContent}`;
   
    searchLatLon(citySearch);
};

searchForm.addEventListener("submit", searchSubmit);

searchHistory.addEventListener("submit", loadPreviousSearch);

// retrieveHistory();
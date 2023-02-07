
// Declare variable global city
var city;
// Declare array to hold cities names
var cities = [];
var todayDate = moment().format("DD/MM/YYYY");


// Find geolocation coordinates: lat, lon
function geolocation(city){

    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=73022bce8f98139a77816edb0e805bb7";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var locationG = [response[0].lat, response[0].lon, city];
        //return (locationG);
        weatherDisplay(locationG);
    });
    
}


//Function five days forecast
function fiveDaysForecast(responseF) {
    console.log("weatherDispaly-ajax", responseF.list);
    console.log("weatherDispaly-ajax-2", responseF.list[0]);
    console.log("weatherDispaly-ajax-T", responseF.list[0].main.temp);
    console.log("weatherDispaly-ajax-W", responseF.list[0].wind.speed);
    console.log("weatherDispaly-ajax-H", responseF.list[0].main.humidity);
    console.log("icon", responseF.list[0].weather[0].icon);
    let days = [7, 15, 23, 31, 39];
    days.forEach(function(i) {
        // Creating a div to hold the five days forecast
    var cityDiv2 = $("<div class='cityTwo'>");
    // Storing the temperature data converting from K to C.
    var temp = (responseF.list[i].main.temp - 273.15).toFixed(2);
   
    // Creating an element to have the temperature displayed
    var pTemp = $("<p>").text(" Temp: " + temp + " °C");
  
    // Displaying the temperature
    cityDiv2.append(pTemp);
  
    // Storing the information for wind
    var wind = responseF.list[i].wind.speed;
  
    // Creating an element to hold the wind information
    var pWind = $("<p>").text(" Wind: " + wind + " KPH");
  
    // Displaying the wind information
    cityDiv2.append(pWind);
  
    // Storing the humidity
    var humidity = responseF.list[i].main.humidity;
  
    // Creating an element to hold the humidity
    var pHumidity = $("<p>").text(" Humidity: " + humidity + " %");
  
    // Appending the humidity
    cityDiv2.append(pHumidity);
    });
  
  
  }


// Function add elemts to the HTML to display the content
function weatherDisplay(locationW) {
    $("#today").empty();
    //var city = $(this).attr("data-name");
    console.log("weatherDisplay:", locationW);
    // define lat and lon
    var lat = locationW[0];
    var lon = locationW[1];
    console.log("lat lon:", lat, lon);
   
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=73022bce8f98139a77816edb0e805bb7";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(responseW) {
        console.log("weatherDispaly-ajax", responseW.list);
        console.log("weatherDispaly-ajax-2", responseW.list[0]);
        console.log("weatherDispaly-ajax-T", responseW.list[0].main.temp);
        console.log("weatherDispaly-ajax-W", responseW.list[0].wind.speed);
        console.log("weatherDispaly-ajax-H", responseW.list[0].main.humidity);
        console.log("icon", responseW.list[0].weather[0].icon);
        // Creating a div to hold the city
        var cityDiv = $("<div class='city'>");
        
        //Weather Icons
        var ic = responseW.list[0].weather[0].icon;
        var icn;
        if (ic == "01d" || ic == "01n") {
            icn = $('<i class="fa-solid fa-sun"></i>');
        } else if (ic == "02d" || ic == "02n") {
            icn = $('<i class="fa-solid fa-cloud-sun"></i>');
        } else if (ic == "03d" || ic == "03n") {
            icn = $('<i class="fa-solid fa-cloud"></i>');
        } else if (ic == "04d" || ic == "04n") {
            icn = $('<i class="fa-solid fa-cloud"></i>');
        } else if (ic == "09d" || ic == "09n") {
            icn = $('<i class="fa-solid fa-cloud-showers-heavy"></i>');
        } else if (ic == "10d" || ic == "10n") {
            icn = $('<i class="fa-solid fa-cloud-sun-rain"></i>');
        } else if (ic == "11d" || ic == "11n") {
            icn = $('<i class="fa-solid fa-cloud-bolt"></i>');
        } else if (ic == "13d" || ic == "13n") {
            icn = $('<i class="fa-solid fa-snowflake"></i>');
        } else if (ic == "50d" || ic == "50n") {
            icn = $('<i class="fa-solid fa-smog"></i>');
        }

        //creating element to have name of city displayed
        var pCity = $("<p>").text(locationW[2] + " " + todayDate + " ");
        pCity.attr("id", "cityLabel");
        pCity.append(icn);
        // Dispalying the name
        cityDiv.append(pCity);

        // Storing the temperature data converting from K to C.
        var temp = (responseW.list[0].main.temp - 273.15).toFixed(2);
    
        // Creating an element to have the temperature displayed
        var pTemp = $("<p>").text(" Temp: " + temp + " °C");
    
        // Displaying the temperature
        cityDiv.append(pTemp);
    
        // Storing the information for wind
        var wind = responseW.list[0].wind.speed;
    
        // Creating an element to hold the wind information
        var pWind = $("<p>").text(" Wind: " + wind + " KPH");
    
        // Displaying the wind information
        cityDiv.append(pWind);
    
        // Storing the humidity
        var humidity = responseW.list[0].main.humidity;
    
        // Creating an element to hold the humidity
        var pHumidity = $("<p>").text(" Humidity: " + humidity + " %");
    
        // Appending the humidity
        cityDiv.append(pHumidity);
    
        // Putting the information on today's weather
        $("#today").append(cityDiv);
    });
}

// Displaying list of cities in history
function renderCities() {

    // Deleting the cities list prior to adding new ones not to have repeated buttons
        $("#history").empty();

        // Looping through the array of cities
        for (var i = 0; i < cities.length; i++) {

            // Dynamicaly generating buttons for each city in the array
            var btn = $("<button>");
            // Add class of city-btn to our button
            btn.addClass("city-btn");
            // Add data-attribute to each button
            btn.attr("data-name", cities[i]);
            // Provides the initial button text
            btn.text(cities[i]);
            // Add button to the #history div
            $("#history").prepend(btn);
        }
    }

  // This function handles events where a movie button is clicked
$("#search-button").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#search-input").val().trim();
    city = city[0].toUpperCase() + city.substring(1);
    console.log("city:", city);
    // Check id nothing has been entered
    if (city === "") {
        return;
    }
    // Adding city searched to array
    cities.push(city);
    
    // Calling function to workout geolocation
    geolocation(city);
    console.log("location-click");
    // Calling renderButtons which handles the processing of cities history array
    //renderCities();
  });
 
  // Adding a click event listener to all elements with a class of "city-btn"
  //$(document).on("click", ".city-btn", weatherDisplay);
 
  // Calling the renderCities function to display the initial buttons????????????????????????????????
  //renderCities();
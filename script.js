
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


// Function to produce the weather icons
function weatherIcons(ic) {
    //Weather Icons
  
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
    return icn;
  }


//Function five days forecast
function fiveDaysForecast(responseF) {
    // Empty section 'forecast' before starting a new session
    $("#forecast").empty();

    // Append tile to forecast section
    var hforecast = $('<h2 id="forecastId">').text("5-Day Forecast:");
    $("#forecast").append(hforecast);
    
    // Creating div to attach forecast to forecast title and display it
    var forecastDiv = $("<div id='forecastDiv'>");

    // Create the 5 weather forecast sections
    let days = [7, 15, 23, 31, 39];
    var d = 1;
    days.forEach(function(i) {
        // Creating a div to hold the five days forecast
        var cityDiv2 = $("<div class='cityTwo'>");

        // Calling weather icons function
        var ic = responseF.list[i].weather[0].icon;
        var icn = weatherIcons(ic);

        // Set day of forecast
        var forecastDate = moment().add(d,'days').format("DD/MM/YYYY");
        d++;
        //Dispaly date
        var dateDiv = $('<p>').text(forecastDate);
        cityDiv2.append(dateDiv);

        // display weather icon
        cityDiv2.append(icn);

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
        
        forecastDiv.append(cityDiv2);

    });
  
    // Putting the information on today's weather
    $("#forecast").append(forecastDiv);
  }


// Function add elemts to the HTML to display the content
function weatherDisplay(locationW) {
    // Empty section 'today' before starting a new session
    $("#today").empty();
    //var city = $(this).attr("data-name");
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
        // Creating a div to hold the city
        var cityDiv = $("<div class='city'>");
        
        //Weather Icons
        var ic = responseW.list[0].weather[0].icon;
        var icn = weatherIcons(ic);

        //creating element to have name of city displayed
        var pCity = $("<p>").text(locationW[2] + " " + todayDate + " ");
        //Append icon to dity name and date
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

        // Call five days forecast function
        fiveDaysForecast(responseW);
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

    // Clear search box after search
    $("#search-input").val("");

    // Calling function to workout geolocation
    geolocation(city);
    console.log("location-click");
    // Calling renderButtons which handles the processing of cities history array
    renderCities();
  });
 
  // Adding a click event listener to all elements with a class of "city-btn"
  $(document).on("click", ".city-btn", function(event) {
    event.preventDefault();
    console.log(event.target.innerText);
    city = event.target.innerText.trim();
    // Calling function to workout geolocation
    geolocation(city);
    console.log("location-click");
    
  });

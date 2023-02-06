
// Declare variable global city
var city;
// Declare array to hold cities names
var cities = [];



// Find geolocation coordinates: lat, lon
function geolocation(city){

    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=73022bce8f98139a77816edb0e805bb7";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log("response:", response)
      console.log("response ajax:", response[0].lat, response[0].lon);
      var locationG = [response[0].lat, response[0].lon]
      //return (location);
      weatherDisplay(locationG);
    });
    
  }


// Function add elemts to the HTML to display the content
function weatherDisplay(locationW) {
  
    //var city = $(this).attr("data-name");
    console.log("weatherlocation function:", locationW);
    // define lat and lon
    var lat = locationW[0];
    var lon = locationW[1];
    console.log("lat lon:", lat, lon);
    //var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat={" + lat + "}&lon={" + lon + "}&appid={" + APIkey + "}"
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
    });
}

  // This function handles events where a movie button is clicked
$("#search-button").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#search-input").val().trim();
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
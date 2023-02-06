
// Declare variable global city
var city;
// Declare array to hold cities names
var cities = [];



// Find geolocation coordinates: lat, lon
function geolocation(city){
    console.log("geolocation1:", city);
    //var city = $(this).attr("data-name");
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=432622e4dda54ab6ab9f7868b5616f81";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log("response:", response)
      console.log("response ajax:", response[0].lat, response[0].lon);
      var location = [response[0].lat, response[0].lon]
      return (location);
    });
    
  }


// Function add elemts to the HTML to display the content
function weatherDisplay(city) {
  
    //var city = $(this).attr("data-name");
    console.log(city);
    // Call function of geolocation to get lat and lon
    location = geolocation(city);
    var lat = location[0];
    var lon = location[1];
    console.log("lat lon:", lat, lon);
}

  // This function handles events where a movie button is clicked
$("#search-button").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#search-input").val().trim();
    console.log("city:", city);
    // Adding city searched to array
    cities.push(city);
    
    // Calling function to display weather information
    weatherDisplay(city);
    // Calling renderButtons which handles the processing of cities history array
    //renderCities();
  });
 
  // Adding a click event listener to all elements with a class of "city-btn"
  $(document).on("click", ".city-btn", weatherDisplay);
 
  // Calling the renderCities function to display the initial buttons????????????????????????????????
  //renderCities();
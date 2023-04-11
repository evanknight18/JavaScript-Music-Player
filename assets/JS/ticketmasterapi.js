var apiKey = "WuvIyt8Lt5KDtWFNhsvZieAxgi6Gqiuw";

var searchForm = document.querySelector("#search-form");
var searchResults = document.querySelector("#searchResults");

searchForm.addEventListener("submit", function(event) {
  // keeps this event from running infinitely
  event.preventDefault(); 
  //logs out every search query, clears on refresh
  var searchQuery = document.querySelector("#search-query").value;

  // logs out each search in the console, erases on refresh
  console.log(searchQuery)

  //fetches ticketmaster api
  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=WuvIyt8Lt5KDtWFNhsvZieAxgi6Gqiuw&keyword=${searchQuery}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var events = data._embedded.events;
      let html = "";
      for (let i = 0; i < events.length; i++) {
        var event = events[i];
        var eventName = event.name;
        var eventDate = event.dates.start.localDate;
        var eventTime = event.dates.start.localTime;
        var venueName = event._embedded.venues[0].name;
        // html += appends html tags and content to the events variable
        // sorts the event listings in the events container on the webpage with style
        html += "<div>";
        html += "<h5>" + eventName + "</h5>";
        html += "<p>" + eventDate + " " + eventTime + "</p>";
        html += "<p>" + venueName + "</p>";
        html += "</div>";
      }
      searchResults.innerHTML = html;
    })
    // .catch(function(error)) will show an error message anytime something other than
    //an artist is searched in the search bar
    .catch(function(error) {
      console.log("An error occurred:", error);
      searchResults.innerHTML = "Sorry, we could not find any events matching your search.";
    });
});

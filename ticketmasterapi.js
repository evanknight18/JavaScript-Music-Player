var apiKey = "WuvIyt8Lt5KDtWFNhsvZieAxgi6Gqiuw";

var searchForm = document.querySelector("#search-form");
var searchResults = document.querySelector("#searchResults");

searchForm.addEventListener("submit", function(event) {
  // keeps this event from running infinitely
  event.preventDefault(); 
  
  var searchQuery = document.querySelector("#search-query").value;
  
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
        // sorts the event listings in the column
        html +=
        html += "<div>";
        html += "<h2>" + eventName + "</h2>";
        html += "<p>" + eventDate + " " + eventTime + "</p>";
        html += "<p>" + venueName + "</p>";
        html += "</div>";
      }
      searchResults.innerHTML = html;
    })
    .catch(function(error) {
      console.log("An error occurred:", error);
      searchResults.innerHTML = "Sorry, we could not find any events matching your search.";
    });
});
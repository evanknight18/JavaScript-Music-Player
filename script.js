document.addEventListener("DOMContentLoaded", function () {
    // Select the buttons
    const previousButton = document.querySelector(".previous");
    const playButton = document.querySelector(".play");
    const nextButton = document.querySelector(".next");
  
    // Event listeners for each button
    previousButton.addEventListener("click", function () {
      console.log("Previous button clicked");
      // functionality for the previous button here
    });
  
    playButton.addEventListener("click", function () {
      console.log("Play button clicked");
      // functionality for the play button here
    });
  
    nextButton.addEventListener("click", function () {
      console.log("Next button clicked");
      // functionality for the next button here
    });
  });
  

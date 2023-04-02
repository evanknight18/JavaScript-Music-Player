
  document.addEventListener("DOMContentLoaded", function () {
    // Select the buttons
    const previousButton = document.querySelector(".previous");
    const playButton = document.querySelector(".play");
    const nextButton = document.querySelector(".next");
  
    // Event listeners for each button
    previousButton.addEventListener("click", function () {
      console.log("Previous button clicked");
      // Add your functionality for the previous button here
    });
  
    playButton.addEventListener("click", function () {
      console.log("Play button clicked");
      // Add your functionality for the play button here
    });
  
    nextButton.addEventListener("click", function () {
      console.log("Next button clicked");
      // Add your functionality for the next button here
    });
  });
  
  const playButton = document.querySelector(".play");

playButton.addEventListener("click", () => {
  const playIcon = playButton.querySelector(".fa-play");
  const pauseIcon = playButton.querySelector(".fa-pause");

  playIcon.style.display = playIcon.style.display === "none" ? "" : "none";
  pauseIcon.style.display = pauseIcon.style.display === "none" ? "" : "none";
});

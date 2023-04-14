
  
  const apiKey = "Yf741a1c9ebmshba13bf6d9dd9676p172e09jsn10a167f626dbY";
  const apiUrl = "https://billboard-api2.p.rapidapi.com";
  
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "billboard-api2.p.rapidapi.com",
    },
  };
  
  const url = `${apiUrl}/hot-100`;
  
  const fetchButton = document.querySelector("#fetch-button");
  fetchButton.addEventListener("click", () => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        const resultsContainer = document.querySelector("#billboard-results");
        resultsContainer.innerHTML = "";
        for (let i = 0; i < 10; i++) {
          const song = data.content[i];
          const songElement = document.createElement("div");
          songElement.innerHTML = `<p>${i + 1}. ${song.title} - ${song.artist}</p>`;
          resultsContainer.appendChild(songElement);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  
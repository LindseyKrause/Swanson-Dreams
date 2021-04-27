//--------------------------------Global Variables---------------------------
var searchButton = document.querySelector(".button");
var userInput = document.querySelector(".textarea");
var ronQuote = document.querySelector("#ronQuote");
var keywordReturn = "";

//--------------------------Capture User Input - submit button----------------
searchButton.addEventListener("click", function () {
  if (userInput.value.length <= 25) {
 //TODO:-----------------   //we need a modal!
    alert("Don't forget to add a modal and delete this alert");
  } else {
    console.log("search button clicked");
    console.log(userInput.value);
    var textTerm = userInput.value;
    // sendToText(textTerm);
    sendToRon();
    sendToText2(textTerm);
  }
});

//--------------------Function to send text to text analyser---------------------
sendToText2 = function (searchTerm) {
  fetch(
    "https://aylien-text.p.rapidapi.com/entities?text=" +
      searchTerm +
      "&language=en",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d8b02f9ee6mshafd2f4ddfa99997p12a03cjsn241b3ee6e0ac",
        "x-rapidapi-host": "aylien-text.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      keywordReturn = data.entities.keyword[0];
      console.log(keywordReturn + "!");
      //save Analyzed text key word to local storage
      localStorage.setItem("value", keywordReturn, "stop");
    })
    .catch((err) => {
      console.error(err);
    });
};
//--------------------------Add to search History---------------------------------
/* TODO:    Figure out how to pull objects and arrays out of local storage */




//--------------------Return Quote from Ron Function------------------------
sendToRon = function (searchRon) {
  fetch(
    "https://ron-swanson-quotes.herokuapp.com/v2/quotes/search?q=" +
      keywordReturn
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("ron api");
      console.log(data);
      ronQuote.textContent =
        "This is what Ron says about your Dream: " + '"' + data + '"';
    })
    .catch((err) => {
      console.error(err);
    });
};

//--------------------------Append Cards with Search History---------------------------------
/* TODO:    Take values out of local store to append to cards */


/*TODO items
*76 - cards 
*50 - local storage junk
*10 - modal
*/
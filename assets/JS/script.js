//Global Variabiables 
var searchButton = document.querySelector(".button");
var userInput = document.querySelector(".textarea");
var ronQuote = document.querySelector("#ronQuote");
var keywordReturn = '';
var textTerm = '';

//Capture User Input - submit button 
searchButton.addEventListener("click", function () {
    if (userInput.value.length <= 25) {
        alert("Please enter more than 25 characters");
    }
    else {
        console.log("search button clicked");
        console.log(userInput.value);
        textTerm = userInput.value;
        // sendToText(textTerm);
        sendToTextAnalysis(textTerm);
    }
})

sendToTextAnalysis = function (searchTerm) {
    fetch("https://aylien-text.p.rapidapi.com/entities?text=" + searchTerm + "&language=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d8b02f9ee6mshafd2f4ddfa99997p12a03cjsn241b3ee6e0ac",
            "x-rapidapi-host": "aylien-text.p.rapidapi.com"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            keywordReturn = data.entities.keyword[0];
            sendToRon();
        })
        .catch(err => {
            console.error(err);
        });
}
sendToRon = function () {
    fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes/search?q=" + keywordReturn)
        .then(response => {
            return response.json();
        }).then(data => {
            ronQuote.textContent = 'This is what Ron says about your Dream: ' + '"' + data + '"';
            saveItems();
        })
        .catch(err => {
            console.error(err);
        });


}
//Save User Input in local storage
function saveItems() {
    userReturnObj = JSON.parse(localStorage.getItem('userReturnObj'));
    var userInputObj = [{
        dream: textTerm,
        keyword: keywordReturn,
        ronQ: ronQuote.textContent,
    }]
    localStorage.setItem('userReturnObj', JSON.stringify(userInputObj.concat(userReturnObj)));
}


//save Analyzed text key word to local storage


//send keyword to Ron quotes API


//return Ron quote


//save Ron Quote to local storage



//append Ron quote to new quote area

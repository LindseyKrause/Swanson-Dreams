//Global Variabiables 
var searchButton = document.querySelector(".button");
var userInput = document.querySelector(".textarea");
var ronQuote = document.querySelector("#ronQuote");
var keywordReturn = "";
var textTerm = "";

//Capture User Input - submit button 
searchButton.addEventListener("click", function () {
    if (userInput.value.length <= 25) {
alert("Please enter more than 25 characters");
    }
    else {
    console.log("search button clicked");
    console.log(userInput.value);
    var textTerm = userInput.value;
    // sendToText(textTerm);
    sendToRon();
    sendToText2(textTerm);
}})

sendToText2 = function (searchTerm) {
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
            console.log("text api 2");
            keywordReturn = data.entities.keyword[0];
            console.log(keywordReturn + "!");
        })
        // var keyword = data.entities;
        // console.log(keyword);
        .catch(err => {
            console.error(err);
        });
        // let entity = data.entities.keyword[0];
        // console.log(entity);
}
sendToRon = function (searchRon) {
    fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes/search?q=" + keywordReturn)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log("ron api");
            console.log(data);
            ronQuote.textContent = 'This is what Ron says about your Dream: ' + '"' + data + '"';
        })
        .catch(err => {
            console.error(err);
        });
        var userInputObj = {
            dream:  textTerm,
            keyword: keywordReturn,
            ronQ: ronQuote.textContent,
            }
            //Save User Input in local storage
            function saveItems () {
            localStorage.setItem('userReturnObj', JSON.stringify(userInputObj));
            userReturnObj = localStorage.getItem('userReturnObj');
            userReturnObj = JSON.parse(localStorage.getItem('userReturnObj'));
            console.log(userReturnObj);
            }
            saveItems();
            
}
//save Analyzed text key word to local storage


//send keyword to Ron quotes API


//return Ron quote


//save Ron Quote to local storage



//append Ron quote to new quote area

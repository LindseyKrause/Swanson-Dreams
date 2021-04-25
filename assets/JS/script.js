//Global Variabiables 
var searchButton = document.querySelector(".button");
var userInput = document.querySelector(".textarea");
var ronQuote = document.querySelector("#ronQuote");


//Capture User Input - submit button 
searchButton.addEventListener("click", function () {
    console.log("search button clicked");
    console.log(userInput.value);
    var textTerm = userInput.value;
    sendToText(textTerm);
    sendToRon();
    sendToText2(textTerm);
})


//Save User Input in local storage


//send User Input to text analyzer 
sendToText = function (searchTerm) {
    //return analyzed text key word
    fetch("https://aylien-text.p.rapidapi.com/concepts?text=" + searchTerm + "&language=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d8b02f9ee6mshafd2f4ddfa99997p12a03cjsn241b3ee6e0ac",
            "x-rapidapi-host": "aylien-text.p.rapidapi.com"
        }
    })
        .then(response => {
            return response.json();
        }).then(data => {
            console.log("textapi");
            console.log(data);


        })
        .catch(err => {
            console.error(err);
        });
}
sendToRon = function (searchRon) {
    fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
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
}
// sendToText2 = function (searchTerm) {
//     fetch("https://aylien-text.p.rapidapi.com/entities?text=" + searchTerm + "&language=en", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-key": "d8b02f9ee6mshafd2f4ddfa99997p12a03cjsn241b3ee6e0ac",
//             "x-rapidapi-host": "aylien-text.p.rapidapi.com"
//         }
//     })
//     .then(response => {
//         return response.json();
//     })
//         .then(data => {
//             console.log("text api 2");
//             console.log(data);
//         })
//         // var keyword = data.entities;
//         // console.log(keyword);
//         .catch(err => {
//             console.error(err);
//         });
        
// }


//save Analyzed text key word to local storage


//send keyword to Ron quotes API


//return Ron quote


//save Ron Quote to local storage



//append Ron quote to new quote area

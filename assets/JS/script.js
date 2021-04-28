
//--------------------------------Global Variables---------------------------
var searchButton = document.querySelector(".button");
var userInput = document.querySelector(".textarea");
var ronQuote = document.querySelector("#ronQuote");
var ronSays = document.querySelector("#ronSays");
var keywordReturn = "";
var okayBtn = document.querySelector("#okayBtn");
var clearBtn = document.querySelector("#clearBtn");
var textTerm = "";


//--------------------------Capture User Input - submit button----------------
searchButton.addEventListener("click", function () {
    //condition to activate modal
    if (userInput.value.length <= 25) {
        let modalClass = document.getElementById("characterAlert");
        modalClass.classList.remove("modal");
        modalClass.classList.add("modal.is-active");
        okayBtn.addEventListener("click", function () {
            modalClass.classList.remove("modal.is-active");
            modalClass.classList.add("modal");
        });
        //if characters are > 25
    } else {
        textTerm = userInput.value;
        sendToTextAnalysis(textTerm);
    }
});

//--------------------Function to send text to text analyser---------------------
sendToTextAnalysis = function (searchTerm) {
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
            console.log(data);
            keywordReturn = data.entities.keyword[0];
            sendToRon();
        })
        .catch((err) => {
            console.error(err);
        });
};

//--------------------Return Quote from Ron Function------------------------

sendToRon = function () {
    fetch(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes/search?q=" +
        keywordReturn
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            ronQuote.textContent =
                "This is what Ron says about your Dream:";
            ronSays.textContent = `"${data}"`;

            saveItems();
            //TODO:  add line break above
        })
        .catch((err) => {
            console.error(err);
        });

};

//--------------------------Add to search History---------------------------------
/* TODO:    Figure out how to pull objects and arrays out of local storage */
function saveItems() {
    userReturnObj = JSON.parse(localStorage.getItem("userReturnObj"));
    var userInputObj = [
        {
            dream: textTerm,
            keyword: keywordReturn,
            ronQ: ronSays.textContent,
        },
    ];
    localStorage.setItem(
        "userReturnObj",
        JSON.stringify(userInputObj.concat(userReturnObj))
    );
    //--------------------------Append Cards with Search --------------------------

    for (let i = 0; i < userReturnObj.length; i++) {
        var cardText = "Dream:  " + userReturnObj[i].dream + " " + "Keyword:  " + userReturnObj[i].keyword  + "  " + "Ron Said:    " + userReturnObj[i].ronQ;
        cardContainer = document.getElementById('cardContainer');
        createCard = document.createElement('div');
        createCard.classList.add('card');
        createCardContentDiv = document.createElement('div');
        createCardContentDiv.classList.add('card-content');
        createCardContentContentDiv = document.createElement('div');
        createCardContentContentDiv.classList.add('content');
        createCardContentContentDiv.textContent = cardText;
        createCardContentDiv.appendChild(createCardContentContentDiv);
        createCard.appendChild(createCardContentDiv);
        cardContainer.appendChild(createCard);
    }

}

clearBtn.addEventListener("click", function () {
  localStorage.clear();
  clearBtn.innerHTML = "Local Storage Cleared";
});


 //* - modal can't move up the page

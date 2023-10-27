let words = [
    "abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", 
    "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", 
    "bikini", "blitz", "blizzard", "strength", "strengths", "stretch", "stronghold", "stymied"
];
let guessWord;
let playerWord;
let life;

//HTML elements
let startGameElement = document.getElementById("startGame");
let gamePlayElement = document.getElementById("playGame");
let messageDisplayElement = document.getElementById("messageDisplay");
let messageTextElement = document.getElementById("message");
let lifeSpanElement = document.getElementById("lifeSpan");
let wordToGuessElement = document.getElementById("wordToGuess");
let lettersElement = document.getElementById("letters");

let startButton = document.getElementById("start");
let restartButton = document.getElementById("restartGame");
let checkButton = document.getElementById("check");

//onclick events
restartButton.onclick = showPlayGameElement;
startButton.onclick = showPlayGameElement;
checkButton.onclick = checkAndDisplay;

//game play functions
//-- create words
function createGuessWord() {
    guessWord = words[Math.floor(Math.random() * words.length)].split('');
};

function createPlayerWord() {
    createGuessWord();
    lettersElement.innerText = guessWord.length;
    playerWord = new Array();
    for (let i = 0; i < guessWord.length; i++) {
        playerWord[i] = "-";
    }    
};

//-- display and check game play
function checkAndDisplay() {
    checkTextInput();
    checkPlayerWord();
    showPlayerWord();
    if (life == 0) {
        addFinalMessageWin("You LOSE!");
        showMessageElement();
    }
    document.getElementById("inputText").value = "";
};

function checkTextInput() {
    let inputText = document.getElementById("inputText").value;
    if (guessWord.includes(inputText)) { 
        for (let i = 0; i < guessWord.length; i++) {
            if (guessWord[i] == inputText) {
                playerWord[i] = inputText;
            }
        }
    } else if (inputText == guessWord.join("")) {
        addFinalMessageWin("You WIN!");
        showMessageElement();
    } else { 
        life--;
        updateLifeSpan();
    }
};

function checkPlayerWord() {
    let isComplectWord = true;
    for (let i = 0; i < guessWord.length; i++) {
        if(guessWord[i] != playerWord[i]) {
            isComplectWord = false;
        }
    }
    if (isComplectWord) {
        addFinalMessageWin("You WIN!");
        showMessageElement();
    }
};

function updateLifeSpan() {
    lifeSpanElement.innerText = life;
};

//display
function showPlayerWord() {
    wordToGuessElement.innerText = "";
    for (index in playerWord) {
        wordToGuessElement.innerText += playerWord[index];
    }
};

function showPlayGameElement() {
    life = 7;
    updateLifeSpan();
    createPlayerWord();
    showPlayerWord();
    startGameElement.setAttribute("hidden", "");
    messageDisplayElement.setAttribute("hidden", "");
    gamePlayElement.removeAttribute("hidden");
};

function showMessageElement() {
    gamePlayElement.setAttribute("hidden", "");
    messageDisplayElement.removeAttribute("hidden");
};

function addFinalMessageWin(message) {
    messageTextElement.innerHTML = `<h1 class="text-center text-success">${message}</h1>`;
};
const team1 = document.getElementById("team1");
const team2 = document.getElementById("team2");
const timer = document.getElementById("timer");
const extraWords = document.getElementById("extra-words");
const round = document.getElementById("round");

const team1Btn = document.getElementById("team1btn");
const team2Btn = document.getElementById("team2btn");
const timerBtn = document.getElementById("timerBtn");
const roundBtn = document.getElementById("roundBtn");

const team1Block = document.getElementById("team1BlockDisplay");
const team2Block = document.getElementById("team2BlockDisplay");
const timerBlock = document.getElementById("timerBlockDisplay");
const roundBlock = document.getElementById("roundBlockDisplay");

const displayCountdownInMilliSeconds = 1500;
const smallestRoundTimeInSeconds = 5;

function displayTextInMilliSeconds(textBlock, message) {
    textBlock.textContent = message;
    textBlock.style.color = "black";
    // textBlock.style.color = 'lightgreen';

    setTimeout(() => {
        textBlock.textContent = "";
    }, displayCountdownInMilliSeconds);
}

team1Btn.addEventListener("click", () => {
    localStorage.setItem("team1", team1.value);
    displayTextInMilliSeconds(
        team1Block,
        `Success: Team 1 name - ${team1.value}`,
    );
});

team2Btn.addEventListener("click", () => {
    localStorage.setItem("team2", team2.value);
    displayTextInMilliSeconds(
        team2Block,
        `Success: Team 2 name - ${team2.value}`,
    );
});

roundBtn.addEventListener("click", () => {
    if (round.value > 0) {
        localStorage.setItem("round", round.value);
        displayTextInMilliSeconds(
            roundBlock,
            `Success: Round - ${round.value}`,
        );
    } else {
        displayTextInMilliSeconds(
            roundBlock,
            `Please make round bigger than 0`,
        );
    }
});

timerBtn.addEventListener("click", () => {
    if (timer.value > smallestRoundTimeInSeconds) {
        localStorage.setItem("timer", timer.value);
        displayTextInMilliSeconds(
            timerBlock,
            `Success: Timer - ${timer.value} seconds`,
        );
    } else {
        displayTextInMilliSeconds(
            timerBlock,
            `Please make timer bigger than ${smallestRoundTimeInSeconds} seconds`,
        );
    }
});
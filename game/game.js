import easyWords from "./easyWords.js";
import hardWords from "./hardWords.js";

const team1 = localStorage.getItem("team1") ? localStorage.getItem("team1") : "Team 1";
const team2 = localStorage.getItem("team2") ? localStorage.getItem("team2") : "Team 2";
const timer = localStorage.getItem("timer") || 30;
let round = localStorage.getItem("round") ? parseInt(localStorage.getItem("round")) : 3;

const wordDisplay = document.getElementById("wordDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const teamTurn = document.getElementById("teamTurn");
const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");
const skipBtn = document.getElementById("skipBtn");
const playBtn = document.getElementById("playBtn");

let score1 = parseInt(localStorage.getItem("score1")) ? parseInt(localStorage.getItem("score1")) : 0;
let score2 = parseInt(localStorage.getItem("score2")) ? parseInt(localStorage.getItem("score2")) : 0;
let currentTeam = parseInt(localStorage.getItem("currentTeam")) ? parseInt(localStorage.getItem("currentTeam")) : 1;
let currentDifficulty = "easy";

const timerInSeconds = 1000;
timerDisplay.textContent = timer;
timerDisplay.style.fontSize = "45px";
skipBtn.style.display = "none";
easyBtn.style.display = "none";
hardBtn.style.display = "none";

let gamePaused = localStorage.setItem("gamePaused", true);

if (currentTeam === 1) {
    teamTurn.textContent = "Team " + team1 + "'s Turn";
} else {
    teamTurn.textContent = "Team " + team2 + "'s Turn";
}

function getRandomWord(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function showWord() {
    let word;
    if (currentDifficulty === "easy") {
        word = getRandomWord(easyWords);
    } else {
        word = getRandomWord(hardWords);
    }
    wordDisplay.textContent = word;
}

easyBtn.addEventListener("click", () => {
    gamePaused = localStorage.setItem("gamePaused", false);

    currentDifficulty = "easy";
    if (currentTeam === 1) {
        score1++;
        // console.log(team1 + " score:", score1);
    } else {
        score2++;
        // console.log(team2 + " score:", score2);
    }

    localStorage.setItem("score1", score1);
    localStorage.setItem("score2", score2);

    showWord();
});

hardBtn.addEventListener("click", () => {
    gamePaused = localStorage.setItem("gamePaused", false);
    currentDifficulty = "hard";

    if (currentTeam === 1) {
        score1 += 3;
        // console.log(team1 + " score:", score1);
    } else {
        score2 += 3;
        // console.log(team2 + " score:", score2);
    }

    localStorage.setItem("score1", score1);
    localStorage.setItem("score2", score2);

    showWord();
});

playBtn.addEventListener("click", () => {
    startTimer();

    playBtn.style.display = "none";
    skipBtn.style.display = "inline";
    easyBtn.style.display = "inline";
    hardBtn.style.display = "inline";
});

skipBtn.addEventListener("click", () => {
    showWord();
});

function startTimer() {
    let timeLeft = timer;
    showWord();

    const interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);

            if (currentTeam === 1) {
                score1++;
                currentTeam = 2;
            } else {
                score2++;
                currentTeam = 1;
                round--;
            }

            localStorage.setItem("score1", score1);
            localStorage.setItem("score2", score2);
            localStorage.setItem("round", round);
            localStorage.setItem("currentTeam", currentTeam);

            window.location.href = "../score/score.html";
        }
    }, timerInSeconds);
}
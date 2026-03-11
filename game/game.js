import easyWords from "./easyWords.js";
import hardWords from "./hardWords.js";
import sfx from "../assets/music/sfx.js";

const body = document.querySelector("body");
const defaultSound =new Audio("../assets/music/nice-ding.mp3");

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
let skippedWord = false;

let easyWordsScoredByTeam1Array = localStorage.getItem("easyWordsScoredByTeam1") ? JSON.parse(localStorage.getItem("easyWordsScoredByTeam1")) : [];
let easyWordsScoredByTeam2Array = localStorage.getItem("easyWordsScoredByTeam2") ? JSON.parse(localStorage.getItem("easyWordsScoredByTeam2")) : [];
let hardWordsScoredByTeam1Array = localStorage.getItem("hardWordsScoredByTeam1") ? JSON.parse(localStorage.getItem("hardWordsScoredByTeam1")) : [];
let hardWordsScoredByTeam2Array = localStorage.getItem("hardWordsScoredByTeam2") ? JSON.parse(localStorage.getItem("hardWordsScoredByTeam2")) : []; 
let skippedWordsArray = localStorage.getItem("skippedWordsArray") ? JSON.parse(localStorage.getItem("skippedWordsArray")) : [];

const timerInSeconds = round == 1 ? 1500 : 1000;
timerDisplay.textContent = timer;
timerDisplay.style.fontSize = "45px";
skipBtn.style.display = "none";
easyBtn.style.display = "none";
hardBtn.style.display = "none";

let gamePaused = localStorage.setItem("gamePaused", true);

if (currentTeam === 1) {
    teamTurn.textContent = "Team " + team1 + "'s Turn";
    body.style.backgroundColor = "rgba(255, 1, 1, 0.481)";
} else {
    teamTurn.textContent = "Team " + team2 + "'s Turn";
    body.style.backgroundColor = "rgba(1, 90, 255, 0.59)";
}

// TODO SS : remove used words (with persistence)
function getRandomWord(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function showWord() {
    let word = "";
    if (currentDifficulty === "easy") {
        word = getRandomWord(easyWords);

        if (currentTeam === 1) {
            easyWordsScoredByTeam1Array.push(word)
        } else if (currentTeam === 2) {
            easyWordsScoredByTeam2Array.push(word)
        }

    } else {
        word = getRandomWord(hardWords);

        if (currentTeam === 1) {
            hardWordsScoredByTeam1Array.push(word)
        } else if (currentTeam === 2) {
            hardWordsScoredByTeam2Array.push(word)
        }

    }

    if (skippedWord) {
        skippedWordsArray.push(word)
    }

    wordDisplay.textContent = word;
    wordDisplay.style.border = "2px solid black";
}

export function playSfx() {

    if (Math.random() > 0.1) {
        defaultSound.currentTime = 0;
        defaultSound.play();
        return;
    }

    const s = sfx[Math.floor(Math.random() * sfx.length)];
    s.audio.currentTime = 0;
    s.audio.play();
}

easyBtn.addEventListener("click", () => {
    gamePaused = localStorage.setItem("gamePaused", false);

    currentDifficulty = "easy";
    if (currentTeam === 1) {
        score1++;
    } else {
        score2++;
    }

    localStorage.setItem("score1", score1);
    localStorage.setItem("score2", score2);

    playSfx();
    showWord();
});

hardBtn.addEventListener("click", () => {
    gamePaused = localStorage.setItem("gamePaused", false);
    currentDifficulty = "hard";

    if (currentTeam === 1) {
        score1 += 3;
    } else {
        score2 += 3;
    }

    localStorage.setItem("score1", score1);
    localStorage.setItem("score2", score2);

    playSfx();
    showWord();
});

playBtn.addEventListener("click", () => {
    startTimer();

    playBtn.style.display = "none";
    skipBtn.style.display = "inline";
    easyBtn.style.display = "inline";
    hardBtn.style.display = "inline";
    playSfx();
});

skipBtn.addEventListener("click", () => {
    skippedWord = true;
    showWord();
    skippedWord = false;
    playSfx();
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
                localStorage.setItem("easyWordsScoredByTeam1", JSON.stringify(easyWordsScoredByTeam1Array));
                localStorage.setItem("hardWordsScoredByTeam1", JSON.stringify(hardWordsScoredByTeam1Array));
                currentTeam = 2;
                
            } else {
                score2++;                
                localStorage.setItem("easyWordsScoredByTeam2", JSON.stringify(easyWordsScoredByTeam2Array));
                localStorage.setItem("hardWordsScoredByTeam2", JSON.stringify(hardWordsScoredByTeam2Array));
                currentTeam = 1;
                round--;
            }

            localStorage.setItem("score1", score1);
            localStorage.setItem("score2", score2);

            localStorage.setItem("skippedWordsArray", JSON.stringify(skippedWordsArray));

            localStorage.setItem("round", round);
            localStorage.setItem("currentTeam", currentTeam);

            window.location.href = "../score/score.html";
        }
    }, timerInSeconds);
}
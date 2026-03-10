const team1 = localStorage.getItem("team1");
const team2 = localStorage.getItem("team2");

const score1 = localStorage.getItem("score1");
const score2 = localStorage.getItem("score2");

let round = localStorage.getItem("round");

const teamScore1 = document.getElementById("team1Score");
const teamScore2 = document.getElementById("team2Score");

const nextRoundBtn = document.getElementById("nextRound");
const newGameBtn = document.getElementById("newGame");

let easyWordsScoredByTeam1Array = localStorage.getItem("easyWordsScoredByTeam1") ? JSON.parse(localStorage.getItem("easyWordsScoredByTeam1")) : [];
let easyWordsScoredByTeam2Array = localStorage.getItem("easyWordsScoredByTeam2") ? JSON.parse(localStorage.getItem("easyWordsScoredByTeam2")) : [];
let hardWordsScoredByTeam1Array = localStorage.getItem("hardWordsScoredByTeam1") ? JSON.parse(localStorage.getItem("hardWordsScoredByTeam1")) : [];
let hardWordsScoredByTeam2Array = localStorage.getItem("hardWordsScoredByTeam2") ? JSON.parse(localStorage.getItem("hardWordsScoredByTeam2")) : []; 
let skippedWordsArray = localStorage.getItem("skippedWordsArray") ? JSON.parse(localStorage.getItem("skippedWordsArray")) : [];

const dataScoreTable = document.getElementById("dataScoreTable").querySelector("tbody");

let winner;

const newGameBlockDisplay = document.getElementById("newGameBlockDisplay");

teamScore1.textContent = "Team " + `{${team1}}` + ": " + score1;
teamScore2.textContent = "Team " + `{${team2}}` + ": " + score2;

nextRoundBtn.addEventListener("click", () => {
    window.location.href = "../game/game.html";
});

newGameBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html";
});

const allData = [
    easyWordsScoredByTeam1Array,
    hardWordsScoredByTeam1Array,
    easyWordsScoredByTeam2Array,
    hardWordsScoredByTeam2Array,
    skippedWordsArray
]

const numRows = Math.max(...allData.map(arr => arr.length));

let html = "";

for (let i = 0; i < numRows; i++) {
  html += "<tr>";

  for (let j = 0; j < allData.length; j++) {
    const value = allData[j][i];
    html += `<td>${value != null ? value : ""}</td>`;
  }

  html += "</tr>";
}

dataScoreTable.innerHTML = html;

if (round <= 0) {
    nextRoundBtn.style.display = "none";
    newGameBtn.style.display = "inline-block"
    newGameBlockDisplay.innerHTML = `
    <p style="font-size: 45px"> Winner: ${ winner = score1 > score2 ? team1 : team2 }
    `
} else {
    nextRoundBtn.style.display = "inline-block";
    newGameBtn.style.display = "none";
}

const team1 = localStorage.getItem("team1");
const team2 = localStorage.getItem("team2");

const score1 = localStorage.getItem("score1");
const score2 = localStorage.getItem("score2");

let round = localStorage.getItem("round");

const teamScore1 = document.getElementById("team1Score");
const teamScore2 = document.getElementById("team2Score");

const nextRoundBtn = document.getElementById("nextRound");
const newGameBtn = document.getElementById("newGame");

teamScore1.textContent = "Team " + team1 + ": " + score1;
teamScore2.textContent = "Team " + team2 + ": " + score2;

nextRoundBtn.addEventListener("click", () => {
    window.location.href = "../game/game.html";
});

newGameBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html";
});

if (round <= 0) {
    nextRoundBtn.style.display = "none";
    newGameBtn.style.display = "inline-block"
} else {
    nextRoundBtn.style.display = "inline-block";
    newGameBtn.style.display = "none";
}

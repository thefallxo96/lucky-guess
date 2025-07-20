/*-------------- Constants -------------*/

const MAX_ROUNDS = 5;
const TOTAL_QUESTIONS = 6;

/*---------- Variables (state) ---------*/

let round = 1;
let lives = 3;
let questions = [];
let playerName = '';

/*----- Cached Element References  -----*/

// Screens
const nameScreen = document.getElementById("name-screen");
const gameContainer = document.getElementById("game-container");

// Name input/display
const nameInput = document.getElementById("player-name");
const displayName = document.getElementById("display-name");

// Question-related elements
const questionEl = document.getElementById("question-text");
const roundEl = document.getElementById("round-number");
const livesEl = document.getElementById("lives-count");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-answer");
const startBtn = document.getElementById("start-game");

/*-------------- Functions -------------*/

function getRandomQuestions(count) {
  const questionBank = [
    { question: "What is 5 + 3?", answer: "8" },
    { question: "What is the capital of France?", answer: "paris" },
    { question: "What is the capital of Puerto Rico?", answer: "san juan" },
    { question: "Who wrote 'Hamlet'?", answer: "shakespeare" },
    { question: "How many legs does a spider have?", answer: "8" },
    { question: "Is fire hot or cold?", answer: "hot" } // Bonus question
  ];

  const shuffled = questionBank.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function startGame() {
  const name = nameInput.value.trim();
  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  playerName = name;
  localStorage.setItem("playerName", playerName);
  displayName.textContent = playerName;

  questions = getRandomQuestions(TOTAL_QUESTIONS);

  nameScreen.style.display = "none";
  gameContainer.style.display = "block";

  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = questions[round - 1];
  questionEl.textContent = currentQuestion.question;
  roundEl.textContent = round;
  answerInput.value = "";
  answerInput.focus();
}

function checkAnswer() {
  const playerAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = questions[round - 1].answer.toLowerCase();

  if (playerAnswer === correctAnswer) {
    round++;

    if (round <= MAX_ROUNDS) {
      loadQuestion();
    } else {
      // Advance to bonus football game
      window.location.href = "football.html";
    }
  } else {
    lives--;
    livesEl.textContent = lives;

    if (lives === 0) {
      alert("No lives left! Restarting game...");
      window.location.reload();
    }
  }
}

/*----------- Event Listeners ----------*/

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkAnswer();
});

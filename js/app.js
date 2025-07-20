/*-------------- Constants -------------*/
// define any constants here that will be used throughout the app
// make questions random, set a maximum number of guesses, etc.
'use strict';
const QUESTIONS = [
  "What is the capital of France?",
  "What is 2 + 2?",
  "What is the largest planet in our solar system?",
  "What is the boiling point of water?",
  "What is the chemical symbol for gold?",
  "What is the square root of 16?",
  "What is the currency of Japan?",
  "What is the main ingredient in guacamole?",
  "What is the longest river in the world?",
  "What is the hardest natural substance on Earth?",
  "What is the capital of Puerto Rico?",
  "What is the capital of Australia?",
];
const MAX_GUESSES = 5;
const MIN_GUESSES = 1;


/*---------- Variables (state) ---------*/
let currentGuess = '';
let previousGuesses = [];
let gameOver = false;


/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/
 initializeGame = () => {
  currentGuess = '';
  previousGuesses = [];
  gameOver = false;
  render();
}; 
render = () => {
  // update the UI based on the current state
  const guessInput = document.getElementById('guessInput');
  const previousGuessesList = document.getElementById('previousGuesses');
  const message = document.getElementById('message'); 
  guessInput.value = currentGuess;
  previousGuessesList.innerHTML = previousGuesses.map(guess => `<li>${guess
}</li>`).join('');
  if (gameOver) {
    message.textContent = 'Game Over! Please refresh to play again.';
  } else {
    message.textContent = 'Make your guess!';
  }
};
checkGuess = () => {
  const guessInput = document.getElementById('guessInput');
  const guess = guessInput.value.trim();
  if (guess === '') {
    alert('Please enter a valid guess.');
    return;
  }
  currentGuess = guess;
  previousGuesses.push(currentGuess);
  if (previousGuesses.length >= MAX_GUESSES) {
    gameOver = true;
  }
  render();
};

/*----------- Event Listeners ----------*/


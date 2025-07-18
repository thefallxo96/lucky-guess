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


/*----------- Event Listeners ----------*/


document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");
  const toggleMusicBtn = document.getElementById("toggle-music");

  if (toggleMusicBtn) {
    console.log("Mute button found:", toggleMusicBtn);
    toggleMusicBtn.addEventListener("click", () => {
      console.log("Mute button clicked!");
      bgMusic.muted = !bgMusic.muted;
      toggleMusicBtn.textContent = bgMusic.muted ? "🔇 Muted" : "🔊 Music";
      console.log("Music muted status:", bgMusic.muted);
    });
  } else {
    console.warn("Mute button NOT found!");
  }

  const MAX_ROUNDS = 5;
  const TOTAL_QUESTIONS = 6;

  let round = 1;
  let lives = 3;
  let questions = [];
  let playerName = '';

  // DOM elements
  const nameScreen = document.getElementById("name-screen");
  const quizScreen = document.getElementById("quiz-screen");

  const nameInput = document.getElementById("player-name");
  const displayName = document.getElementById("display-name");

  const questionEl = document.getElementById("question-text");
  const roundEl = document.getElementById("round-number");
  const livesEl = document.getElementById("lives-count");
  const answerInput = document.getElementById("answer-input");
  const submitBtn = document.getElementById("submit-answer");
  const startBtn = document.getElementById("start-game");

  // 🟢 Try autoplay on page load and first click fallback
  function tryAutoplay() {
    bgMusic.volume = 0.3;
    bgMusic.play().then(() => {
      console.log("Background music autoplayed");
    }).catch(() => {
      console.warn("Autoplay blocked; music will start on user interaction or start click.");
    });
  }
  window.addEventListener("click", tryAutoplay, { once: true });
  tryAutoplay();

  // 🚀 Start the game
  function startGame() {
    const name = nameInput.value.trim();
    if (name === "") return alert("Please enter your name.");

    playerName = name;
    localStorage.setItem("playerName", playerName);
    displayName.textContent = playerName;

    // 🎧 Play music if paused
    if (bgMusic.paused) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(err => {
        console.warn("Music still blocked on start:", err);
      });
    }

    questions = getRandomQuestions(TOTAL_QUESTIONS);
    nameScreen.style.display = "none";
    quizScreen.style.display = "block";
    loadQuestion();
  }

  function getRandomQuestions(count) {
    const questionBank = [
      { question: "What is the capital of New York?", answer: "Albany" },
      { question: "What is the name of Bad Bunny's Newest Album?", answer: "Debi Tirar Mas Fotos" },
      { question: "What is the capital of Puerto Rico?", answer: "San Juan" },
      { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare" },
      { question: "How many legs does a spider have?", answer: "8" },
      { question: "Who won the 2025 NBA Championships?", answer: "Knicks" }
    ];
    return questionBank.toSorted(() => 0.5 - Math.random()).slice(0, count);
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
        window.location.href = "football.html";
      }
    } else {
      lives--;
      livesEl.textContent = lives;
      if (lives === 0) {
        alert("Out of lives! Restarting...");
        window.location.reload();
      }
    }
  }

  startBtn.addEventListener("click", startGame);
  submitBtn.addEventListener("click", checkAnswer);
  answerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkAnswer();
  });

  // ⭐ Starfield background
  const starCanvas = document.getElementById("starfield");
  const starCtx = starCanvas.getContext("2d");

  let stars = [];

  function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;

    stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1
    }));
  }

  window.addEventListener("resize", resizeStarCanvas);
  resizeStarCanvas();

  function drawStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(star => {
      starCtx.fillStyle = "white";
      starCtx.beginPath();
      starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      starCtx.fill();
    });
  }

  function updateStars() {
    stars.forEach(star => {
      star.y += star.speed;
      if (star.y > starCanvas.height) {
        star.y = 0;
        star.x = Math.random() * starCanvas.width;
      }
    });
  }

  function animateStars() {
    drawStars();
    updateStars();
    requestAnimationFrame(animateStars);
  }

  animateStars();
});

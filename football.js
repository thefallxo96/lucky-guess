const canvas = document.getElementById("football-game");
const ctx = canvas.getContext("2d");

const starCanvas = document.getElementById("starfield");
const starCtx = starCanvas.getContext("2d");

function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * starCanvas.width,
  y: Math.random() * starCanvas.height,
  size: Math.random() * 1.5 + 0.5,
  speed: Math.random() * 0.5 + 0.2,
}));

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

const football = new Image();
const tire = new Image();

football.src = "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=314,height=314,fit=cover,f=auto/5a343d1083a05b80bf88f74c21e29d42/american-football.png";
tire.src = "https://www.anthem-sports.com/media/catalog/product/cache/9cab8930296f36d1d84ac7e5f8808eab/a/4/a47-039-new.jpg";

let imagesLoaded = 0;
[football, tire].forEach(img => {
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) startGame();
  };
});

let drawId; // to store requestAnimationFrame id for cancellation

function startGame() {
  let footballX = canvas.width / 2;
  let footballY = canvas.height - 60;
  let isThrown = false;
  let throwAngle = 0;

  let tireX = 100;
  let tireY = 150;
  let tireSpeed = 3;

  // Hide bonus UI if somehow visible
  const existingBonus = document.getElementById("bonus-container");
  if (existingBonus) existingBonus.remove();

  canvas.addEventListener("mousemove", e => {
    if (isThrown) return; // no aiming after throw

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    throwAngle = Math.atan2(footballY - mouseY, mouseX - footballX);
  });

  canvas.addEventListener("click", () => {
    if (!isThrown) isThrown = true;
  });

  function showBonusQuestion() {
    // Stop animation loop
    cancelAnimationFrame(drawId);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create bonus question UI
    const bonusDiv = document.createElement("div");
    bonusDiv.id = "bonus-container";
    bonusDiv.style.position = "absolute";
    bonusDiv.style.top = "50%";
    bonusDiv.style.left = "50%";
    bonusDiv.style.transform = "translate(-50%, -50%)";
    bonusDiv.style.background = "rgba(0,0,0,0.85)";
    bonusDiv.style.color = "red";
    bonusDiv.style.padding = "30px";
    bonusDiv.style.border = "3px solid cyan";
    bonusDiv.style.borderRadius = "10px";
    bonusDiv.style.textAlign = "center";
    bonusDiv.style.fontFamily = "'Orbitron', sans-serif";
    bonusDiv.style.zIndex = "1000";

    bonusDiv.innerHTML = `
      <p style="font-size: 1.5rem; margin-bottom: 20px;">Bonus Question:</p>
      <p style="font-size: 1.2rem; margin-bottom: 15px;">What is 7 + 5?</p>
      <input id="bonus-answer" type="text" style="font-size: 1.2rem; padding: 5px; width: 80px;" />
      <br/><br/>
      <button id="bonus-submit" style="font-size: 1.2rem; padding: 8px 16px; cursor: pointer;">Submit</button>
    `;

    document.body.appendChild(bonusDiv);

    document.getElementById("bonus-submit").onclick = () => {
      const ans = document.getElementById("bonus-answer").value.trim();
      if (ans === "12") {
        alert("🎉 Correct! You win the bonus round!");
        window.location.href = "index.html"; // Or wherever you want to go
      } else {
        alert("❌ Wrong answer! Game over.");
        window.location.href = "index.html";
      }
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move tire side to side
    tireX += tireSpeed;
    if (tireX > canvas.width - 100 || tireX < 0) tireSpeed *= -1;

    // Draw tire
    ctx.drawImage(tire, tireX, tireY, 100, 100);

    // Draw football
    if (!isThrown) {
      ctx.drawImage(football, footballX - 20, footballY - 20, 40, 40);
    } else {
      footballX += Math.cos(throwAngle) * 10;
      footballY -= Math.sin(throwAngle) * 10;
      ctx.drawImage(football, footballX - 20, footballY - 20, 40, 40);

      // Check hit
      if (
        footballX > tireX &&
        footballX < tireX + 100 &&
        footballY > tireY &&
        footballY < tireY + 100
      ) {
        showBonusQuestion();
        return; // stop drawing more
      }

      // Miss check
      if (
        footballY < 0 ||
        footballX < 0 ||
        footballX > canvas.width ||
        footballY > canvas.height
      ) {
        alert("❌ Missed! Try again.");
        window.location.href = "index.html";
        return;
      }
    }

    drawId = requestAnimationFrame(draw);
  }

  draw();
}

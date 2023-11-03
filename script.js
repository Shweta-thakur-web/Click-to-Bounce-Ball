const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 20, color: 'blue', speed: 2, dx: 0, dy: 0, bounceCount: 0 };

canvas.addEventListener('click', (e) => {
  const targetX = e.clientX - canvas.getBoundingClientRect().left;
  const targetY = e.clientY - canvas.getBoundingClientRect().top;
  const dx = targetX - ball.x, dy = targetY - ball.y, distance = Math.hypot(dx, dy);

  if (distance > 0) {
    ball.dx = (dx / distance) * ball.speed;
    ball.dy = (dy / distance) * ball.speed;
  }
});

document.getElementById('reset-button').addEventListener('click', () => {
  ball.bounceCount = 0;
  Object.assign(ball, { x: canvas.width / 2, y: canvas.height / 2, dx: 0, dy: 0 });
});

function update() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
    ball.bounceCount++;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
    ball.bounceCount++;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Bounces: ' + ball.bounceCount, 20, 40);
  requestAnimationFrame(update);
}

update();

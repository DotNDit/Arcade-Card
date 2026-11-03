const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const player = { x: 300, y: 220, size: 32, speed: 240 };

//ctx.fillStyle = "hotpink";
//ctx.fillRect(player.x, player.y, player.size, player.size);

function update(dt) {
    if(timeLeft <= 0) return;
    timeLeft -= dt;

    if(keys.has("ArrowLeft")) player.x -= player.speed * dt;
    if(keys.has("ArrowRight")) player.x += player.speed * dt;
    if(keys.has("ArrowUp")) player.y -= player.speed * dt;
    if(keys.has("ArrowDown")) player.y += player.speed * dt;

    if(overlaps(player, coin)) {
        score++;
        coin.x = Math.random() * (canvas.width - coin.size);
        coin.y = Math.random() * (canvas.height - coin.size);
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hotpink";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    ctx.fillStyle = "gold";
    ctx.fillRect(coin.x, coin.y, coin.size, coin.size);
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.fillText(`Score: ${score} Time: ${Math.ceil(timeLeft)}`, 16, 32);
    if (timeLeft <= 0) ctx.fillText("Time's up! Press R to play again.", 16, 64);
}

let last = 0;

function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    update(dt);
    draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

const keys = new Set();
addEventListener("keydown", (e) => keys.add(e.code));
addEventListener("keyup", (e) => keys.delete(e.code));

const coin = { x: 100, y: 100, size: 16 };
let score = 0;

function overlaps(a, b) {
    return a.x < b.x + b.size && b.x < a.x + a.size &&
           a.y < b.y + b.size && b.y < a.y + a.size;
}

let timeLeft = 20;

addEventListener("keydown", (e) => {
    if(e.code === "KeyR" && timeLeft <= 0) {
        score = 0;
        timeLeft = 20;
    }
});

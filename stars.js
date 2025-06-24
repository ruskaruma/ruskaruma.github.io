function drawStars(canvasId, numStars = 60) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Set canvas size to match parent
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 1.2 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fill();
    }
}

function resizeAndDrawStars() {
    drawStars('stars-left', 60);
    drawStars('stars-right', 60);
}

window.addEventListener('DOMContentLoaded', resizeAndDrawStars);
window.addEventListener('resize', resizeAndDrawStars); 
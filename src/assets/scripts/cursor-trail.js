const coords = {x: 0, y: 0};
const circles = document.querySelectorAll("#cursor-trail > div");
// biome-ignore lint/complexity/noForEach: <explanation
circles.forEach((circle) => {
	circle.x = 0;
	circle.y = 0;
});
window.addEventListener("mousemove", (e) => {
	coords.x = e.clientX;
	coords.y = e.clientY;
});
function animateCurosr() {
	let x = coords.x;
	let y = coords.y;
	circles.forEach((circle, index) => {
		const styles = {
			display: "inline",
			left: `${x - 12}px`,
			scale: (circles.length - index) / circles.length,
			top: `${y - 12}px`,
		};
		circle.animate(styles, {duration: 500, fill: "forwards"});
		circle.x = x;
		circle.y = y;
		const nextCircle = circles[index + 1] || circles[0];
		x += (nextCircle.x - x) * 0.35;
		y += (nextCircle.y - y) * 0.35;
	});
	requestAnimationFrame(animateCurosr);
}
animateCurosr();

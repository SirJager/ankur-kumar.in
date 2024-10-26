const coords = { x: undefined, y: undefined };
const dot = document.getElementById("cursor-dot");
const outline = document.getElementById("cursor-outline");
window.addEventListener("mousemove", (e) => {
	coords.x = e.clientX;
	coords.y = e.clientY;
});
function animateCursor() {
	if (!dot || !outline) return;
	dot.style.left = coords.x + "px";
	dot.style.top = coords.y + "px";
	outline.animate(
		{ left: coords.x + "px", top: coords.y + "px" },
		{ duration: 700, fill: "forwards" }
	);
	requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll("h1").forEach((heading) => {
	const outline = document.getElementById("cursor-outline");
	heading.addEventListener("mouseenter", () => {
		const isDark = document.documentElement.getAttribute("data-theme-mode") === "dark";
		if (outline && isDark) {
			const height = heading.getBoundingClientRect().height;
			outline.style.width = `${height}px`;
			outline.style.height = `${height}px`;
			outline.classList.add("dark:bg-base-content");
		}
	});
	heading.addEventListener("mouseleave", () => {
		if (outline) {
			outline.style.width = "";
			outline.style.height = "";
			outline.classList.remove("dark:bg-base-content");
		}
	});
});

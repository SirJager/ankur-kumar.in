import "@/assets/styles/lenis.css";
import Lenis from "lenis";

const lenis = new Lenis({
	duration: 2, // Increase duration for smoother scrolling
	easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), // Custom easing function for smoothness
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

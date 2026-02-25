import { $, component$ } from "@builder.io/qwik";

export default component$(() => {
	const switchTheme = $(() => {
		const dataTheme = document.documentElement.getAttribute("data-theme");
		if (dataTheme) {
			const newTheme = dataTheme.includes("light") ? "dark" : "light";
			window._applyTheme(newTheme);
		} else {
			const storedTheme = localStorage.getItem("theme");
			window._applyTheme(storedTheme);
		}
	});
	return (
		<button
			type="button"
			aria-label="switch themes"
			onClick$={switchTheme}
			class={[
				"cursor-pointer border-base-300 grid aspect-square h-8 w-8 place-items-center rounded-full",
				"focus:ring-base-300 outline-none ring-offset-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black",
			]}
		>
			<span class="z-[1]">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
					class="stroke-base-content group-hover:stroke-base-200 hidden transition duration-300 ease-in-out dark:inline"
				>
					<path
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
					/>
				</svg>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
					class="stroke-base-content group-hover:stroke-base-200 transition duration-300 ease-in-out dark:hidden"
				>
					<path
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
					/>
				</svg>
			</span>
		</button>
	);
});

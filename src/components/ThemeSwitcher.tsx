import {$, component$} from "@builder.io/qwik";

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
			aria-label="switch themes"
			class={[
				"grid aspect-square h-8 w-8 cursor-pointer place-items-center rounded-full border-base-300",
				"outline-none ring-offset-white focus:outline-none focus:ring-2 focus:ring-base-300 focus:ring-offset-2 dark:focus:ring-offset-black",
			]}
			onClick$={switchTheme}
			type="button"
		>
			<span class="z-[1]">
				<svg
					class="hidden stroke-base-content transition duration-300 ease-in-out group-hover:stroke-base-200 dark:inline"
					height="1em"
					viewBox="0 0 24 24"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					/>
				</svg>

				<svg
					class="stroke-base-content transition duration-300 ease-in-out group-hover:stroke-base-200 dark:hidden"
					height="1em"
					viewBox="0 0 24 24"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					/>
				</svg>
			</span>
		</button>
	);
});

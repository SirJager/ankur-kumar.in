import {themeMode, themes} from "@/lib/themes";
import {$, component$} from "@builder.io/qwik";

export default component$(() => {
	const switchTheme = $(() => {
		const theme = document.documentElement.getAttribute("data-theme");
		if (!theme) {
			const _stored = localStorage.getItem("theme");
			if (_stored) window._applyTheme(..._stored.split("@"));
			else window._applyTheme(themes[0], themeMode(themes[0]));
		} else {
			const index = themes.indexOf(theme);
			if (index === -1) window._applyTheme(themes[0], themeMode(themes[0]));
			else {
				const _selected = themes[(index + 1) % themes.length];
				window._applyTheme(_selected, themeMode(_selected));
			}
		}
	});
	return (
		<button
			type="button"
			aria-label="switch themes"
			onClick$={switchTheme}
			class={[
				"grid aspect-square h-8 w-8 place-items-center rounded-full border-base-300",
				"outline-none ring-offset-white focus:outline-none focus:ring-2 focus:ring-base-300 focus:ring-offset-2 dark:focus:ring-offset-black",
			]}
		>
			<span class="z-[1]">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
					class="hidden stroke-base-content transition duration-300 ease-in-out group-hover:stroke-base-200 dark:inline"
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
					class="stroke-base-content transition duration-300 ease-in-out group-hover:stroke-base-200 dark:hidden"
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

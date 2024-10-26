	window.onload = function () {
		const elements = document.querySelectorAll(".scramble");
		if (elements.length === 0) return;

		const scrambleDuration = 400;
		const scrambleInterval = 40;
		const originalDelay = 60;

		const chars = "abcdefghijklmnopqrstuvwxyz";
		const numbers = "0123456789";
		const symbols = "*#@/!%&^";
		const charSet = [...chars.toUpperCase(), ...symbols, ...numbers];

		const getRandomChar = () => charSet[Math.floor(Math.random() * charSet.length)];

		const scrambleEffect = (element, originalText) => {
			let scrambleTime = 0;
			const scrambleIntervalID = setInterval(() => {
				element.textContent = originalText
					.split("")
					.map((char) => {
						if (scrambleTime < scrambleDuration && Math.random() < 0.5) {
							return getRandomChar();
						}
						return char;
					})
					.join("");
				scrambleTime += scrambleInterval;
			}, scrambleInterval);

			setTimeout(() => {
				clearInterval(scrambleIntervalID);
				element.textContent = originalText;
			}, scrambleDuration);
		};

		elements.forEach((element) => {
			const originalText = element.textContent || "";
			element.addEventListener("mouseenter", () => {
				scrambleEffect(element, originalText);
			});
			element.addEventListener("mouseleave", () => {
				setTimeout(() => {
					scrambleEffect(element, originalText);
				}, originalDelay);
			});
		});
	};

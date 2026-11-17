export const nextPaint = () =>
	new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));

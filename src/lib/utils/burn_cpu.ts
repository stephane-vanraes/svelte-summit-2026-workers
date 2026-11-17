export async function burn(ms: number) {
	const end = performance.now() + ms;
	while (performance.now() < end) {
		// busy wait
	}
}

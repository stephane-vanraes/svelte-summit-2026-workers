export default function stepShow(state: { current: number }, max: number) {
	function listener(ev: KeyboardEvent) {
		if (ev.key == 'ArrowUp' && state.current !== 0) {
			state.current -= 1;
		}
		if (ev.key == 'ArrowDown' && state.current !== max) {
			state.current += 1;
		}
	}

	$effect(() => {
		window.addEventListener('keydown', listener);
		return () => window.removeEventListener('keydown', listener);
	});
}

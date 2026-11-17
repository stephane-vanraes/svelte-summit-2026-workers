<script lang="ts">
	import { CELLS } from './props';
	import { ReactiveTypedArray } from './ReactiveTypedArray';

	let renderer: Worker;
	let worker: Worker;

	const buffer = new SharedArrayBuffer(CELLS * Int32Array.BYTES_PER_ELEMENT);
	const version_buffer = new SharedArrayBuffer(4);
	const arr = new ReactiveTypedArray(buffer, version_buffer);

	const reset = () => {
		for (let i = 0; i < CELLS; i++) {
			arr.current[i] = 0;
		}
	};

	let canvas = $state<HTMLCanvasElement>();

	$effect(() => {
		renderer = new Worker(new URL('./renderer.ts', import.meta.url), { type: 'module' });
		worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

		const offscreen = canvas!.transferControlToOffscreen();
		const canvas_data = {
			canvas: offscreen,
			dpr: window.devicePixelRatio || 1,
			h: canvas!.offsetHeight,
			w: canvas!.offsetWidth
		};

		worker.postMessage({ buffer, version_buffer });
		renderer.postMessage({ buffer, version_buffer, canvas_data }, [offscreen]);

		return () => {
			renderer.terminate();
			worker.terminate();
		};
	});
</script>

<main>
	<h1><span class="red under">Demo</span></h1>
	<canvas bind:this={canvas}></canvas>
	<div>
		<label>
			<span>Responsive input field</span>
			<textarea></textarea>
		</label>
		<button onclick={reset}>RESET</button>
	</div>
</main>

<style>
	main {
		align-content: start;
		block-size: 100%;
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;
		isolation: isolate;
		justify-items: center;
		position: relative;
	}
	div {
		align-content: start;
		display: grid;
		gap: 1rem;
		inline-size: 100%;
	}
	textarea {
		block-size: 10lh;
	}
	canvas {
		aspect-ratio: 3 / 2;
		border: 4px solid black;
		display: block;
		width: 100dvmin;
		background: #000;
	}
</style>

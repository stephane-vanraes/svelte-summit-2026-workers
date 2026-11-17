<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import TextArea from '#lib/components/TextArea.svelte';
	import stepShow from '#lib/utils/step_show.svelte.ts';
	import { ReactiveTypedArray } from './ReactiveTypedArray.svelte';

	const values = new SharedArrayBuffer(16);
	const version = $state({ value: 0 });
	const view = new ReactiveTypedArray(values, version);
	const step = $state({ current: 0 });

	let worker: Worker;

	const send = () => worker.postMessage(values);

	$effect(() => {
		const url = new URL('./worker.ts', import.meta.url);
		worker = new Worker(url, { type: 'module' });
		worker.onmessage = () => {
			version.value += 1;
		};

		return () => {
			worker.terminate();
		};
	});

	stepShow(step, 2);
</script>

<main>
	<h1>With a <span class="blue under">Worker</span> and postMessage</h1>
	<div class="app">
		{#each view.current, idx (idx)}
			<input type="number" bind:value={view.current[idx]} disabled />
		{/each}
		<button onclick={send}>START</button>
	</div>
	<TextArea label="Write here" />
	<Code>
		{#if step.current == 0}
			<p>const values = new SharedArrayBuffer(16);</p>
			<p>const version = $state(&lcub; value: 0 &rcub;);</p>
			<p>const view = new ReactiveTypedArray(values, version);</p>
			<p class="red">worker.postMessage(values);</p>
		{/if}
		{#if step.current == 1}
			<p>self.onmessage = async (ev) =&gt; &lcub;</p>
			<p class="red">&nbsp;&nbsp;const worker_view = new Int32Array(ev.data);</p>
			<p>&nbsp;&nbsp;for (let i = 0; i &lt; 100; i++) &lcub;</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;const idx = Math.floor(Math.random() * 4);</p>
			<p class="red">&nbsp;&nbsp;&nbsp;&nbsp;worker_view[idx] += 1;</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;self.postMessage('UPDATE');</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;await burn(1000);</p>
			<p>&nbsp;&nbsp;&rcub;</p>
			<p>&rcub;;</p>
		{/if}
		{#if step.current == 2}
			<p>worker.onmessage = () =&gt; version.value += 1;</p>
		{/if}
	</Code>
</main>

<style>
	.app {
		display: grid;
		gap: 1rem;
		grid-column: 1 / -1;
		grid-template-columns: repeat(4, max-content) 1fr;
	}

	button {
		inline-size: max-content;
	}
	div {
		display: grid;
		gap: 0.5rem;
	}
</style>

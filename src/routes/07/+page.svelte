<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import stepShow from '#lib/utils/step_show.svelte.ts';

	let worker: Worker;
	let buffer = new ArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 4);
	let view = $state(new Int32Array(buffer));
	let step = $state({ current: 0 });
	let isSend = $state(false);

	const send = () => {
		worker.postMessage(view.buffer, [view.buffer]);
		isSend = true;
	};

	const recall = () => {
		worker.postMessage('RECALL');
	};

	$effect(() => {
		const url = new URL('./worker.ts', import.meta.url);
		worker = new Worker(url, { type: 'module' });
		worker.onmessage = (ev: MessageEvent<ArrayBuffer>) => {
			buffer = ev.data;
			view = new Int32Array(buffer);
			isSend = false;
		};

		return () => {
			worker.terminate();
		};
	});

	stepShow(step, 3);
</script>

<main>
	<h1><span class="blue under">Transferable</span> Data</h1>
	<div class="app">
		<ul>
			{#each view, idx (idx)}
				<li>
					<input type="number" bind:value={view[idx]} />
				</li>
			{/each}
		</ul>
		<button type="button" onclick={send}>SEND</button>
		<button type="button" onclick={recall}>RECALL</button>
		<span data-send={isSend}>Bytes in the buffer: {view.byteLength}</span>
	</div>
	<Code>
		{#if step.current == 0}
			<p>let buffer = new ArrayBuffer(16);</p>
			<p>let view = $state(new Int32Array(buffer))</p>
		{/if}
		{#if step.current == 1}
			<p>worker.postMessage(</p>
			<p>&nbsp;&nbsp;view.buffer, <span class="red bold">[view.buffer]</span></p>
			<p>);</p>
		{/if}
		{#if step.current == 2}
			<p>worker.postMessage('RECALL');</p>
		{/if}
		{#if step.current == 3}
			<p>worker.onmessage = (ev) =&gt; &lcub;</p>
			<p>&nbsp;&nbsp;buffer = ev.data;</p>
			<p>&nbsp;&nbsp;view = new Int32Array(buffer);</p>
			<p>&rcub;</p>
		{/if}
	</Code>
</main>

<style>
	main {
		grid-template-columns: 1fr 1fr;
	}

	ul {
		display: contents;
	}

	.app {
		align-items: start;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		grid-column: 1 / -1;

		> button {
			align-self: stretch;
			inline-size: max-content;
		}

		> span {
			align-self: center;
			font-size: 2rem;
		}
	}
</style>

<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import stepShow from '#lib/utils/step_show.svelte.ts';
	let process = $state(false);
	let worker: Worker;

	async function startLongProcess() {
		process = true;
		worker.postMessage('START');
	}

	$effect(() => {
		const url = new URL('./worker.ts', import.meta.url);
		worker = new Worker(url, { type: 'module' });
		worker.onmessage = () => {
			process = false;
		};
		return () => {
			worker.terminate();
		};
	});

	const step = $state({ current: 0 });
	stepShow(step, 2);
</script>

<main>
	<h1>Offloaded to a <span class="blue under">Worker</span></h1>
	<label>
		<span>Write here</span>
		<textarea></textarea>
	</label>
	<div>
		<button onclick={startLongProcess}>
			<span>LONG PROCESS</span>
			<span>(5000ms)</span>
			{#if process}
				<Icon icon="process" />
			{/if}
		</button>
		<span></span>
	</div>
	<Code>
		{#if step.current == 0}
			<p class="code-header">Main thread</p>
			<p>const worker = new Worker(...);</p>
			<p>&nbsp;</p>
			<p>running = true;</p>
			<p>worker.postMessage('START');</p>
		{/if}
		{#if step.current == 1}
			<p class="code-header">Worker thread</p>
			<p>self.onmessage = async () =&gt; &lcub;</p>
			<p>&nbsp;&nbsp;await burn(5000);</p>
			<p>&nbsp;&nbsp;self.postMessage('DONE');</p>
			<p>&rcub;</p>
		{/if}
		{#if step.current == 2}
			<p class="code-header">Main thread</p>
			<p>worker.onmessage = () =&gt; running = false;</p>
		{/if}</Code
	>
</main>

<style>
	main {
		align-items: end;
		grid-template-columns: 1fr;
	}

	textarea {
		min-block-size: 6lh;
		resize: none;
	}

	@keyframes kf-rotate {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}

	div:has(button) {
		display: flex;
		gap: 1rem;
		align-self: stretch;

		> * {
			flex: 1;
		}
	}

	button {
		justify-content: center;
		> :global(svg) {
			animation: kf-rotate 2500ms linear infinite;
		}
	}
</style>

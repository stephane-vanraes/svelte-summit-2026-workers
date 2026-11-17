<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import stepShow from '#lib/utils/step_show.svelte.ts';

	let step = $state({ current: 0 });
	let value = $state('Stephane');
	let worker: Worker;

	const send = () => {
		worker.postMessage({ value });
	};

	const reset = () => {
		value = 'Stephane';
	};

	$effect(() => {
		const url = new URL('./worker.ts', import.meta.url);
		worker = new Worker(url, { type: 'module' });
		worker.onmessage = ({ data }) => {
			value = data.value;
		};
		return () => {
			worker.terminate();
		};
	});

	stepShow(step, 2);
</script>

<main>
	<h1>Sending data to a <span class="blue under">Worker</span> (and back)</h1>
	<div class="wide">
		<label>
			<span>Input Value</span>
			<input bind:value type="text" />
		</label>
		<button class="small" onclick={send} type="button">
			<span>SEND</span>
		</button>
		<button class="small" onclick={reset} type="button">RESET</button>
	</div>
	<Code>
		{#if step.current == 0}
			<p>let value = $state('Stephane');</p>
			<p>const send = () =&gt; worker.postMessage(</p>
			<p>&nbsp;&nbsp;&lcub; value &rcub;</p>
			<p>);</p>
		{/if}
		{#if step.current == 1}
			<p>self.onmessage = async (ev) =&gt; &lcub;</p>
			<p>&nbsp;&nbsp;await burn(10000);</p>
			<p>&nbsp;&nbsp;self.postMessage(</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&lcub; value: ev.data.value.toUpperCase() &rcub;</p>
			<p>&nbsp;&nbsp;);</p>
			<p>&rcub;</p>
		{/if}
		{#if step.current == 2}
			<p>worker.onmessage = (&lcub; data &rcub;) =&gt; &lcub;</p>
			<p>&nbsp;&nbsp;value = data.value;</p>
			<p>&rcub;</p>
		{/if}
	</Code>
</main>

<style>
	main {
		align-content: start;
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr 1fr;
	}

	.wide {
		align-items: end;
		grid-template-columns: repeat(3, max-content);
		grid-column: 1 / span 2;

		> button {
			padding: calc(0.5rem + 4px);
		}
	}

	div {
		align-self: flex-start;
		display: grid;
		gap: 0.5rem;
	}
</style>

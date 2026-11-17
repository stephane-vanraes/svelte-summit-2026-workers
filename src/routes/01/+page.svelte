<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import TextArea from '#lib/components/TextArea.svelte';
	import { burn } from '#lib/utils/burn_cpu.ts';
	import { nextPaint } from '#lib/utils/nextPaint.ts';
	import stepShow from '#lib/utils/step_show.svelte.ts';

	let short_process = $state(false);
	let long_process = $state(false);

	async function startLongProcess() {
		long_process = true;
		await nextPaint();
		await burn(5000);
		long_process = false;
	}

	async function startShortProcess() {
		short_process = true;
		await nextPaint();
		setTimeout(async () => {
			short_process = false;
		}, 1000);
	}

	const step = $state({ current: 0 });
	stepShow(step, 2);
</script>

<main>
	<h1>What is the <span class="red under">problem</span> exactly?</h1>

	<TextArea label="Write here" />

	<div>
		<button onclick={startShortProcess}>
			<span>SHORT PROCESS</span>
			<span>(50ms)</span>
			{#if short_process}
				<Icon icon="process" />
			{/if}
		</button>
		<button onclick={startLongProcess}>
			<span>LONG PROCESS</span>
			<span>(5000ms)</span>
			{#if long_process}
				<Icon icon="process" />
			{/if}
		</button>
	</div>
	<Code>
		<p>async function burn(ms) &lcub;</p>
		<p>&nbsp;&nbsp;const end = performance.now() + ms;</p>
		<p>&nbsp;&nbsp;while (performance.now() &lt; end) &lcub;</p>
		<p class="comment">&nbsp;&nbsp;&nbsp;&nbsp;// blocks the current thread</p>
		<p>&nbsp;&nbsp;&rcub;</p>
		<p>&rcub;</p>
		<p>&nbsp;</p>
		<p>running = true;</p>
		<p>await burn(5000);</p>
		<p>running = false;</p>
	</Code>
</main>

<style>
	main {
		align-items: end;
		grid-template-columns: 1fr;
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
	}

	button {
		justify-content: center;
		> :global(svg) {
			animation: kf-rotate 2500ms linear infinite;
		}
	}
</style>

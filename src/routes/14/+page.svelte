<script lang="ts">
	import Code from '#lib/components/Code.svelte';

	const sab = new SharedArrayBuffer(4);
	const int32 = new Int32Array(sab);

	const process = () =>
		new Promise<void>((resolve) => {
			const { async, value } = Atomics.waitAsync(int32, 0, 0);
			if (async) value.then(() => resolve());
			else resolve();
		});
</script>

<main>
	<h1>The basics of <span class="green under">Atomics</span></h1>
	<div>
		{#await process()}
			<h2>Waiting</h2>
		{:then}
			<h2>Done</h2>
		{/await}
		<button onclick={() => Atomics.notify(int32, 0)}>Change</button>
	</div>
	<code
		><pre><p class="comment">&lcub;#await waitForChange()&rcub;</p>
<p class="comment">&nbsp;&nbsp;&lt;h2&gt;Waiting&lt;/h2&gt;</p>
<p class="comment">&lcub;:then&rcub;</p>
<p class="comment">&nbsp;&nbsp;&lt;h2&gt;Done&lt;/h2&gt;</p>
<p class="comment">&lcub;/await&rcub;</p></pre></code
	>

	<Code>
		<p>const array = new Int32Array(sab);</p>
		<p>&nbsp;&nbsp;</p>
		<p>const waitForChange = () =&gt;</p>
		<p>&nbsp;&nbsp;new Promise((resolve) =&gt; &lcub;</p>
		<p>
			&nbsp;&nbsp;&nbsp;&nbsp;const &lcub; async, value &rcub; = <span class="red"
				>Atomics.waitAsync(array, 0, 0);</span
			>
		</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;if (async) value.then(resolve);</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;else resolve();</p>
		<p>&nbsp;&nbsp;&rcub;);</p>
		<p>&nbsp;&nbsp;</p>
		<p>const change = () => <span class="red">Atomics.notify(array, 0);</span></p>
	</Code>
</main>

<style>
	div {
		align-items: center;
		display: flex;
		gap: 1rem;
		margin-inline: auto;
		inline-size: max-content;
	}
</style>

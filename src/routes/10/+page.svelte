<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import stepShow from '#lib/utils/step_show.svelte.ts';

	const buffer = new SharedArrayBuffer(4 * Int32Array.BYTES_PER_ELEMENT);
	const view1 = new Int32Array(buffer);
	const view2 = new Int32Array(buffer);
	const version = $state({ value: 0 });

	const step = $state({ current: 0 });
	stepShow(step, 3);
</script>

<main>
	<h1>Re-rendering using a <span class="red under">version number</span></h1>
	<div>
		<span class="code-header">View 1</span>
		<ul>
			{#each view1, idx (idx)}
				<li>
					<input
						type="number"
						bind:value={
							() => view1[idx],
							(v) => {
								view1[idx] = v;
								version.value++;
							}
						}
					/>
				</li>
			{/each}
		</ul>
	</div>
	<span>version: {version.value}</span>
	<div>
		{#key version.value}
			<span class="code-header">View 2</span>
			<ul>
				{#each view2, idx (idx)}
					<li>
						<input type="number" bind:value={view2[idx]} disabled />
					</li>
				{/each}
			</ul>
			<p class="crypto">{crypto.randomUUID()}</p>
		{/key}
	</div>
	<div>
		<Code>
			{#if step.current == 0}
				<p class="comment">const buffer = new SharedArrayBuffer(8);</p>
				<p class="comment">const view1 = new Int32Array(buffer);</p>
				<p class="comment">const view2 = new Int32Array(buffer);</p>
				<p class="red">const version = $state(&lcub; value: 0 &rcub;);</p>
			{/if}
			{#if step.current == 1}
				<p>&lt;input</p>
				<p>&nbsp;&nbsp;bind:value=&lcub;</p>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;() =&gt; view1[idx],</p>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;(v) =&gt; &lcub;</p>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;view1[idx] = v;</p>
				<p class="red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version.value++;</p>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;&rcub;</p>
				<p>&nbsp;&nbsp;&rcub;</p>
				<p>/&gt;</p>
			{/if}
			{#if step.current == 2}
				<p class="red">&lcub;#key version.value&rcub;</p>
				<p>&nbsp;&nbsp;&lt;!-- render here --&gt;</p>
				<p>&lcub;/key&rcub;</p>
			{/if}
		</Code>
	</div>
</main>

<style>
	main {
		grid-template-columns: 1fr 1fr;

		> span {
			align-self: center;
			font-size: 2rem;
		}
	}

	ul {
		display: flex;
		margin-block-start: 0.5rem;
	}

	div:last-child {
		grid-column-end: span 2;
	}
</style>

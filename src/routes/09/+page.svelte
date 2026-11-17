<script lang="ts">
	import Code from '#lib/components/Code.svelte';

	const buffer = $state(new SharedArrayBuffer(4 * Int32Array.BYTES_PER_ELEMENT));
	const view1 = $state(new Int32Array(buffer));
	const view2 = $state(new Int32Array(buffer));
	let show = $state(true);
</script>

<main>
	<h1>Introducing <span class="blue under">SharedArrayBuffer</span></h1>
	<div>
		<span class="code-header">View 1</span>
		<ul>
			{#each view1, idx (idx)}
				<li>
					<input type="number" bind:value={view1[idx]} />
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<span class="code-header">View 2</span>
		{#if show}
			<ul>
				{#each view2, idx (idx)}
					<li>
						<input type="number" bind:value={view2[idx]} disabled />
					</li>
				{/each}
			</ul>
		{/if}
		<button onclick={() => (show = !show)}>{show ? 'Hide' : 'Show'}</button>
	</div>
	<hr />
	<Code>
		<p>const buffer = $state(new SharedArrayBuffer(16));</p>
		<p>const view1 = $state(new Int32Array(buffer));</p>
		<p>const view2 = $state(new Int32Array(buffer));</p>
	</Code>
</main>

<style>
	div {
		display: grid;
		gap: 0 1rem;
		grid-template-columns: max-content max-content;

		> span {
			grid-column-end: span 2;
		}
	}

	ul {
		display: flex;
	}

	button {
		max-inline-size: max-content;
	}
</style>

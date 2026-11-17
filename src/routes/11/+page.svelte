<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import stepShow from '#lib/utils/step_show.svelte.ts';
	import { ReactiveTypedArray } from './ReactiveTypedArray.svelte';

	const values = new SharedArrayBuffer(16);
	let version = $state({ value: 0 });
	let step = $state({ current: 0 });

	const view1 = new ReactiveTypedArray(values, version);
	const view2 = new ReactiveTypedArray(values, version);

	stepShow(step, 1);
</script>

<main>
	<h1>Wrapping the version into a <span class="red under">class</span></h1>
	<div>
		<span class="code-header">View 1</span>
		<ul>
			{#each view1.current, idx (idx)}
				<li>
					<input type="number" bind:value={view1.current[idx]} />
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<span class="code-header">View 2</span>
		<ul>
			{#each view2.current, idx (idx)}
				<li>
					<input type="number" bind:value={view2.current[idx]} disabled />
				</li>
			{/each}
		</ul>
	</div>
	<Code>
		{#if step.current == 0}
			<p class="comment">class ReactiveTypedArray &lcub;</p>
			<p>&nbsp;&nbsp;constructor(buffer, version) &lcub;</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;this.#subscribe = <span class="red">createSubscriber</span>(</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(update) =&gt; (this.#update = update)</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;);</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;$effect(() =&gt; &lcub;</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version.value;</p>
			<p class="red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.#update();</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&rcub;);</p>
			<p>&nbsp;&nbsp;&rcub;</p>
			<p>&nbsp;&nbsp;get current() &lcub;</p>
			<p class="red">&nbsp;&nbsp;&nbsp;&nbsp;this.#subscribe();</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;return this.#view;</p>
			<p>&nbsp;&nbsp;&rcub;</p>
			<p class="comment">&rcub;</p>
		{/if}
		{#if step.current == 1}
			<p class="comment">constructor(...) &lcub;</p>
			<p class="comment">&nbsp;&nbsp;...</p>
			<p>&nbsp;&nbsp;this.#version = version;</p>
			<p>&nbsp;</p>
			<p>&nbsp;&nbsp;this.#view = new Proxy(this.#raw, &lcub;</p>
			<p class="comment">&nbsp;&nbsp;&nbsp;&nbsp;...</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;set: (target, prop, value) =&gt; &lcub;</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const index = Number(prop);</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target[index] = value;</p>
			<p class="red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.#version.value += 1;</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return true;</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&rcub;</p>
			<p>&nbsp;&nbsp;&rcub;);</p>
			<p class="comment">&rcub;</p>
		{/if}
	</Code>
</main>

<style>
	main {
		gap: 1.5rem;
		grid-template-columns: 1fr 1fr;
	}
	ul {
		display: flex;
		margin-block-start: 0.5rem;
	}
</style>

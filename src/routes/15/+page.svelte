<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import stepShow from '#lib/utils/step_show.svelte.ts';

	const step = $state({ current: 0 });
	stepShow(step, 2);
</script>

<main>
	<h1>Updating our previous <span class="red under">Class</span></h1>
	<Code>
		{#if step.current == 0}
			<p>this.#version = new Int32Array(versionBuffer);</p>
			<p>this.#subscribe = createSubscriber((update) =&gt; &lcub;</p>
			<p class="comment">&nbsp;&nbsp;this.#update = update;</p>
			<p class="red">&nbsp;&nbsp;this.#listen();</p>
			<p class="comment">&rcub;);</p>
			<p>&nbsp;&nbsp;</p>
			<p class="red">// effect is removed</p>
		{/if}
		{#if step.current == 1}
			<p class="comment">this.#view = new Proxy(this.#raw, &lcub;</p>
			<p class="comment">&nbsp;&nbsp;set: (target, prop, value) =&gt; &lcub;</p>
			<p class="comment">&nbsp;&nbsp;&nbsp;&nbsp;const index = Number(prop);</p>
			<p class="comment">&nbsp;&nbsp;&nbsp;&nbsp;target[index] = value;</p>
			<p class="red">&nbsp;&nbsp;&nbsp;&nbsp;Atomics.add(this.#version, 0, 1);</p>
			<p class="red">&nbsp;&nbsp;&nbsp;&nbsp;Atomics.notify(this.#version, 0);</p>
			<p class="comment">&nbsp;&nbsp;&nbsp;&nbsp;return true;</p>
			<p class="comment">&nbsp;&nbsp;&rcub;</p>
			<p class="comment">&rcub;);</p>
		{/if}
		{#if step.current == 2}
			<p>async #listen() &lcub;</p>
			<p>&nbsp;&nbsp;while (true) &lcub;</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;const seen = Atomics.load(this.#version, 0);</p>
			<p class="red">
				&nbsp;&nbsp;&nbsp;&nbsp;const r = Atomics.waitAsync(this.#version, 0, seen);
			</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;if (r.async) await r.value;</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;this.#update();</p>
			<p>&nbsp;&nbsp;&rcub;</p>
			<p>&rcub;</p>
		{/if}
	</Code>
</main>

<style>
</style>

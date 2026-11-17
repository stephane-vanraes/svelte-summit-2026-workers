<script lang="ts">
	import Icon from './Icon.svelte';

	const { children, gearOnly = false } = $props();
</script>

<button id="show" commandfor="code-block" command="show-modal">
	{#if !gearOnly}
		<span>Code</span>
	{/if}
	<Icon icon="gear" />
</button>

<dialog id="code-block" class="card">
	<button commandfor="code-block" command="close">
		<Icon icon="close" />
	</button>
	<code><pre>{@render children()}</pre></code>
</dialog>

<style>
	dialog {
		font-family: monospace;
		font-size: 1rem;
		inline-size: max-content;
		inset: 50%;
		opacity: 1;
		padding: 1rem 4rem 1rem 1rem;
		position: fixed;
		translate: -50% -50%;
		transition: opacity 250ms linear;

		@starting-style {
			opacity: 0;
		}

		> button {
			background: none;
			border: none;
			color: black;
			display: block;
			inline-size: unset;
			inset: 0 0 auto auto;
			position: fixed;
		}

		&::backdrop {
			background-color: var(--accent3);
			opacity: 0.5;
		}
	}

	#show {
		background-color: white;
		background-image: none;
		border: none;
		border-radius: 0.5rem;
		color: black;
		inline-size: max-content;
		justify-content: unset;
		padding: 0;
		padding: 0.5rem;
		place-items: center;

		&:not(:has(span)) {
			aspect-ratio: 1;
			border-radius: 50%;
			block-size: 2rem;
			display: grid;
			inline-size: 2rem;
			padding: 0;
		}
	}

	code {
		background-color: white;
	}
</style>

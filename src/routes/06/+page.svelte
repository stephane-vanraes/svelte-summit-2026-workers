<script lang="ts">
</script>

<main>
	<h1>Passing data with <span class="blue under">postMessage</span></h1>
	<h2><span class="red">Main</span> Thread</h2>
	<h2><span class="blue">Worker</span> Thread</h2>
	<div style="color: var(--accent1);">
		<span id="--f-1" data-next1="--f-2" data-next2="--f-3">DATA</span>
		<span id="--f-2">DATA</span>
	</div>
	<div style="color: var(--accent2)">
		<span data-row="1">---</span>
		<span id="--f-3">COPY of DATA</span>
	</div>
	<p>
		postMessage creates a <span class="bold">copy</span> of the data using the structured clone algorithm
	</p>
</main>

<style>
	main {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: max-content;
		justify-items: center;
		position: relative;
	}

	div {
		display: grid;
		gap: 3rem;
		isolation: isolate;
		margin-inline: auto;
		place-items: center;

		> span {
			--col: attr(data-col number);
			--dot: 10px;
			--id: attr(id type(<custom-ident>));
			--next1: attr(data-next1 type(<custom-ident>));
			--next2: attr(data-next2 type(<custom-ident>));
			--row: attr(data-row number);
			anchor-name: var(--id);
			background-color: white;
			border-radius: 0.5rem;
			grid-area: var(--row) / var(--col);
			padding: 0.5rem 1rem;

			&:after,
			&:before {
				--x1: calc(anchor(var(--id) center) - var(--dot) / 2);
				--y1: calc(anchor(var(--id) center) - var(--dot) / 2);
				--x2: calc(anchor(var(--next) center) - var(--dot) / 2);
				--y2: calc(anchor(var(--next) center) - var(--dot) / 2);
				--x: calc(var(--x1) + var(--t) * (var(--x2) - var(--x1)) - var(--dot));
				--y: calc(var(--y1) + var(--t) * (var(--y2) - var(--y1)) - var(--dot));
				animation: kf-flow 3000ms linear infinite;
				background-color: currentColor;
				clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
				height: calc(var(--dot) * 3);
				left: var(--x);
				position: absolute;
				top: var(--y);
				width: calc(var(--dot) * 3);
				z-index: -1;
			}

			&[data-next2]::before {
				--next: var(--next2);
				content: '';
			}

			&[data-next1]::after {
				--next: var(--next1);
				content: '';
			}
		}
	}

	@property --t {
		syntax: '<number>';
		inherits: false;
		initial-value: 0;
	}

	@keyframes kf-flow {
		from {
			--t: 0;
		}
		to {
			--t: 1;
		}
	}

	p {
		background-color: var(--accent2);
		border-radius: 1rem;
		color: white;
		line-height: 1.5;
		margin: auto;
		grid-column: 1 / -1;
		place-self: center;
		max-inline-size: 40ch;
		padding: 1rem;
		transition: opacity 500ms 2000ms linear;

		@starting-style {
			opacity: 0;
		}
	}
</style>

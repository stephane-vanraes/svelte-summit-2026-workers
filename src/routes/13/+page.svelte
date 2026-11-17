<main>
	<h1>The many Workers <span class="red under">Problem</span></h1>
	<div>
		<span class="red" id="--f-2" data-next1="--f-3" data-next2="--f-4">Main</span>
		<span class="blue" id="--f-1" data-next1="--f-2">Worker 1</span>
		<span class="blue" id="--f-3">Worker 2</span>
		<span class="blue" id="--f-4">Worker 3</span>
	</div>
	<p>
		When data is shared between several Workers, using postMessage, the signal has to always pass
		through the main thread
	</p>
</main>

<style>
	main {
		align-content: start;
		block-size: 100%;
		display: grid;
		gap: 1rem;
		isolation: isolate;
		justify-items: center;
		position: relative;
	}

	div {
		display: grid;
		gap: 1rem 15rem;
		grid-template-columns: 1fr 1fr;
		margin-inline: auto;
		place-items: center;

		span {
			--col: attr(data-col number);
			--dot: 10px;
			--id: attr(id type(<custom-ident>));
			--next1: attr(data-next1 type(<custom-ident>));
			--next2: attr(data-next2 type(<custom-ident>));
			--row: attr(data-row number);
			anchor-name: var(--id);
			background-color: white;
			border-radius: 0.5rem;
			font-size: 2rem;
			inline-size: 100%;
			grid-area: var(--row) / var(--col);
			padding: 0.5rem 1rem;
			text-align: center;
			text-decoration: none;

			&.blue {
				grid-column: 2 / 3;
			}

			&::after,
			&::before {
				--x1: calc(anchor(var(--id) center) - var(--dot) / 2);
				--y1: calc(anchor(var(--id) center) - var(--dot) / 2);
				--x2: calc(anchor(var(--next) center) - var(--dot) / 2);
				--y2: calc(anchor(var(--next) center) - var(--dot) / 2);
				--x: calc(var(--x1) + var(--t) * (var(--x2) - var(--x1)) - var(--dot));
				--y: calc(var(--y1) + var(--t) * (var(--y2) - var(--y1)) - var(--dot));
				animation: kf-flow 4000ms linear infinite;
				background-color: currentColor;
				clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
				height: calc(var(--dot) * 3);
				left: var(--x);
				position: absolute;
				top: var(--y);
				width: calc(var(--dot) * 3);
				z-index: -2;
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

		[id~='--f-2']::after,
		[id~='--f-2']::before {
			animation-delay: 2000ms;
		}
	}

	@property --t {
		syntax: '<number>';
		inherits: false;
		initial-value: 0;
	}

	@keyframes kf-flow {
		0% {
			--t: 0;
		}
		33% {
			--t: 1;
		}
		100% {
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
		margin-block: 0rem;
		max-inline-size: 40ch;
		padding: 1rem;
		transition: opacity 500ms 2000ms linear;

		@starting-style {
			opacity: 0;
		}
	}
</style>

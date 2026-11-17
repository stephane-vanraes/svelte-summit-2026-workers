<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import '#lib/styles/index.css';
	import Icons from '#lib/components/Icons.svelte';

	let current_page = $state(0);
	let { data, children } = $props();

	$effect(() => {
		const slug = current_page.toString().padStart(2, '0');
		if (slug != page.url.pathname.substring(1)) {
			goto(`/${slug}${page.url.search}`);
		}
	});

	const handleKeyUp = (ev: KeyboardEvent) => {
		switch (ev.key) {
			case 'ArrowRight': {
				if (current_page < data.page_count) {
					current_page += 1;
				}
				break;
			}
			case 'ArrowLeft': {
				if (current_page > 0) {
					current_page -= 1;
				}
			}
		}
	};
</script>

<svelte:window on:keyup={handleKeyUp} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<Icons />

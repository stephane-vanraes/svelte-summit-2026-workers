<script lang="ts">
	type Props = {
		label: string;
	};

	const { label }: Props = $props();
</script>

<label>
	<span>{label}</span>
	<textarea></textarea>
</label>

<style>
	textarea {
		height: 6lh;
	}
</style>

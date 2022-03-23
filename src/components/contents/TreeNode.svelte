<script>
	import { createEventDispatcher } from 'svelte';

	export let name = '';
	export let children = [];
	export let indent = 0;
	export let path = '';
	export let selected = false;

	let open = true;
	const dispatch = createEventDispatcher();

	function selectNode() {
		dispatch('select', path);
		// if (children.length > 0) open = !open;
	}
</script>

<div class="tree-node {selected ? 'selected' : ''}" style="padding-left: {indent}px" on:click={selectNode}>
	{name}
</div>

{#if open}
	{#each children as child (child.path)}
		<svelte:self {...child} indent={indent + 12} on:select />
	{/each}
{/if}

<style lang="scss" scoped>
	.tree-node {
		cursor: pointer;
		user-select: none;
		font-size: 12px;

		&.selected {
			color: white;
		}
	}
</style>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name = '';
	export let children = [];
	export let indent = 0;
	export let path = '';
	export let selected: string;

	let element: HTMLElement;
	let open = true;

	const dispatch = createEventDispatcher();

	function selectNode() {
		dispatch('select', path);
	}

	let isSelected: boolean;
	$: {
		isSelected = selected === path;
		if (isSelected) {
			element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}
</script>

<div bind:this={element} class="tree-node {isSelected ? 'selected' : ''}" style="padding-left: {indent}px" on:click={selectNode}>
	{name}
</div>

{#if open}
	{#each children as child (child.path)}
		<svelte:self {...child} indent={indent + 12} {selected} on:select />
	{/each}
{/if}

<style lang="scss" scoped>
	@import 'variables';
	.tree-node {
		cursor: pointer;
		user-select: none;
		padding: 4px;

		&.selected {
			color: $on-primary;
			background-color: $primary-color;
		}
	}
</style>

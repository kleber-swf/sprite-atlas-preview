<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name = '';
	export let children = [];
	export let indent = 12;
	export let path = '';
	export let selected: string;

	let element: HTMLElement;
	let open = true;

	const dispatch = createEventDispatcher();

	function selectNode(e: MouseEvent) {
		console.log('select node', path);
		dispatch('select', path);
		e.stopImmediatePropagation();
	}

	let isSelected: boolean;
	$: {
		isSelected = selected === path;
		if (isSelected) {
			element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}
</script>

<div bind:this={element} class="tree-node" class:selected={isSelected} on:click={selectNode}>
	<div class="node-name" style="padding-left: {indent}px">{name}</div>

	{#if open}
		<div class="children">
			{#each children as child (child.path)}
				<svelte:self {...child} indent={indent + 12} {selected} on:select />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	@import 'variables';
	.tree-node {
		cursor: pointer;
		user-select: none;

		&.selected {
			& > .node-name {
				background-color: $primary;
				color: $on-primary;
			}

			.children .node-name {
				color: rgba($on-primary, 0.6);
			}
		}

		.node-name {
			padding: 4px;
		}
	}
</style>

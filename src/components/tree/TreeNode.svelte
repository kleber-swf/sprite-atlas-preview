<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/** Node name (title) */
	export let name = '';

	/** Child nodes */
	export let children = [];

	/** The identation in pixel */
	export let indent = 12;

	/** The path for this node */
	export let path = '';

	/** The selected path */
	export let selected: string;

	/** This element */
	let element: HTMLElement;

	/** Whether this node is open */
	let open = true;

	/** Whether this node is selected */
	let isSelected: boolean;

	const dispatch = createEventDispatcher();

	/** Selects this node from the tree */
	function selectNode(e: MouseEvent) {
		e.stopImmediatePropagation();
		dispatch('select', path);
	}

	/** Toogle the open state of this node */
	function toggleOpen(e: MouseEvent) {
		e.stopImmediatePropagation();
		open = !open;
	}

	/** Sets the open state of this node based on the selected path */
	function setOpen() {
		if (!open) open = selected?.indexOf(path) === 0;
	}

	/** Sets the isSelected state based on the selected path */
	function setIsSelected(selPath: string) {
		isSelected = selPath === path;
		if (isSelected) {
			element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}

	$: {
		setOpen();
		setIsSelected(selected);
	}
</script>

<div bind:this={element} class="tree-node" class:selected={isSelected} on:click={selectNode}>
	<div class="node-header" style="padding-left: {indent}px">
		<div class="node-icon" on:click={toggleOpen} class:expanded={open}>
			<span class="icon" class:visible={children.length}>&#9658;</span>
		</div>
		<span class="node-name">{name}</span>
	</div>

	<div class="children" class:expanded={open}>
		{#each children as child (child.path)}
			<svelte:self {...child} indent={indent + 12} {selected} on:select />
		{/each}
	</div>
</div>

<style lang="scss">
	@import 'variables';

	.tree-node {
		user-select: none;
		cursor: pointer;

		.node-header {
			display: flex;
			justify-content: stretch;
			align-items: stretch;
			padding: 4px 0;
			line-height: 20px;

			.node-icon {
				display: inline-block;
				width: 16px;
				margin-right: 2px;
				text-align: center;
				opacity: 0.5;
				transition: all $transition-duration;

				.icon {
					visibility: hidden;
					transform-origin: 50%;
				}

				&:hover {
					color: $on-primary;
					opacity: 1;
				}

				&.expanded {
					transform: rotate(90deg);
				}
			}

			&:hover {
				color: $on-primary !important;
			}
		}

		.children {
			overflow: hidden;
			height: 0;

			&.expanded {
				height: unset;
			}
		}

		&.selected {
			& > .node-header {
				background-color: $primary;
				color: $on-primary;
			}

			.children .node-header {
				color: rgba($on-primary, 0.6);
			}
		}
	}
</style>

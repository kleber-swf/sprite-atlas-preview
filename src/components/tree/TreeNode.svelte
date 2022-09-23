<script lang="ts">
	import type { TreeNodeModel } from 'model/content.model';
	import type { SelectionEventData } from 'model/selection.model';
	import { createEventDispatcher } from 'svelte';

	/** Node name (title) */
	export let name = '';

	/** Child nodes */
	export let children: TreeNodeModel[] = [];

	/** The identation in pixel */
	export let indent = 0;

	/** The path for this node */
	export let path = '';

	/** The selected path */
	export let selected: string[];

	/** This element */
	let element: HTMLElement;

	/** Whether this node is open */
	let expanded = true;

	/** Whether this node is selected */
	let isSelected: boolean;

	let selectionIndex: number;

	const dispatch = createEventDispatcher();

	/** Selects this node from the tree */
	function selectNode(e: MouseEvent) {
		e.stopImmediatePropagation();
		dispatch('select', <SelectionEventData>{ path, add: e.ctrlKey, interval: e.shiftKey });
	}

	/** Toogle the open state of this node */
	function toggleOpen(e: MouseEvent) {
		e.stopImmediatePropagation();
		expanded = !expanded;
	}

	/** Sets the open state of this node based on the selected path */
	function setOpen() {
		if (!expanded) expanded = selected.includes(path);
	}

	/** Sets the isSelected state based on the selected path */
	function setIsSelected(selPaths: string[]) {
		const index = selPaths?.indexOf(path);
		isSelected = index >= 0;
		selectionIndex = selPaths?.length > 1 ? index + 1 : null;
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
		<div class="node-icon" class:expanded>
			<span class="icon" on:click={toggleOpen} class:visible={children.length}>
				<i class="icon-right-dir" />
			</span>
		</div>
		<div class="node-name" class:parent={children.length}><span>{name}</span></div>
		{#if selectionIndex}
			<span class="selection-index neon-text">{selectionIndex}</span>
		{/if}
	</div>

	<div class="children" class:expanded>
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
			position: relative;

			&:hover {
				color: $on-primary;
			}

			.node-icon {
				display: inline-block;
				width: 16px;
				margin-right: 2px;
				text-align: center;
				opacity: 0.5;
				transition: all $transition-duration;
				transform-origin: center;

				.icon {
					visibility: hidden;
				}

				&:hover {
					color: $on-primary;
					opacity: 1;
				}

				&.expanded {
					transform: rotate(90deg);
				}
			}

			.node-name {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				&.parent {
					font-style: italic;
				}
			}

			.selection-index {
				padding: 0 6px;
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

				&:hover {
					background-color: lighten($primary, 5);
				}
			}
		}
	}
</style>

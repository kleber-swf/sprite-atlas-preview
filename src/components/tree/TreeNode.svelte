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
		e.stopImmediatePropagation();
		dispatch('select', path);
	}

	function toggleOpen(e: MouseEvent) {
		e.stopImmediatePropagation();
		open = !open;
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

	$anim-duration: 250ms;

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
				transition: all $anim-duration;

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

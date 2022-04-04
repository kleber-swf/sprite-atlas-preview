<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import PropertyField from './fields/PropertyField.svelte';

	const LS_KEY = 'properties-panel-collapsed';

	export let selection: SelectionModel;

	$: frame = selection?.items.length === 1 ? selection.items[0].frame : null;

	let collapsed = !!localStorage.getItem(LS_KEY);

	function toggleVisible() {
		collapsed = !collapsed;
		localStorage.setItem(LS_KEY, collapsed ? '1' : '0');
	}
</script>

{#if selection && frame}
	<div class="properties" class:collapsed>
		<div class="content">
			<div class="title">
				<div>Properties</div>
			</div>
			<PropertyField title="Path" value={selection.path} />
			<PropertyField title="Frame" value={frame.frame} />
			<PropertyField title="Rotated" value={frame.rotated} />
			<PropertyField title="Trimmed" value={frame.trimmed} />
			<PropertyField title="Sprite Source Size" value={frame.spriteSourceSize} />
			<PropertyField title="Source Size" value={frame.sourceSize} />
		</div>
		<div class="close" on:click={toggleVisible}>⬤</div>
	</div>
{/if}

<style lang="scss" scoped>
	@import 'variables.scss';

	.properties {
		opacity: 0.8;
		position: absolute;
		top: $topbar-height;
		right: 0;
		padding: 0 24px;
		margin: 10px;
		background-color: $background;
		box-shadow: $shadow-level-1;
		border-radius: 4px;
		width: 220px;
		transition: opacity 0.25s;

		&:hover {
			opacity: 0.95;
			transition: opacity 0.5s;
		}

		&.collapsed {
			.content {
				display: none;
			}
			.close {
				color: #fff;
				text-shadow: 0 0px 9px #0ff;
			}
		}

		.content {
			display: block;
			.title {
				padding: 16px 0;
				display: flex;
				justify-content: space-between;
				width: 100%;
			}
		}

		.close {
			font-weight: bold;
			cursor: pointer;
			user-select: none;
			position: absolute;
			top: 0;
			right: 0;
			margin: 8px 12px;
			transition: all 250ms;
			&:hover {
				color: $primary-color;
			}
		}
	}
</style>

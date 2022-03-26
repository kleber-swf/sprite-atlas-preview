<script lang="ts">
	import type { FrameModel } from '../../model/model';
	import PropertyField from './PropertyField.svelte';
	export let selection: FrameModel;

	let collapsed = false;
	function toggleVisible() {
		collapsed = !collapsed;
	}
</script>

{#if selection}
	<div class="properties" class:collapsed>
		<div class="content">
			<div class="title">
				<div>Properties</div>
			</div>
			<PropertyField title="Frame" value={selection.frame} />
			<PropertyField title="Rotated" value={selection.rotated} />
			<PropertyField title="Trimmed" value={selection.trimmed} />
			<PropertyField title="Sprite Source Size" value={selection.spriteSourceSize} />
			<PropertyField title="Source Size" value={selection.sourceSize} />
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
		box-shadow: 0px 0px 12px $shadow-color;
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
				opacity: 0.3;
				&:hover {
					opacity: 1;
				}
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

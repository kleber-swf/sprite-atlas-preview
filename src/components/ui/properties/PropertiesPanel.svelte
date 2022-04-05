<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PropertyField from './fields/PropertyField.svelte';

	export let content: Record<string, any>;
	export let hasClose = true;
	export let collapsed = false;
	const dispatch = createEventDispatcher();

	function toggleVisible() {
		collapsed = !collapsed;
		dispatch('collapsed', collapsed);
	}
</script>

{#if content}
	<div class="properties-panel" class:collapsed>
		<div class="container">
			<div class="content">
				<div class="title">
					<div>Properties</div>
				</div>
				{#each Object.keys(content) as key}
					<PropertyField title={key} value={content[key]} />
				{/each}
			</div>
		</div>
		{#if hasClose}
			<div class="close" on:click={toggleVisible}>⬤</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	@import 'variables.scss';

	.properties-panel {
		.container {
			padding: 12px 24px;
			background-color: $background;
			box-shadow: $shadow-level-1;
			border-radius: 4px;
			opacity: 0.8;
			transition: opacity 0.25s;
			width: 100%;
			position: relative;

			&:hover {
				opacity: 0.95;
			}
		}

		&.collapsed {
			.container {
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
				padding: 0 0 16px 0;
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
			top: 8px;
			right: 12px;
			transition: all 250ms;
			&:hover {
				color: $primary-color;
			}
		}
	}
</style>

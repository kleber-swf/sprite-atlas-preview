<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { SelectionModel } from '../../model/app.model';
	import PreviewRect from './PreviewRect.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	let zoom = 1;

	const dispatch = createEventDispatcher();

	function selectFrame(e: MouseEvent) {
		dispatch('touch', { x: e.offsetX / zoom, y: e.offsetY / zoom });
	}
</script>

<div class="preview" style="zoom:{zoom}">
	<div class="image-container">
		<div class="internal">
			<img src={imgSrc} alt="" on:click={selectFrame} />
			{#if selection}
				<PreviewRect {selection} {zoom} />
			{/if}
		</div>
	</div>
</div>

<style lang="scss" scoped>
	@import 'variables.scss';
	.preview {
		background-color: $dark-background;
		// background-image: url('/assets/patterns/checkers.png');
		background-image: url('/assets/patterns/shadow-checkers.png');
		min-width: 100%;
		min-height: 100%;
		overflow: auto;

		.image-container {
			position: relative;
			.internal {
				position: absolute;
			}
			img {
				box-sizing: content-box;
				// transform: scale(0.5, 0.5);
			}
		}
	}
</style>

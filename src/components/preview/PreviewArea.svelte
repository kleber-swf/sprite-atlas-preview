<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { SelectionModel } from '../../model/app.model';
	import PreviewRect from './PreviewRect.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	let zoom = 1;
	let container: HTMLDivElement;

	const dispatch = createEventDispatcher();

	function selectFrame(e: MouseEvent) {
		dispatch('touch', { x: e.offsetX / zoom, y: e.offsetY / zoom });
	}

	function onMouseWheel(e: WheelEvent) {
		if (!e.ctrlKey) return;
		zoom = Math.max(0.1, Math.min(5, zoom - e.deltaY * 0.001));
		e.preventDefault();
		e.stopImmediatePropagation();
	}

	function onImageLoded(e: Event) {
		const img = e.target as HTMLImageElement;
		if (img.width > img.height) {
			zoom = container.clientHeight / img.width;
		} else {
			zoom = container.clientHeight / img.height;
		}
	}
</script>

<div class="preview" on:wheel={onMouseWheel} bind:this={container}>
	<div class="image-container">
		<div class="internal" style="zoom:{zoom}">
			<img src={imgSrc} alt="" on:click={selectFrame} on:load={onImageLoded} />
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
		user-select: none;
		// background-image: url('/assets/patterns/checkers.png');
		background-image: url('/assets/patterns/shadow-checkers.png');
		min-width: 100%;
		min-height: 100%;
		overflow: auto;

		.image-container {
			position: relative;
			padding: 20px;
			.internal {
				position: absolute;
			}
			img {
				box-sizing: content-box;
				-webkit-user-drag: none;
				user-select: none;
				-moz-user-select: none;
				-webkit-user-select: none;
				-ms-user-select: none;
			}
		}
	}
</style>

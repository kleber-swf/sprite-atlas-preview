<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { SelectionModel } from '../../model/app.model';
	import FrameSelection from './FrameSelection.svelte';

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

	let panning = false;

	function onMouseDown(e: MouseEvent) {
		panning = e.button === 1;
	}

	document.addEventListener('mouseup', () => (panning = false));

	function onMouseMove(e: MouseEvent) {
		if (!panning) return; // middle button
		container.scrollTop -= e.movementY;
		container.scrollLeft -= e.movementX;
		e.preventDefault();
	}
</script>

<div class="preview" bind:this={container} on:wheel={onMouseWheel} on:mousedown={onMouseDown} on:mousemove={onMouseMove}>
	<div class="image-container">
		<div class="internal" style="zoom:{zoom}">
			<img src={imgSrc} alt="" on:click={selectFrame} on:load={onImageLoded} />
			{#if selection}
				<FrameSelection {selection} {zoom} />
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

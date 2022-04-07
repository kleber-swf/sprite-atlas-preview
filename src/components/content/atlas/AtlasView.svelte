<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import { createEventDispatcher } from 'svelte';
	import FrameSelection from './FrameSelection.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	let scale = 1;
	let containerWidth: number;
	let containerHeight: number;

	let root: HTMLDivElement;
	let image: HTMLImageElement;

	const dispatch = createEventDispatcher();

	function selectFrame(e: MouseEvent) {
		dispatch('select', { x: e.offsetX, y: e.offsetY });
	}

	function onImageLoded(e: Event) {
		image = e.target as HTMLImageElement;
		if (image.width > image.height) {
			scale = root.clientWidth / image.width;
		} else {
			scale = root.clientHeight / image.height;
		}
		root.addEventListener('scroll', centerImage);
		root.scrollTo(1, 1);
	}

	function centerImage() {
		const left = (root.scrollWidth - root.clientWidth) * 0.5;
		const top = (root.scrollHeight - root.clientHeight) * 0.5;
		root.scrollTo({ top, left, behavior: 'smooth' });
		root.removeEventListener('scroll', centerImage);
	}

	function onMouseWheel(e: WheelEvent) {
		if (!e.ctrlKey) return;
		scale = Math.max(0.1, Math.min(5, scale - e.deltaY * 0.001));
		e.preventDefault();
		e.stopImmediatePropagation();
	}

	function onMouseDown(e: MouseEvent) {
		if (e.button === 1) {
			document.addEventListener('mouseup', stopPanning);
			document.addEventListener('mousemove', pan);
		}
	}

	function stopPanning() {
		document.removeEventListener('mouseup', stopPanning);
		document.removeEventListener('mousemove', pan);
	}

	function pan(e: MouseEvent) {
		root.scrollTop -= e.movementY;
		root.scrollLeft -= e.movementX;
		e.preventDefault();
	}

	$: {
		if (image) {
			containerWidth = scale * (image.clientWidth + 200);
			containerHeight = scale * (image?.clientHeight + 200);
		} else {
			containerWidth = 200;
			containerHeight = 200;
		}
	}
</script>

<div class="atlas-view" bind:this={root} on:wheel={onMouseWheel} on:mousedown={onMouseDown}>
	<div class="image-container" style="min-width:{containerWidth}px; min-height:{containerHeight}px">
		<div class="internal" style="transform:scale({scale})">
			<img src={imgSrc} alt="" on:click={selectFrame} on:load={onImageLoded} />
			{#if selection}
				{#each selection.items as item (item.path)}
					<FrameSelection selection={item} {scale} />
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@import 'variables.scss';
	.atlas-view {
		background-color: $dark-background;
		user-select: none;
		// background-image: url('/assets/patterns/checkers.png');
		background-image: url('/assets/patterns/shadow-checkers.png');
		width: 100%;
		height: 100%;
		min-width: 100%;
		min-height: 100%;
		max-width: 100%;
		max-height: 100%;
		overflow: auto;

		.image-container {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			.internal {
				img {
					transform-origin: center;
					box-sizing: content-box;
					-webkit-user-drag: none;
					user-select: none;
					-moz-user-select: none;
					-webkit-user-select: none;
					-ms-user-select: none;
				}
			}
		}
	}
</style>

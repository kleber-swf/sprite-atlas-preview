<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import NineSliceEdit from './NineSliceEdit.svelte';

	export let selection: SelectionModel;
	export let imgSrc: string;

	let style: string;
	let scale = 1;
	let containerWidth: number;
	let containerHeight: number;

	let root: HTMLDivElement;

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
		const frame = selection?.items[0].frame?.frame;
		if (frame) {
			const s = [`background-image: url(${imgSrc})`, `width: ${frame.w}px`, `height: ${frame.h}px`, `background-position: -${frame.x}px -${frame.y}px`];
			style = s.join(';');
			containerWidth = scale * (frame.w + 200);
			containerHeight = scale * (frame.h + 200);
		} else {
			containerWidth = 200;
			containerHeight = 200;
		}
	}
</script>

<div class="frame-view" bind:this={root} on:wheel={onMouseWheel} on:mousedown={onMouseDown}>
	<div class="image-container" style="min-width:{containerWidth}px; min-height:{containerHeight}px">
		<div class="internal" style="transform:scale({scale})">
			{#if style}
				<div class="frame" {style}>
					<NineSliceEdit {scale} />
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@import 'variables.scss';
	.frame-view {
		background-color: $dark-background;
		user-select: none;
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
			overflow: hidden;
			.internal {
				.frame {
					transform-origin: center;
					box-sizing: content-box;
					-webkit-user-drag: none;
					user-select: none;
					-moz-user-select: none;
					-webkit-user-select: none;
					-ms-user-select: none;
					display: block;
				}
			}
		}
	}
</style>

<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import type { FrameModel, NineSliceModel } from 'model/atlas.model';
	import NineSliceEdit from './NineSliceEdit.svelte';
	import NineSliceInfoPanel from './NineSliceInfoPanel.svelte';

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

	let frame: FrameModel;

	$: {
		frame = selection?.items[0].frame;
		if (frame) {
			frame.slice = frame.slice ?? { top: 0, left: 0, bottom: 0, right: 0 };
			const rect = frame?.frame;
			const s = [`background-image: url(${imgSrc})`, `width: ${rect.w}px`, `height: ${rect.h}px`, `background-position: -${rect.x}px -${rect.y}px`];
			style = s.join(';');
			containerWidth = scale * (rect.w + 200);
			containerHeight = scale * (rect.h + 200);
		} else {
			containerWidth = 200;
			containerHeight = 200;
		}
	}

	// let model: NineSliceModel;

	function onUpdate(e: CustomEvent<NineSliceModel>) {
		frame.slice = e.detail;
	}
</script>

<div class="frame-view" bind:this={root} on:wheel={onMouseWheel} on:mousedown={onMouseDown}>
	<div class="image-container" style="min-width:{containerWidth}px; min-height:{containerHeight}px">
		<div class="internal" style="transform:scale({scale})">
			{#if style}
				<div class="frame" {style}>
					<NineSliceEdit {scale} model={frame.slice} on:update={onUpdate} />
				</div>
			{/if}
		</div>
	</div>
	{#if style}
		<NineSliceInfoPanel model={frame.slice} />
	{/if}
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

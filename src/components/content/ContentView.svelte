<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const PADDING = 400;

	export let width: number;
	export let height: number;
	export let scale: number;

	let root: HTMLDivElement;
	let containerWidth: number;
	let containerHeight: number;

	const dispatch = createEventDispatcher();

	function onMouseWheel(e: WheelEvent) {
		if (!e.ctrlKey) return;
		scale = Math.max(0.1, Math.min(5, scale - e.deltaY * 0.001));
		dispatch('scaleChanged', scale);
		e.preventDefault();
		e.stopImmediatePropagation();
	}

	function onMouseUp(e: MouseEvent) {
		if (e.button === 0 && !e.ctrlKey) {
			e.stopImmediatePropagation();
			dispatch('unselect');
		}
	}

	function onMouseDown(e: MouseEvent) {
		if (e.button === 1 && !e.ctrlKey) {
			document.addEventListener('mouseup', stopPanning);
			document.addEventListener('mousemove', pan);
		}
	}

	function stopPanning(e: MouseEvent) {
		document.removeEventListener('mouseup', stopPanning);
		document.removeEventListener('mousemove', pan);
		e.stopImmediatePropagation();
	}

	function pan(e: MouseEvent) {
		root.scrollTop -= e.movementY;
		root.scrollLeft -= e.movementX;
		e.preventDefault();
	}

	$: {
		containerWidth = (width ? width * scale : 0) + PADDING;
		containerHeight = (height ? height * scale : 0) + PADDING;
	}
</script>

<div class="content-view" bind:this={root} on:wheel={onMouseWheel} on:mousedown={onMouseDown} on:mouseup={onMouseUp}>
	<div class="container" style="min-width:{containerWidth}px; min-height:{containerHeight}px">
		<div class="internal" style="transform:scale({scale})">
			<div class="content">
				<slot />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import 'variables.scss';
	.content-view {
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

		.container {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			max-width: 100%;
			max-height: 100%;
			overflow: hidden;
			.internal {
				.content {
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

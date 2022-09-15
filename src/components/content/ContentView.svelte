<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let minScale = 0.2;
	export let maxScale = 5;
	export let stageSize = 4096;

	const dispatch = createEventDispatcher();

	let root: HTMLElement;
	let scale = 1;

	onMount(() => {
		zoom(scale);
		root.scrollBy({
			behavior: 'auto',
			left: (root.scrollWidth - root.offsetWidth) * 0.5,
			top: (root.scrollHeight - root.offsetHeight) * 0.5
		});
	});

	// #region Zoom

	function zoom(value: number) {
		scale = Math.max(minScale, Math.min(maxScale, value));
		dispatch('scaleChanged', scale);
	}

	function onWheel(e: WheelEvent) {
		if (!e.ctrlKey) return;
		e.preventDefault();
		e.stopImmediatePropagation();
		zoom(scale - e.deltaY * 0.002);
	}

	function onKeyDown(e: KeyboardEvent) {
		if (!e.ctrlKey) return;

		switch (e.key) {
			case '=':
				zoom(scale + 0.1);
				e.preventDefault();
				e.stopImmediatePropagation();
				return;
			case '-':
				zoom(scale - 0.1);
				e.preventDefault();
				e.stopImmediatePropagation();
				return;
			case '0':
				zoom(1);
				e.preventDefault();
				e.stopImmediatePropagation();
				return;
		}
	}

	// #endregion

	// #region Pan

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

	// #endregion
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="content-view" bind:this={root} on:wheel={onWheel} on:mousedown={onMouseDown} on:click>
	<div class="stage" style:width="{stageSize}px" style:height="{stageSize}px">
		<div class="inner" style:transform="scale({scale})">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	@import 'variables';

	div.content-view {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		overflow: auto;
		user-select: none;

		.stage {
			display: grid;
			background-color: $dark-background;
			background-image: url('/assets/patterns/shadow-checkers.png');

			.inner {
				// display: flex;
				transform-origin: 50%;
				margin: auto;
			}
		}
	}
</style>

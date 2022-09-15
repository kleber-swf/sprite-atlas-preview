<script lang="ts">
	import { onMount } from 'svelte';

	let root: HTMLElement;
	let scale = 1;

	onMount(() => {
		root.scrollBy({
			behavior: 'auto',
			left: (root.scrollWidth - root.offsetWidth) * 0.5,
			top: (root.scrollHeight - root.offsetHeight) * 0.5,
		});
	});

	// #region Zoom

	function zoom(amount: number) {
		scale = Math.max(0.1, Math.min(10, scale + amount));
	}

	function onWheel(e: WheelEvent) {
		if (!e.ctrlKey) return;
		e.preventDefault();
		e.stopImmediatePropagation();
		zoom(-e.deltaY * 0.002);
	}

	function onKeyDown(e: KeyboardEvent) {
		if (!e.ctrlKey) return;
		e.preventDefault();
		e.stopImmediatePropagation();

		if (e.key === '=') zoom(0.1);
		else if (e.key === '-') zoom(-0.1);
		else if (e.key === '0') scale = 1;
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
	<div class="stage">
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
			width: 2048px;
			height: 2048px;
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

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

	// #endregion
</script>

<div class="content-view" bind:this={root} on:wheel={onWheel}>
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

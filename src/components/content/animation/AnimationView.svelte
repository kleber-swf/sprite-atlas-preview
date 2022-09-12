<script lang="ts">
	import { data } from 'data';
	import { onMount } from 'svelte';
	import { Animator } from './Animator';

	const CANVAS_WIDTH = 500;
	const CANVAS_HEIGHT = 500;

	const animator = new Animator();
	let canvas: HTMLCanvasElement;
	let raf: number;
	let now = Date.now();

	function getDelta() {
		const n = Date.now();
		const delta = n - now;
		now = n;
		return delta;
	}

	data.subscribe((data) => {
		if (!data) return;
		animator.setSelection(data.selection, data.imageUrl);
	});

	onMount(() => {
		raf = requestAnimationFrame(function update() {
			const context = canvas.getContext('2d');
			if (!context) return;

			context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			animator.update(context, getDelta());

			raf = requestAnimationFrame(update);
		});

		return () => cancelAnimationFrame(raf);
	});
</script>

<div class="animation-view">
	<canvas bind:this={canvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
</div>

<style lang="scss">
	div.animation-view {
		/// THIS IS WHAT I WANTED WITH THE SCALE AND SCROLL!!!
		/// THE IMMEDIATE CHILD NOW HAS ONLY TO BE SCALED WITH "transform: scale(zoom)"!
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: auto;

		canvas {
			transform: scale(1);
		}
	}
</style>

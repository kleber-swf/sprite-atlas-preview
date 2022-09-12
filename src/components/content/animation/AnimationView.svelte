<script lang="ts">
	import { data } from 'data';
	import type { AppModel } from 'model/app.model';
	import { onMount } from 'svelte';
	import AnimationControls from './AnimationControls.svelte';
	import { Animator } from './Animator';

	let animator = new Animator();
	let canvas: HTMLCanvasElement;
	let raf: number;
	let now = Date.now();
	let canvasSize = { w: 512, h: 512 };
	let isPlaying = false;
	let frameIndex = 0;

	function getDelta() {
		const n = Date.now();
		const delta = n - now;
		now = n;
		return delta;
	}

	data.subscribe((data: AppModel) => {
		if (!data?.selection) return;

		const frames = data.selection.items.map((e) => e.frame.frame);
		canvasSize = frames.reduce(
			(acc, curr) => {
				acc.w = Math.max(acc.w, curr.w);
				acc.h = Math.max(acc.h, curr.h);
				return acc;
			},
			{ w: 0, h: 0 }
		);

		animator.setContent(frames, data.imageUrl);
	});

	onMount(() => {
		const context = canvas.getContext('2d');
		raf = requestAnimationFrame(function update() {
			if (!context) return;

			context.clearRect(0, 0, canvasSize.w, canvasSize.h);
			animator.update(context, getDelta());
			isPlaying = animator.isPlaying;
			frameIndex = animator.frameIndex;

			raf = requestAnimationFrame(update);
		});

		return () => cancelAnimationFrame(raf);
	});

	function togglePlay() {
		animator.togglePlay();
	}
</script>

<div class="animation-view">
	<canvas bind:this={canvas} width={canvasSize.w} height={canvasSize.h} />
	<AnimationControls {isPlaying} on:togglePlay={togglePlay} />
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
			border: 1px solid rgba(white, 0.2);
		}
	}
</style>

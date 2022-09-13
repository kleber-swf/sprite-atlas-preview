<script lang="ts">
	import { data } from 'data';
	import type { AppModel } from 'model/app.model';
	import { onMount } from 'svelte';
	import AnimationControls from './AnimationControls.svelte';
	import { Animator } from './Animator';

	const LS_KEY = 'propeties.anim.fps';

	let animator = new Animator();
	let canvas: HTMLCanvasElement;
	let raf: number;
	let now = Date.now();
	let canvasSize = { w: 512, h: 512 };
	let isPlaying = false;
	let frameRate = parseInt(localStorage.getItem(LS_KEY) ?? '0', 10);
	let frameIndex = 0;
	let totalFrames = 0;

	function getDelta() {
		const n = Date.now();
		const delta = n - now;
		now = n;
		return delta;
	}

	data.subscribe((data: AppModel) => {
		if (!data?.selection) return;

		const frames = data.selection.items.map((e) => e.frame.frame);
		totalFrames = frames.length;
		canvasSize = frames.reduce(
			(acc, curr) => {
				acc.w = Math.max(acc.w, curr.w);
				acc.h = Math.max(acc.h, curr.h);
				return acc;
			},
			{ w: 0, h: 0 }
		);

		animator.setContent(frames, data.imageUrl);
		animator.frameRate = frameRate;
	});

	onMount(() => {
		const context = canvas.getContext('2d');
		raf = requestAnimationFrame(function update() {
			if (!context) return;

			context.clearRect(0, 0, canvasSize.w, canvasSize.h);
			animator.update(context, getDelta());
			isPlaying = animator.isPlaying;
			frameIndex = animator.frameIndex;
			frameRate = animator.frameRate;

			raf = requestAnimationFrame(update);
		});

		return () => cancelAnimationFrame(raf);
	});

	function togglePlay() {
		animator.togglePlay();
	}

	function seek(e: CustomEvent) {
		animator.pause();
		animator.frameIndex = e.detail as number;
	}

	function stop() {
		animator.pause();
		animator.frameIndex = 0;
	}

	function changeFrameRate(e: CustomEvent) {
		const fps = e.detail as number;
		animator.frameRate = fps;
		localStorage.setItem(LS_KEY, fps.toString(10));
	}
</script>

<div class="animation-view">
	<canvas bind:this={canvas} width={canvasSize.w} height={canvasSize.h} />
	<AnimationControls
		{isPlaying}
		{frameIndex}
		{totalFrames}
		{frameRate}
		on:togglePlay={togglePlay}
		on:seek={seek}
		on:stop={stop}
		on:fpsChanged={changeFrameRate}
	/>
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

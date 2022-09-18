<script lang="ts">
	import type { AppModel } from 'model/app.model';
	import { data } from 'store/data';
	import { prefs } from 'store/user-prefs';
	import { onMount } from 'svelte';
	import ContentView from '../ContentView.svelte';
	import AnimationControls from './AnimationControls.svelte';
	import { Animator } from './Animator';

	const key = 'animation';
	const stageSize = 2048;

	let animator = new Animator();
	let canvas: HTMLCanvasElement;
	let raf: number;
	let now = Date.now();
	let canvasSize = { w: 512, h: 512 };
	let isPlaying = false;
	let frameRate = 20;
	let frameIndex = 0;
	let totalFrames = 0;
	let loop = false;
	let maxScale = 1;

	function getDelta() {
		const n = Date.now();
		const delta = n - now;
		now = n;
		return delta;
	}

	prefs.subscribe((model) => {
		loop = model.animation.loop;
		frameRate = model.animation.frameRate;
	})();

	data.subscribe((data: AppModel) => {
		if (!data?.selection) return;

		const frames = data.selection.items.map((e) => e.frame.frame);
		totalFrames = frames.length - 1;
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
		animator.loop = loop;

		maxScale = stageSize / (Math.max(canvasSize.w, canvasSize.h) * 1.1);
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
			loop = animator.loop;

			raf = requestAnimationFrame(update);
		});

		return () => {
			cancelAnimationFrame(raf);
		};
	});

	function togglePlay() {
		animator.togglePlay();
	}

	function seek(e: CustomEvent) {
		animator.pause();
		animator.frameIndex = e.detail as number;
	}

	function jumpFrame(e: CustomEvent) {
		animator.frameIndex = animator.frameIndex + (e.detail as number);
	}

	function stop() {
		animator.pause();
		animator.frameIndex = 0;
	}

	function toggleLoop() {
		const loop = !animator.loop;
		animator.loop = loop;
		prefs.setItem('animation', { loop, frameRate });
	}

	function changeFrameRate(e: CustomEvent) {
		const frameRate = e.detail as number;
		animator.frameRate = frameRate;
		prefs.setItem('animation', { loop, frameRate });
	}
</script>

<div class="animation-view">
	<ContentView {key} {maxScale} {stageSize}>
		<canvas bind:this={canvas} width={canvasSize.w} height={canvasSize.h} />
	</ContentView>
	<div class="controls" class:disabled={totalFrames < 2}>
		<AnimationControls
			{isPlaying}
			{frameIndex}
			{totalFrames}
			{frameRate}
			{loop}
			on:togglePlay={togglePlay}
			on:seek={seek}
			on:stop={stop}
			on:fpsChanged={changeFrameRate}
			on:toggleLoop={toggleLoop}
			on:jumpFrame={jumpFrame}
		/>
	</div>
</div>

<style lang="scss">
	div.animation-view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	canvas {
		margin: auto;
	}
</style>

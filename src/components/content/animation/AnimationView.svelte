<script lang="ts">
	import { Animator } from 'controllers/animator';
	import { AppState } from 'store/app-state';
	import { Content } from 'store/content';
	import { SelectionState } from 'store/selection-state';
	import { onMount } from 'svelte';
	import ContentView from '../ContentView.svelte';
	import AnimationControls from './AnimationControls.svelte';

	const key = 'animation';
	const stageSize = 2048;

	let imageUrl: string;
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
	let yoyo = false;
	let maxScale = 1;

	function getDelta() {
		const n = Date.now();
		const delta = n - now;
		now = n;
		return delta;
	}

	Content.subscribe((model) => (imageUrl = model?.imageUrl));

	SelectionState.subscribe((state) => {
		if (!state) return;
		const frames = state.items.map((e) => e.frame.frame);
		totalFrames = frames.length;
		canvasSize = frames.reduce(
			(acc, curr) => {
				acc.w = Math.max(acc.w, curr.w);
				acc.h = Math.max(acc.h, curr.h);
				return acc;
			},
			{ w: 0, h: 0 }
		);

		animator.setContent(frames, imageUrl);
		animator.frameRate = frameRate;
		animator.loop = loop;
		animator.yoyo = yoyo;

		maxScale = stageSize / (Math.max(canvasSize.w, canvasSize.h) * 1.1);
	});

	AppState.subscribe((state) => {
		loop = state.animation.loop;
		yoyo = state.animation.yoyo;
		frameRate = state.animation.frameRate;
	})();

	onMount(() => {
		const context = canvas.getContext('2d');

		animator.frameRate = frameRate;
		animator.loop = loop;
		animator.yoyo = yoyo;

		raf = requestAnimationFrame(function update() {
			if (!context) return;

			context.clearRect(0, 0, canvasSize.w, canvasSize.h);
			animator.update(context, getDelta());
			isPlaying = animator.isPlaying;
			frameIndex = animator.frameIndex;
			frameRate = animator.frameRate;
			loop = animator.loop;
			yoyo = animator.yoyo;

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
		AppState.setItem('animation', { loop, yoyo, frameRate });
	}

	function toggleYoyo() {
		const yoyo = !animator.yoyo;
		animator.yoyo = yoyo;
		AppState.setItem('animation', { loop, yoyo, frameRate });
	}

	function changeFrameRate(e: CustomEvent) {
		const frameRate = e.detail as number;
		animator.frameRate = frameRate;
		AppState.setItem('animation', { loop, yoyo, frameRate });
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
			{yoyo}
			on:togglePlay={togglePlay}
			on:seek={seek}
			on:stop={stop}
			on:fpsChanged={changeFrameRate}
			on:toggleLoop={toggleLoop}
			on:toggleYoyo={toggleYoyo}
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

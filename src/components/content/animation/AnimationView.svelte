<script lang="ts">
	import { data } from 'data';
	import type { AppModel } from 'model/app.model';
	import { onMount } from 'svelte';
	import AnimationControls from './AnimationControls.svelte';
	import { Animator } from './Animator';

	const FPS_LS_KEY = 'propeties.anim.fps';
	const LOOP_LS_KEY = 'propeties.anim.loop';

	let animator = new Animator();
	let canvas: HTMLCanvasElement;
	let raf: number;
	let now = Date.now();
	let canvasSize = { w: 512, h: 512 };
	let isPlaying = false;
	let frameRate = parseInt(localStorage.getItem(FPS_LS_KEY) ?? '0', 10);
	let frameIndex = 0;
	let totalFrames = 0;
	let loop = localStorage.getItem(LOOP_LS_KEY) === '1';

	function getDelta() {
		const n = Date.now();
		const delta = n - now;
		now = n;
		return delta;
	}

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

		element.scrollBy({
			behavior: 'auto',
			left: (element.scrollWidth - element.offsetWidth) * 0.5,
			top: (element.scrollHeight - element.offsetHeight) * 0.5,
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

	function jumpFrame(e: CustomEvent) {
		animator.frameIndex = animator.frameIndex + (e.detail as number);
	}

	function stop() {
		animator.pause();
		animator.frameIndex = 0;
	}

	function toggleLoop() {
		animator.loop = !animator.loop;
		localStorage.setItem(LOOP_LS_KEY, animator.loop ? '1' : '0');
	}

	function changeFrameRate(e: CustomEvent) {
		const fps = e.detail as number;
		animator.frameRate = fps;
		localStorage.setItem(LOOP_LS_KEY, fps.toString(10));
	}

	// --
	let element: HTMLElement;
	let scale = 1;

	function onWheel(e: WheelEvent) {
		if (!e.ctrlKey) return;
		e.preventDefault();
		e.stopImmediatePropagation();
		scale = Math.min(Math.max(0.2, scale - e.deltaY * 0.01), 100);
	}
</script>

<div class="animation-view">
	<div class="content-view" bind:this={element} on:wheel={onWheel}>
		<div class="stage">
			<div class="inner" style:transform="scale({scale})">
				<canvas bind:this={canvas} width={canvasSize.w} height={canvasSize.h} />
			</div>
		</div>
	</div>
	<div class="controls">
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
	}

	canvas {
		border: 1px solid rgba(white, 0.2);
		margin: auto;
	}

	div.content-view {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		overflow: auto;

		.stage {
			width: 2048px;
			height: 2048px;
			display: grid;

			.inner {
				// display: flex;
				transform-origin: 50%;
				margin: auto;
			}
		}
	}
</style>

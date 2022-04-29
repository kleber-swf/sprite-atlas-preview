<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import type { FrameModel } from 'model/atlas.model';
	import { onDestroy, onMount } from 'svelte';
	import ContentView from '../ContentView.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	let width = 100;
	let height = 100;
	let scale = 1;
	let rafId: number = NaN;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let image: HTMLImageElement;

	let lastTime = 0;
	let currentTime = 0;
	let fps = 30;
	let freq = 1000 / fps;

	let animating = false;
	let frames: FrameModel[];
	let frameIndex = 0;
	let lastFrameTime = 0;

	function update() {
		if (animating) animate();
		rafId = requestAnimationFrame(update);
	}

	function animate() {
		currentTime = Date.now();
		if (currentTime - lastTime < freq) return;
		lastTime = currentTime;
		frameIndex = (frameIndex + 1) % frames.length;
		context.clearRect(0, 0, canvas.width, canvas.height);
		const frame = frames[frameIndex].frame;
		const source = frames[frameIndex].spriteSourceSize;

		// const tx = (canvas.width - fw) * 0.5;
		// const ty = (canvas.width - fw) * 0.5;
		const s = source.h / source.w;
		const tx = source.x;
		const ty = source.y;
		console.log(scale);
		const tw = frame.w;
		const th = frame.h * s;

		context.drawImage(image, frame.x, frame.y, frame.w, frame.h, tx, ty, tw, th);
		// context.strokeStyle = '#FF0';
		// context.strokeRect(tx, ty, tw, th);
	}

	onMount(() => {
		context = canvas.getContext('2d');
		rafId = requestAnimationFrame(update);
	});

	onDestroy(() => {
		cancelAnimationFrame(rafId);
	});

	$: {
		frames = selection?.items.map((e) => e.frame);
		if (!image) image = new Image();
		if (frames) {
			if (imgSrc) image.src = imgSrc;
		}
		// TEMP

		animating = !!frames;
		frameIndex = -1;
		lastTime = Date.now();
	}
</script>

<div class="multi-frame-view">
	<ContentView {width} {height} {scale}>
		<canvas bind:this={canvas} />
	</ContentView>
</div>

<style lang="scss">
	.multi-frame-view {
		width: 100%;
		height: 100%;
	}

	canvas {
		width: 1000px;
		height: 1000px;
		border: 2px solid red;
	}
</style>

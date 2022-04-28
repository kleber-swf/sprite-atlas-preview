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
	let fps = 10;
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
		context.drawImage(image, 0, 0);
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
		if (frames && imgSrc) {
			image = new Image();
			image.src = imgSrc;
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
		width: 2000px;
		height: 2000px;
		border: 2px solid red;
	}
</style>

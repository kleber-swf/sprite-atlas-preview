<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import type { FrameModel, Rect } from 'model/atlas.model';
	import { onMount } from 'svelte';
	import ContentView from '../ContentView.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	let width = 100;
	let height = 100;
	let scale = 1;
	let rafId: number = NaN;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;

	let animating = false;
	let frames: FrameModel[];
	let frameIndex = 0;
	let lastFrameTime = 0;

	function update() {
		// if (!context) context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		console.log(frameIndex++);
		rafId = animating ? requestAnimationFrame(update) : NaN;
	}

	onMount(() => {
		context = canvas.getContext('2d');
		frames = selection?.items.map((e) => e.frame);
		console.log(frames);
		if (frames) {
			animating = true;
			rafId = requestAnimationFrame(update);
		} else {
			animating = false;
			cancelAnimationFrame(rafId);
		}
	});

	$: {
		// if (canvas && isNaN(rafId)) {
		// 	context = canvas.getContext('2d');
		// 	frames = selection?.items.map((e) => e.frame);
		// 	if (selected && frames) {
		// 		animating = true;
		// 		rafId = requestAnimationFrame(update);
		// 	} else {
		// 		animating = false;
		// 		cancelAnimationFrame(rafId);
		// 	}
		// } else {
		// 	animating = false;
		// 	rafId = NaN;
		// 	context = null;
		// }
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
		width: 100%;
		height: 100%;
		border: 2px solid red;
	}
</style>

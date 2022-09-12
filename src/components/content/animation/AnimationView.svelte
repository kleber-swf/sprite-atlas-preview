<script lang="ts">
	import { data } from 'data';
	import type { SelectionItem, SelectionModel } from 'model/app.model';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let selection: SelectionItem[];
	let img: HTMLImageElement;
	let currImgSrc: string;
	let raf: number;

	const cw = 500;
	const ch = 500;

	let now = Date.now();

	function getDelta() {
		const n = Date.now();
		const delta = n - now;
		now = n;
		return delta;
	}

	data.subscribe((data) => {
		if (!data) return;
		createImg(data.imageUrl);
		setSelection(data.selection);
	});

	onMount(() => {
		raf = requestAnimationFrame(function animFrame() {
			update(getDelta());
			raf = requestAnimationFrame(animFrame);
		});
		return () => cancelAnimationFrame(raf);
	});

	function createImg(src: string) {
		if (img && currImgSrc === src) return;
		img = document.createElement('img');
		img.src = src;
		currImgSrc = src;
	}

	function setSelection(model: SelectionModel) {
		selection = model?.items;
		index = 0;
	}

	let index = 0;
	let elapsed = 0;

	function update(dt: number) {
		if (!(img && selection)) return;
		const context = canvas.getContext('2d');
		if (!context) return;

		elapsed += dt;
		if (elapsed > 100) {
			elapsed = 0;
			index = (index + 1) % selection.length;
		}
		context.clearRect(0, 0, cw, ch);

		const frame = selection[index].frame.frame;
		context.drawImage(img, frame.x, frame.y, frame.w, frame.h, 0, 0, frame.w, frame.h);
	}
</script>

<div class="animation-view">
	<canvas bind:this={canvas} width={cw} height={ch} />
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

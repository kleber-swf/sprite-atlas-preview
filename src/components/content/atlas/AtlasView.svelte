<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import { createEventDispatcher } from 'svelte';
	import ContentView from '../ContentView.svelte';
	import FrameSelection from './FrameSelection.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	let scale = 1;
	let containerWidth: number;
	let containerHeight: number;

	let root: HTMLDivElement;
	let image: HTMLImageElement;

	const dispatch = createEventDispatcher();

	function selectFrame(e: MouseEvent) {
		dispatch('select', { x: e.offsetX, y: e.offsetY });
	}

	function onImageLoded(e: Event) {
		image = e.target as HTMLImageElement;
		if (image.width > image.height) {
			scale = image.parentElement.clientWidth / image.width;
		} else {
			scale = image.parentElement.clientHeight / image.height;
		}
		image.parentElement.addEventListener('scroll', centerImage);
		image.parentElement.scrollTo(1, 1);
	}

	function centerImage() {
		const left = (root.scrollWidth - root.clientWidth) * 0.5;
		const top = (root.scrollHeight - root.clientHeight) * 0.5;
		root.scrollTo({ top, left, behavior: 'smooth' });
		root.removeEventListener('scroll', centerImage);
	}

	function onMouseWheel(e: WheelEvent) {
		if (!e.ctrlKey) return;
		scale = Math.max(0.1, Math.min(5, scale - e.deltaY * 0.001));
		e.preventDefault();
		e.stopImmediatePropagation();
	}

	function onMouseDown(e: MouseEvent) {
		if (e.button === 1) {
			document.addEventListener('mouseup', stopPanning);
			document.addEventListener('mousemove', pan);
		}
	}

	function stopPanning() {
		document.removeEventListener('mouseup', stopPanning);
		document.removeEventListener('mousemove', pan);
	}

	function pan(e: MouseEvent) {
		root.scrollTop -= e.movementY;
		root.scrollLeft -= e.movementX;
		e.preventDefault();
	}

	function onScaleChanged(e: CustomEvent<number>) {
		scale = e.detail;
	}

	$: {
		console.log(image?.clientHeight);
		if (image) {
			containerWidth = image.clientWidth;
			containerHeight = image.clientHeight;
		} else {
			containerWidth = 0;
			containerHeight = 0;
		}
	}
</script>

<ContentView width={containerWidth} height={containerHeight} {scale} on:scaleChanged={onScaleChanged}>
	<img src={imgSrc} alt="" on:click={selectFrame} on:load={onImageLoded} />
	{#if selection}
		{#each selection.items as item (item.path)}
			<FrameSelection selection={item} {scale} />
		{/each}
	{/if}
</ContentView>

<style lang="scss">
</style>

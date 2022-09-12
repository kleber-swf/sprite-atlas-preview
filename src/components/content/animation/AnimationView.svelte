<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ContentView from '../ContentView.svelte';

	let scale = 1;
	let containerWidth: number;
	let containerHeight: number;

	let root: HTMLDivElement;
	let image: HTMLImageElement;

	const dispatch = createEventDispatcher();

	function selectFrame(e: MouseEvent) {
		e.stopImmediatePropagation();
		dispatch('select', { x: e.offsetX, y: e.offsetY });
	}

	function deselectFrames() {
		dispatch('select', null);
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

	function onScaleChanged(e: CustomEvent<number>) {
		scale = e.detail;
	}

	$: {
		if (image) {
			containerWidth = image.clientWidth;
			containerHeight = image.clientHeight;
		} else {
			containerWidth = 0;
			containerHeight = 0;
		}
	}
</script>

<ContentView width={containerWidth} height={containerHeight} {scale} on:scaleChanged={onScaleChanged} on:unselect={deselectFrames}>
	<canvas></canvas>	
</ContentView>


<style lang="scss">
</style>

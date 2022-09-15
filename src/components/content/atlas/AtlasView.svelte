<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import { createEventDispatcher } from 'svelte';
	import ContentView from '../ContentView.svelte';
	import FrameSelection from './FrameSelection.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	const stageSize = 4096;
	let scale = 1;
	let maxScale = 1;

	const dispatch = createEventDispatcher();

	function selectFrame(e: MouseEvent) {
		e.stopImmediatePropagation();
		dispatch('select', { x: e.offsetX, y: e.offsetY });
	}

	function deselectFrames() {
		dispatch('select', null);
	}

	function onImageLoded(e: Event) {
		const img = e.target as HTMLImageElement;
		maxScale = stageSize / (Math.max(img.width, img.height) * 1.1);
		scale = Math.min(1, maxScale);
	}
</script>

<ContentView {scale} {maxScale} {stageSize} on:click={deselectFrames}>
	<img src={imgSrc} alt="" on:click={selectFrame} on:load={onImageLoded} />
	{#if selection}
		{#each selection.items as item (item.path)}
			<FrameSelection selection={item} />
		{/each}
	{/if}
</ContentView>

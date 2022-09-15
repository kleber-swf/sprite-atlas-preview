<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import { uiState } from 'store/ui-state';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import ContentView from '../ContentView.svelte';
	import FrameSelection from './FrameSelection.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	const stageSize = 4096;
	let scale: number;
	let maxScale = 1;

	const dispatch = createEventDispatcher();

	uiState.subscribe((model) => {
		if (model?.atlas) scale = model.atlas.scale;
	});

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
		scale = Math.min(scale, maxScale);
	}

	onDestroy(() => uiState.setPreference('atlas', { scale }));
</script>

<ContentView {scale} {maxScale} {stageSize} on:click={deselectFrames} on:scaleChanged={(e) => (scale = e.detail)}>
	<img src={imgSrc} alt="" on:click={selectFrame} on:load={onImageLoded} />
	{#if selection}
		{#each selection.items as item (item.path)}
			<FrameSelection selection={item} />
		{/each}
	{/if}
</ContentView>

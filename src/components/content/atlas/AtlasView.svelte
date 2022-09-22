<script lang="ts">
	import type { SelectionModel } from 'model/selection.model';
	import { data } from 'store/data';
	import { SelectionState } from 'store/selection-state';
	import ContentView from '../ContentView.svelte';
	import FrameSelection from './FrameSelection.svelte';

	let imgSrc: string;
	let selection: SelectionModel;

	const key = 'atlas';
	const stageSize = 4096;
	let framesArray = [];

	let maxScale = 1;

	data.subscribe((model) => {
		if (!model) return;
		imgSrc = model.imageUrl;
		framesArray = model.frames ? Object.keys(model.frames).map((path) => ({ path, ...model.frames[path].frame })) : [];
	});

	SelectionState.subscribe((state) => (selection = state));

	function selectFrame(e: MouseEvent) {
		e.stopImmediatePropagation();
		const x = e.offsetX;
		const y = e.offsetY;
		const frame = framesArray.find((e) => x >= e.x && y >= e.y && x <= e.x + e.w && y <= e.y + e.h);
		SelectionState.select(frame?.path);
	}

	function deselectFrames() {
		SelectionState.select(null);
	}

	function onImageLoded(e: Event) {
		const img = e.target as HTMLImageElement;
		maxScale = stageSize / (Math.max(img.width, img.height) * 1.1);
	}
</script>

<ContentView {key} {maxScale} {stageSize} on:click={deselectFrames}>
	<img src={imgSrc} alt="" on:click={selectFrame} on:load={onImageLoded} />
	{#if selection}
		{#each selection.items as item (item.path)}
			<FrameSelection selection={item} />
		{/each}
	{/if}
</ContentView>

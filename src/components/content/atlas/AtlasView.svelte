<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import { data } from 'store/data';
	import { theSelection } from 'store/selection';
	import ContentView from '../ContentView.svelte';
	import FrameSelection from './FrameSelection.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	const key = 'atlas';
	const stageSize = 4096;
	let framesArray = [];

	let maxScale = 1;

	data.subscribe((model) => {
		framesArray = model?.frames ? Object.keys(model.frames).map((path) => ({ path, ...model.frames[path].frame })) : [];
	});

	function selectFrame(e: MouseEvent) {
		e.stopImmediatePropagation();
		const x = e.offsetX;
		const y = e.offsetY;
		const frame = framesArray.find((e) => x >= e.x && y >= e.y && x <= e.x + e.w && y <= e.y + e.h);
		theSelection.select(frame?.path);
	}

	function deselectFrames() {
		theSelection.select(null);
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

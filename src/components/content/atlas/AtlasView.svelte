<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import { createEventDispatcher } from 'svelte';
	import NewContentView from '../NewContentView.svelte';
	import FrameSelection from './FrameSelection.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

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
		image.parentElement.addEventListener('scroll', centerImage);
		image.parentElement.scrollTo(1, 1);
	}

	function centerImage() {
		const left = (root.scrollWidth - root.clientWidth) * 0.5;
		const top = (root.scrollHeight - root.clientHeight) * 0.5;
		root.scrollTo({ top, left, behavior: 'smooth' });
		root.removeEventListener('scroll', centerImage);
	}
</script>

<NewContentView on:click={deselectFrames}>
	<img src={imgSrc} alt="" on:click={selectFrame} on:load={onImageLoded} />
	{#if selection}
		{#each selection.items as item (item.path)}
			<FrameSelection selection={item} />
		{/each}
	{/if}
</NewContentView>

<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import type { FrameModel, NineSliceModel, Rect } from 'model/atlas.model';
	import NewContentView from '../NewContentView.svelte';
	import NineSliceEdit from './NineSliceEdit.svelte';
	import NineSliceInfoPanel from './NineSliceInfoPanel.svelte';

	export let selection: SelectionModel;
	export let imgSrc: string;

	let scale = 1;
	let width: number;
	let height: number;
	let frame: FrameModel;
	let rect: Rect;
	let style: string;

	$: {
		frame = selection?.items.length === 1 ? selection?.items[0].frame : null;
		rect = frame?.frame;
		if (frame) {
			frame.slice = frame.slice ?? { top: 0, left: 0, bottom: 0, right: 0 };
			const s = [`background-image: url(${imgSrc})`, `width: ${rect.w}px`, `height: ${rect.h}px`, `background-position: -${rect.x}px -${rect.y}px`];
			style = s.join(';');
			width = rect.w;
			height = rect.h;
		} else {
			width = 0;
			height = 0;
		}
	}

	function onUpdate(e: CustomEvent<NineSliceModel>) {
		frame.slice = e.detail;
	}

	function onScaleChanged(e: CustomEvent<number>) {
		scale = e.detail;
	}
</script>

<div class="frame-view">
	<NewContentView on:scaleChanged={onScaleChanged}>
		{#if frame}
			<div class="frame" {style}>
				<NineSliceEdit {scale} model={frame.slice} frame={rect} on:update={onUpdate} />
			</div>
		{/if}
	</NewContentView>

	{#if frame}
		<NineSliceInfoPanel model={frame.slice} frame={rect} />
	{/if}
</div>

<style lang="scss">
	.frame-view {
		width: 100%;
		height: 100%;
	}
</style>

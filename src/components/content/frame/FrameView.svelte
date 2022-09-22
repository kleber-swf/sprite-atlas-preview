<script lang="ts">
	import type { FrameModel, NineSliceModel, Rect } from 'model/atlas.model';
	import { data } from 'store/data';
	import { theSelection } from 'store/selection';
	import ContentView from '../ContentView.svelte';
	import NineSliceEdit from './NineSliceEdit.svelte';
	import NineSliceInfoPanel from './NineSliceInfoPanel.svelte';

	const key = 'frame';

	const stageSize = 2048;
	let scale = 1;
	let maxScale = 1;
	
	let imgSrc: string;
	let frame: FrameModel;
	let rect: Rect;
	let style: string;

	data.subscribe((model) => {
		if (!model) return;
		imgSrc = model.imageUrl;
	});

	theSelection.subscribe((model) => {
		if (!model) return;
		frame = model.items.length === 1 ? model.items[0].frame : null;
		rect = frame?.frame;
		if (frame) {
			frame.slice = frame.slice ?? { top: 0, left: 0, bottom: 0, right: 0 };
			const s = [
				`background-image: url(${imgSrc})`,
				`width: ${rect.w}px`,
				`height: ${rect.h}px`,
				`background-position: -${rect.x}px -${rect.y}px`
			];
			style = s.join(';');
			maxScale = stageSize / (Math.max(rect.w, rect.h) * 1.1);
		}
	});

	function onUpdate(e: CustomEvent<NineSliceModel>) {
		frame.slice = e.detail;
	}
</script>

<div class="frame-view">
	<ContentView {key} {scale} {maxScale} {stageSize} on:scaleChanged={(e) => (scale = e.detail)}>
		{#if frame}
			<div class="frame" {style}>
				<NineSliceEdit {scale} {stageSize} model={frame.slice} frame={rect} on:update={onUpdate} />
			</div>
		{/if}
	</ContentView>

	{#if frame}
		<NineSliceInfoPanel model={frame.slice} frame={rect} />
	{/if}
</div>

<style lang="scss">
	.frame-view {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>

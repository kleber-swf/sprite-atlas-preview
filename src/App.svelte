<script lang="ts">
	import ContentsPanel from './components/contents/ContentsPanel.svelte';
	import PreviewArea from './components/preview/PreviewArea.svelte';
	import PropertiesPanel from './components/properties/PropertiesPanel.svelte';
	import Toolbar from './components/ui/Toolbar.svelte';
	import { createAppModel } from './data';
	import { EXAMPLE_DATA } from './example.data';
	import type { SelectionModel, TreeNodeModel } from './model/app.model';
	import type { FramesMap, Point } from './model/atlas.model';

	const data = createAppModel();
	data.setData('./test/game-ui.png', EXAMPLE_DATA);

	function onNodeSelected(e: CustomEvent<string>) {
		data.select(e.detail);
	}

	let selection: SelectionModel;
	let root: TreeNodeModel;
	let imageUrl: string;
	let frames: FramesMap;

	data.subscribe((value) => {
		if (!value) value = {} as any;
		root = value.root;
		frames = value.frames;
		imageUrl = value.imageUrl;
		selection = value.selection;
	});

	$: framesArray = frames ? Object.keys(frames).map((path) => ({ path, ...frames[path].frame })) : [];

	function onPreviewAreaTouch(e: CustomEvent<Point>) {
		const x = e.detail.x;
		const y = e.detail.y;
		const frame = framesArray.find((e) => x >= e.x && y >= e.y && x <= e.x + e.w && y <= e.y + e.h);
		data.select(frame?.path);
	}

	function onFilesUploaded(e: CustomEvent<{ atlas: any; imageUrl: string }>) {
		data.setData(e.detail.imageUrl, e.detail.atlas);
	}
</script>

<main>
	<div class="toolbar">
		<Toolbar on:files-uploaded={onFilesUploaded} />
	</div>
	<div class="left-area">
		<ContentsPanel nodes={root} selected={selection?.path} on:select={onNodeSelected} />
	</div>
	<div class="preview-area">
		<PreviewArea imgSrc={imageUrl} {selection} on:touch={onPreviewAreaTouch} />
	</div>
	<PropertiesPanel {selection} />
</main>

<style lang="scss" scoped>
	@import 'variables.scss';

	main {
		width: 100%;
		height: 100%;

		& > * {
			position: absolute;
		}

		.toolbar {
			top: 0;
			left: 0;
			right: 0;
			padding: 0;
			margin: 0;
			border: 0;
			height: $topbar-height;
			box-shadow: $shadow-level-1;
			z-index: 1000;
		}

		.left-area {
			top: $topbar-height;
			left: 0;
			bottom: 0;
			width: $left-panel-width;
			box-shadow: $shadow-level-1;
			z-index: 100;
		}

		.preview-area {
			top: $topbar-height;
			left: $left-panel-width;
			bottom: 0;
			right: 0;
		}
	}
</style>

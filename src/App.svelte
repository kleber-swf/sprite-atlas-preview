<script lang="ts">
	import ContentArea from './components/content/ContentArea.svelte';
	import FrameProperties from './components/frame-properties/FrameProperties.svelte';
	import TreeView from './components/tree/TreeView.svelte';
	import Toolbar from './components/ui/Toolbar.svelte';
	import { createAppModel } from './data';
	import type { SelectionModel, TreeNodeModel } from './model/app.model';
	import type { FramesMap, Point } from './model/atlas.model';

	let selection: SelectionModel;
	let root: TreeNodeModel;
	let imageUrl: string;
	let frames: FramesMap;

	const data = createAppModel();

	data.subscribe((value) => {
		if (!value) value = {} as any;
		root = value.root;
		frames = value.frames;
		imageUrl = value.imageUrl;
		selection = value.selection;
	});

	document.addEventListener('keydown', (e) => {
		if (!e.ctrlKey) return;
		if (e.key !== 'c') return;
		if (!selection?.items?.length) return;
		navigator.clipboard.writeText(selection.items.map((e) => e.path).join(' '));
		e.preventDefault();
	});

	$: framesArray = frames ? Object.keys(frames).map((path) => ({ path, ...frames[path].frame })) : [];

	function onNodeSelected(e: CustomEvent<string>) {
		data.select(e.detail);
	}

	// TODO this should be inside preview area
	function onContentAreaTouch(e: CustomEvent<Point>) {
		const x = e.detail.x;
		const y = e.detail.y;
		const frame = framesArray.find((e) => x >= e.x && y >= e.y && x <= e.x + e.w && y <= e.y + e.h);
		data.select(frame?.path);
	}

	function onFilesUploaded(e: CustomEvent<{ atlas: any; imageUrl: string }>) {
		data.setData(e.detail.imageUrl, e.detail.atlas);
	}

	// [DEBUG]
	// data.setData('./test/game-ui.png', EXAMPLE_DATA);
	// onMount(() => {
	// 	data.select('btn-mid/green/hover');
	// });
	// [/DEBUG]
</script>

<main>
	<div class="toolbar">
		<Toolbar on:files-uploaded={onFilesUploaded} />
	</div>
	<div class="left-area">
		<TreeView nodes={root} selected={selection?.path} on:select={onNodeSelected} />
	</div>
	<div class="selection-area">
		<ContentArea imgSrc={imageUrl} {selection} on:select={onContentAreaTouch} />
		<FrameProperties {selection} />
	</div>
</main>

<style lang="scss">
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

		.selection-area {
			top: $topbar-height;
			left: $left-panel-width;
			bottom: 0;
			right: 0;
		}
	}
</style>

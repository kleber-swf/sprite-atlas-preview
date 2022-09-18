<script lang="ts">
	import { prefs } from 'store/user-prefs';
	import { onMount } from 'svelte';
	import ContentArea from './components/content/ContentArea.svelte';
	import FrameProperties from './components/frame-properties/FrameProperties.svelte';
	import TreeView from './components/tree/TreeView.svelte';
	import Toolbar from './components/ui/Toolbar.svelte';
	import type { SelectionModel, TreeNodeModel } from './model/app.model';
	import type { FramesMap, Point } from './model/atlas.model';
	import { data } from './store/data';

	let selection: SelectionModel;
	let root: TreeNodeModel;
	let imageUrl: string;
	let frames: FramesMap;
	let selectedTab = 0;

	prefs.load();

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
		if (e.detail) {
			const x = e.detail.x;
			const y = e.detail.y;
			const frame = framesArray.find((e) => x >= e.x && y >= e.y && x <= e.x + e.w && y <= e.y + e.h);
			data.select(frame?.path);
		} else {
			data.select(null);
		}
	}

	function onFilesUploaded(e: CustomEvent<{ atlas: any; imageUrl: string }>) {
		data.setData(e.detail.imageUrl, e.detail.atlas);
		selectedTab = 0;
	}

	// [DEBUG]
	onMount(() => {
		selectedTab = 1;
		fetch('./test/robot.json')
			.then((e) => e.json())
			.then((json) => {
				data.setData('./test/robot.png', json);
			})
			.then(() => {
				data.select('walk/walk0');
			});
	});
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
		<ContentArea imgSrc={imageUrl} {selection} {selectedTab} on:select={onContentAreaTouch} />
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

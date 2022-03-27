<script lang="ts">
	import { validate_each_argument } from 'svelte/internal';

	import ContentsPanel from './components/contents/ContentsPanel.svelte';
	import PreviewArea from './components/preview/PreviewArea.svelte';
	import PropertiesPanel from './components/properties/PropertiesPanel.svelte';
	import { DATA } from './data';
	import type { SelectionModel, TreeNodeModel } from './model/model';

	const data = DATA;

	function onNodeSelected(e: CustomEvent<string>) {
		data.select(e.detail);
	}

	let selection: SelectionModel;
	let root: TreeNodeModel;
	let imageUrl: string;

	data.subscribe((value) => {
		root = value.root;
		imageUrl = value.imageUrl;
		selection = value.selection;
	});
</script>

<main>
	<div class="toolbar" />
	<div class="left-area">
		<ContentsPanel nodes={root} selected={selection?.path} on:select={onNodeSelected} />
	</div>
	<div class="preview-area">
		<PreviewArea imgSrc={imageUrl} {selection} />
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
			height: $topbar-height;
			background-color: $dark-background;
			box-shadow: 0px 0px 12px $shadow-color;
			z-index: 1000;
		}
		.left-area {
			top: $topbar-height;
			left: 0;
			bottom: 0;
			width: $left-panel-width;
			box-shadow: 0px 0px 12px $shadow-color;
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

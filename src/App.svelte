<script lang="ts">
	import ContentsPanel from './components/contents/ContentsPanel.svelte';
	import PreviewArea from './components/preview/PreviewArea.svelte';
	import PropertiesPanel from './components/properties/PropertiesPanel.svelte';
	import { DATA } from './data';

	const data = DATA;

	function onNodeSelected(e: CustomEvent<string>) {
		data.selection = e.detail;
	}

	$: selection = data.selectedFrame;
</script>

<main>
	<div class="toolbar" />
	<div class="left-area">
		<ContentsPanel nodes={data.root} selected={data.selection} on:select={onNodeSelected} />
	</div>
	<div class="preview-area">
		<PreviewArea imgSrc={data.imageUrl} {selection} />
	</div>
	<!-- <div class="container-fluid h-100 m-0 p-0">
			<div class="h-100 d-flex flex-row">
				<div class="left-container h-100">
				</div>
				<div class="center-container h-100">
				</div>
				<div class="right-container h-100">
				<PropertiesPanel {selection} />
			</div>
		</div>
	</div>
	<div class="content" /> -->
</main>

<style lang="scss" global>
	@import 'variables.scss';
	$topbar-height: 25px;
	$left-width: 320px;

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
			width: $left-width;
			box-shadow: 0px 0px 12px $shadow-color;
			z-index: 100;
		}
		.preview-area {
			top: $topbar-height;
			left: $left-width;
			bottom: 0;
			right: 0;
			overflow: auto;
		}
	}
</style>

<script lang="ts">
	import ContentsPanel from './components/contents/ContentsPanel.svelte';
	import PreviewArea from './components/preview/PreviewArea.svelte';
	import PropertiesPanel from './components/properties/PropertiesPanel.svelte';
	import { DATA } from './data';

	const data = DATA;

	function onNodeSelected(e: CustomEvent<string>) {
		data.selection = e.detail;
	}

	$: selection = data.selection ? data.data.frames[data.selection] : null;
</script>

<main>
	<div class="container-fluid h-100 m-0 p-0">
		<div class="h-100 d-flex flex-row">
			<div class="left-container">
				<ContentsPanel frames={data.data.frames} selected={data.selection} on:select={onNodeSelected} />
			</div>
			<div class="center-container">
				<PreviewArea />
			</div>
			<div class="right-container">
				<PropertiesPanel {selection} />
			</div>
		</div>
	</div>
	<div class="content" />
</main>

<style lang="scss" scoped>
	@import 'variables.scss';

	main {
		border: 0;
		padding: 0;
		margin: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		color: $text-color;

		.left-container,
		.right-container {
			width: 320px;
			display: flex;
			align-items: stretch;
		}

		.center-container {
			flex: 1;
			align-items: stretch;
		}

		::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}

		::-webkit-scrollbar-track {
			background: darken($dark-background, 1%);
		}

		::-webkit-scrollbar-thumb {
			background-color: rgba($primary-color, 0.3);
			border-radius: 4px;
		}

		::-webkit-scrollbar-thumb:hover {
			background-color: $primary-color;
		}
	}
</style>

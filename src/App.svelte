<script lang="ts">
	import type { SelectionModel } from 'model/selection.model';
	import { SelectionState } from 'store/selection-state';
	import { uiState } from 'store/ui-state';
	import { onMount } from 'svelte';
	import ContentArea from './components/content/ContentArea.svelte';
	import FrameProperties from './components/frame-properties/FrameProperties.svelte';
	import TreeView from './components/tree/TreeView.svelte';
	import Toolbar from './components/ui/Toolbar.svelte';
	import { data } from './store/data';

	uiState.load();

	document.addEventListener('keydown', (e) => {
		if (!(e.ctrlKey || e.key === 'c')) return;

		let selection: SelectionModel;
		SelectionState.subscribe((model) => (selection = model))();
		if (!selection?.items?.length) return;

		navigator.clipboard.writeText(selection.items.map((e) => e.path).join(' '));
		e.preventDefault();
	});

	// [DEBUG]
	onMount(() => {
		fetch('./test/robot.json')
			.then((e) => e.json())
			.then((json) => {
				data.setData('./test/robot.png', json);
			})
			.then(() => {
				SelectionState.select('walk/walk0');
			});
	});
	// [/DEBUG]
</script>

<main>
	<div class="toolbar">
		<Toolbar />
	</div>
	<div class="left-area">
		<TreeView />
	</div>
	<div class="selection-area">
		<ContentArea />
		<FrameProperties />
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

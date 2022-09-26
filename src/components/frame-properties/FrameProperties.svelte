<script lang="ts">
	import { SelectionState } from 'store/selection-state';
	import { AppState } from 'store/app-state';
	import PropertiesPanel from '../ui/properties/PropertiesPanel.svelte';

	let content: Record<string, any>;
	let collapsed = false;

	SelectionState.subscribe((selection) => {
		if (selection?.items.length === 1) {
			content = Object.assign({}, selection.items[0].frame);
			delete content.slice;
		} else {
			content = null;
		}
	});

	AppState.subscribe((state) => (collapsed = state.framePropertiesCollapsed))();

	function onPanelCollased(e: CustomEvent<boolean>) {
		collapsed = e.detail;
		AppState.setItem('framePropertiesCollapsed', collapsed);
	}
</script>

<div class="properties">
	<PropertiesPanel {content} {collapsed} on:collapsed={onPanelCollased} />
</div>

<style lang="scss">
	@import 'variables.scss';
	.properties {
		position: absolute;
		top: $panel-title-height;
		right: 0;
		width: 260px;
		margin: 20px;
	}
</style>

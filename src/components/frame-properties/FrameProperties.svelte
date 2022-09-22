<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import { theSelection } from 'store/selection';
	import { uiState } from 'store/ui-state';
	import PropertiesPanel from '../ui/properties/PropertiesPanel.svelte';

	let selection: SelectionModel;
	let collapsed = false;

	theSelection.subscribe(model=>selection=model);
	uiState.subscribe((model) => (collapsed = model.framePropertiesCollapsed))();

	function onPanelCollased(e: CustomEvent<boolean>) {
		collapsed = e.detail;
		uiState.setItem('framePropertiesCollapsed', collapsed);
	}

	$: content = selection?.items.length === 1 ? selection.items[0].frame : null;
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

<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import { uiState } from 'store/ui-state';
	import PropertiesPanel from '../ui/properties/PropertiesPanel.svelte';

	export let selection: SelectionModel;
	let collapsed = false;

	uiState.subscribe((model) => {
		if (model) collapsed = model.framePropertiesCollapsed;
	});

	function onPanelCollased(e: CustomEvent<boolean>) {
		uiState.setPreference('framePropertiesCollapsed', e.detail);
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

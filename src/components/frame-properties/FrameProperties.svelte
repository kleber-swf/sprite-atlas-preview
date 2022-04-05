<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import PropertiesPanel from '../ui/properties/PropertiesPanel.svelte';

	const LS_KEY = 'propeties.panel.collapsed';

	export let selection: SelectionModel;
	let collapsed = localStorage.getItem(LS_KEY) === '1';

	function onPanelCollased(e: CustomEvent<boolean>) {
		localStorage.setItem(LS_KEY, e.detail ? '1' : '0');
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

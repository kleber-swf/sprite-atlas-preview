<script lang="ts">
	import type { NineSliceModel, Rect } from 'model/atlas.model';
	import PropertiesPanel from '../../ui/properties/PropertiesPanel.svelte';
	export let model: NineSliceModel & { width?: number; height?: number };
	export let frame: Rect;

	$: {
		if (model && frame) {
			model.width = frame.w - (model.left + model.right);
			model.height = frame.h - (model.top + model.bottom);
		}
	}
</script>

<div class="nine-slice-info-panel">
	<PropertiesPanel title="Nine Slice" content={model} collapsable={false} />
</div>

<style lang="scss">
	.nine-slice-info-panel {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 160px;
		margin: 20px;
		:global(.property-field) {
			margin-bottom: 10px !important;
		}
	}
</style>

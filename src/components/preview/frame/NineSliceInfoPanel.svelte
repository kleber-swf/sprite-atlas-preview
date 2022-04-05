<script lang="ts">
	import type { NineSliceModel } from 'model/app.model';
	import PropertiesPanel from '../../ui/properties/PropertiesPanel.svelte';
	export let model: NineSliceModel;
</script>

<div class="nine-slice-info-panel">
	<PropertiesPanel content={model} />
</div>

<style lang="scss">
	.nine-slice-info-panel {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 200px;
		margin: 20px;
	}
</style>

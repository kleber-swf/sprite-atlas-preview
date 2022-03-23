<script lang="ts">
	import type { FrameModel } from '../../model/model';
	import Panel from '../../ui/Panel.svelte';
	import PropertyField from './PropertyField.svelte';
	export let selection: FrameModel;
</script>

<Panel title="Properties">
	{#if selection}
		<PropertyField title="Frame" value={selection.frame} />
		<PropertyField title="Rotated" value={selection.rotated} />
		<PropertyField title="Trimmed" value={selection.trimmed} />
		<PropertyField title="Sprite Source Size" value={selection.spriteSourceSize} />
		<PropertyField title="Source Size" value={selection.sourceSize} />
	{/if}
</Panel>

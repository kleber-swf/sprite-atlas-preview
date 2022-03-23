<script lang="ts">
	import type { TreeNodeModel } from '../../model/model';
	import Panel from '../../ui/Panel.svelte';
	import TreeNode from './TreeNode.svelte';

	export let nodes: TreeNodeModel;
	export let selected: string;
</script>

<Panel title="Contents">
	<TreeNode {...nodes} on:select {selected} />
</Panel>

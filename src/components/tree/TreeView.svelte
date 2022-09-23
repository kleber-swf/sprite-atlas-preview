<script lang="ts">
	import type { TreeNodeModel } from 'model/content.model';
	import type { TreeSelectionEventData } from 'model/selection.model';
	import { Content } from 'store/content';
	import { SelectionState } from 'store/selection-state';
	import TreeNode from './TreeNode.svelte';

	let selection: string[];
	let nodes: TreeNodeModel;

	Content.subscribe((model) => {
		if (model) nodes = model.root;
	});

	SelectionState.subscribe((state) => (selection = state?.items.map((e) => e.path)));

	function onNodeSelected(e: CustomEvent<TreeSelectionEventData>) {
		SelectionState.select(e.detail.path, e.detail.add);
	}
</script>

<div class="tree-view">
	<div class="title">Frames</div>
	<div class="content">
		{#if nodes}
			{#each nodes.children as node}
				<TreeNode {...node} on:select={onNodeSelected} selected={selection} />
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	@import 'variables.scss';

	.tree-view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.title {
			background-color: $dark-background;
			height: $panel-title-height;
			padding: 4px 8px;
			line-height: 20px;
		}

		.content {
			padding: 4px 8px;
			height: 100%;
			overflow: auto;
			flex: 1;
		}
	}
</style>

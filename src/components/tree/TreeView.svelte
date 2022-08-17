<script lang="ts">
	import type { TreeNodeModel } from 'model/app.model';
	import TreeNode from './TreeNode.svelte';

	export let nodes: TreeNodeModel;
	export let selected: string;
</script>

<div class="tree-view">
	<div class="title">Frames</div>
	<div class="content">
		{#if nodes}
			{#each nodes.children as node}
				<TreeNode {...node} on:select {selected} />
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
		}

		.content {
			padding: 4px 8px;
			height: 100%;
			overflow: auto;
			flex: 1;
		}
	}
</style>

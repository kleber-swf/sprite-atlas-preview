<script lang="ts">
	import type { TreeNodeModel } from '../../model/app.model';
	import TreeNode from './TreeNode.svelte';

	export let nodes: TreeNodeModel;
	export let selected: string;
</script>

<div class="contents-panel">
	<div class="title">Contents</div>
	<div class="content">
		<TreeNode {...nodes} on:select {selected} />
	</div>
</div>

<style lang="scss" scoped>
	@import 'variables.scss';

	.contents-panel {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.title {
			background-color: $dark-background;
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

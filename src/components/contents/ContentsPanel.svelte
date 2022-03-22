<script lang="ts">
	import type { FramesMap, TreeNodeModel } from '../../model/model';
	import Panel from '../../ui/Panel.svelte';
	import TreeNode from './TreeNode.svelte';

	export let frames: FramesMap = {};
	export let selected = null;

	// TODO this should be made just once
	function mapFrames(framesMap: FramesMap) {
		const content: TreeNodeModel = { name: '', path: '', children: [], selected: false };

		Object.keys(framesMap).forEach((key) => {
			const parts = key.split('/');
			let curr = content;
			for (const part of parts) {
				let child = curr.children.find((e) => e.name === part);
				if (!child) {
					const path = (curr.path ? curr.path + '/' : '') + part;
					child = {
						name: part,
						path,
						selected: path === selected,
						children: [],
					};
					curr.children.push(child);
				}
				curr = child;
			}
		});

		return content;
	}

	$: root = mapFrames(frames);
</script>

<Panel title="Contents">
	<TreeNode {...root} on:select />
</Panel>

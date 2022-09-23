import { writable } from 'svelte/store';
import type { AtlasDataModel, FramesMap } from '../model/atlas.model';
import type { ContentModel, TreeNodeModel } from '../model/content.model';

export const VERSION = '%VERSION%';

export const Content = (() => {
	const { subscribe, set } = writable<ContentModel>();

	function framesToRoot(framesMap: FramesMap) {
		if (!framesMap) return null;
		const content: TreeNodeModel = { name: '', path: '', children: [] };

		Object.keys(framesMap).forEach((key) => {
			const parts = key.split('/');
			framesMap[key].name = key;
			let curr = content;
			for (const name of parts) {
				let child = curr.children.find((e) => e.name === name);
				if (!child) {
					const path = (curr.path ? curr.path + '/' : '') + name;
					child = { name, path, children: [] };
					curr.children.push(child);
				}
				curr = child;
			}
		});

		return content;
	}

	const setData = (imageUrl: string, data: AtlasDataModel) => {
		set({
			imageUrl,
			frames: data.frames,
			root: framesToRoot(data.frames),
		});
	};

	return {
		subscribe,
		setData,
	}
})();


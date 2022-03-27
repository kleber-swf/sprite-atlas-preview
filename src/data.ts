import { writable } from 'svelte/store';
import type { AppModel, TreeNodeModel } from './model/app.model';
import type { AtlasDataModel, FramesMap } from './model/atlas.model';

export function createAppModel() {
	const { subscribe, update, set } = writable<AppModel>();

	const framesToRoot = (framesMap: FramesMap) => {
		if (!framesMap) return null;
		const content: TreeNodeModel = { name: '', path: '', children: [] };

		Object.keys(framesMap).forEach((key) => {
			const parts = key.split('/');
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

	return {
		subscribe,

		setData(imageUrl: string, data: AtlasDataModel) {
			set({
				imageUrl,
				frames: data.frames,
				root: framesToRoot(data.frames),
				selection: null,
			});
		},

		select(path: string) {
			update(data => {
				data.selection = path
					? { path, frame: data.frames[path] }
					: null;
				return data;
			});
		}
	}
}

import { writable } from 'svelte/store';
import type { AppModel, SelectionItem, TreeNodeModel } from './model/app.model';
import type { AtlasDataModel, FramesMap } from './model/atlas.model';

export const VERSION = '%VERSION%';

export const data = (() => {
	console.log('creating data');
	const { subscribe, update, set } = writable<AppModel>();

	const framesToRoot = (framesMap: FramesMap) => {
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

	const getItemForPath = (data: AppModel, path: string): SelectionItem[] => {
		if (path in data.frames) return [{ path, frame: data.frames[path] }];

		const ipath = path + '/';
		return Object.values(data.frames).filter(frame => frame.name.startsWith(ipath))
			.map(frame => ({
				frame,
				path: ipath + frame.name
			}));
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
				if (data) {
					data.selection = path
						? { path, items: getItemForPath(data, path) }
						: null;
				}
				return data;
			});
		}
	}
})();

import type { SelectionItem, SelectionModel } from 'model/selection.model';
import { writable } from 'svelte/store';
import type { ContentModel } from '../model/content.model';
import { Content } from './content';

export const SelectionState = (() => {
	const { subscribe, set, update } = writable<SelectionModel>();

	let content: ContentModel;
	let pivotIndex = -1;
	let paths: string[] = [];

	Content.subscribe(dt => {
		content = dt;
		paths = content ? Object.keys(content.frames) : [];
		set(null);
	});

	function getItemsForPath(content: ContentModel, path: string): SelectionItem[] {
		if (path in content.frames) return [{ path, frame: content.frames[path] }];
		const ipath = path + '/';
		return Object.values(content.frames).filter(frame => frame.name.startsWith(ipath))
			.map(frame => ({ frame, path: frame.name }));
	}

	function addSelection(path: string, items: SelectionItem[]) {
		update(model => {
			let pivotItem: SelectionItem;
			if (!model) return { path, items };
			items.forEach(it => {
				const index = model.items.findIndex(i => i.path === it.path);
				if (index < 0) {
					model.items.push(it);
					pivotItem = it;
				} else model.items.splice(index, 1);
			})
			if (pivotItem) pivotIndex = paths.findIndex(e => pivotItem.path === e);
			return model;
		});
	}

	function addInterval(path: string, items: SelectionItem[]) {
		update(model => {
			if (!model) return { path, items };

			if (pivotIndex < 0) pivotIndex = paths.indexOf(model.items[0].path);
			const selectionIndexes = items.map(e => paths.indexOf(e.path));

			const lastIndex = pivotIndex < selectionIndexes[0]
				? Math.max(...selectionIndexes)
				: Math.min(...selectionIndexes);

			if (pivotIndex < lastIndex) {
				for (let i = pivotIndex; i <= lastIndex; i++) {
					const path = paths[i];
					if (!model.items.find(it => it.path === path))
						model.items.push({ path, frame: content.frames[path] })
				}
			} else {
				for (let i = pivotIndex; i >= lastIndex; i--) {
					const path = paths[i];
					if (!model.items.find(it => it.path === path))
						model.items.push({ path, frame: content.frames[path] })
				}
			}
			return model;
		})
	}

	const select = (path: string, add = false, interval = false) => {
		if (!(content && path)) {
			set(null);
			return;
		}

		const items = getItemsForPath(content, path);
		if (interval) addInterval(path, items);
		else if (add) addSelection(path, items);
		else {
			pivotIndex = paths.indexOf(path);
			set({ path, items });
		}
	}

	return {
		subscribe,
		select,
	}
})();
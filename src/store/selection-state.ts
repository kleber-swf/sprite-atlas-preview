import type { SelectionItem, SelectionModel } from 'model/selection.model';
import { writable } from 'svelte/store';
import type { ContentModel } from '../model/content.model';
import { Content } from './content';

export const SelectionState = (() => {
	const { subscribe, set, update } = writable<SelectionModel>();

	let content: ContentModel;
	Content.subscribe(dt => {
		content = dt;
		set(null);
	});

	function getItemForPath(content: ContentModel, path: string): SelectionItem[] {
		if (path in content.frames) return [{ path, frame: content.frames[path] }];

		const ipath = path + '/';
		return Object.values(content.frames).filter(frame => frame.name.startsWith(ipath))
			.map(frame => ({ frame, path: frame.name }));
	}

	const select = (path: string, add = false) => {
		if (!(content && path)) {
			set(null);
			return;
		}

		const items = getItemForPath(content, path);

		if (add) {
			update(model => {
				if (model) {
					if (model.items?.length) model.items.push(...items);
					else model.items = items;
					return model;
				}
				return { path, items };
			});
		} else {
			set({ path, items });
		}
	}

	return {
		subscribe,
		select,
	}
})();
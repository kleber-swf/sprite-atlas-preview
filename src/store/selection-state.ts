import type { SelectionItem, SelectionModel } from 'model/selection.model';
import { writable } from 'svelte/store';
import type { ContentModel } from '../model/content.model';
import { Content } from './content';

export const SelectionState = (() => {
	const { subscribe, set } = writable<SelectionModel>();

	let model: ContentModel;
	Content.subscribe(dt => {
		model = dt;
		set(null);
	});

	function getItemForPath(content: ContentModel, path: string): SelectionItem[] {
		if (path in content.frames) return [{ path, frame: content.frames[path] }];

		const ipath = path + '/';
		return Object.values(content.frames).filter(frame => frame.name.startsWith(ipath))
			.map(frame => ({ frame, path: frame.name }));
	}

	const select = (path: string) => {
		if (model) set(path ? { path, items: getItemForPath(model, path) } : null);
		else set(null);
	}

	return {
		subscribe,
		select,
	}
})();
import type { SelectionItem, SelectionModel } from 'model/selection.model';
import { writable } from 'svelte/store';
import type { AppModel } from '../model/app.model';
import { data } from './data';

export const SelectionState = (() => {
	const { subscribe, set } = writable<SelectionModel>();

	let model: AppModel;
	data.subscribe(dt => {
		model = dt;
		set(null);
	});

	function getItemForPath(data: AppModel, path: string): SelectionItem[] {
		if (path in data.frames) return [{ path, frame: data.frames[path] }];

		const ipath = path + '/';
		return Object.values(data.frames).filter(frame => frame.name.startsWith(ipath))
			.map(frame => ({
				frame,
				path: ipath + frame.name
			}));
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
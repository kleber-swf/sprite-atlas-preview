import type { SelectionModel } from 'model/app.model';
import { writable } from 'svelte/store';
import { getItemForPath } from 'util/data.util';
import type { AppModel } from '../model/app.model';
import { data } from './data';

export const theSelection = (() => {
	const { subscribe, set } = writable<SelectionModel>();

	let model: AppModel;
	data.subscribe(dt => model = dt);

	const select = (path: string) => {
		if (model)
			set(path ? { path, items: getItemForPath(model, path) } : null);
	}

	return {
		subscribe,
		select,
	}
})();
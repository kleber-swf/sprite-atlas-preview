import { writable } from 'svelte/store';
import { framesToRoot } from 'util/data.util';
import type { AppModel } from '../model/app.model';
import type { AtlasDataModel } from '../model/atlas.model';

export const VERSION = '%VERSION%';

export const data = (() => {
	const { subscribe, set } = writable<AppModel>();

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


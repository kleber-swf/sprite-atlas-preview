import type { AppStateModel, PersistentData } from 'model/app-state.model';
import { writable } from 'svelte/store';

const LS_KEY = 'ui.state';

export const AppState = (() => {
	const { subscribe, update, set } = writable<AppStateModel>();

	const load = () => {
		const loaded: Partial<AppStateModel> = JSON.parse(localStorage.getItem(LS_KEY) ?? '{}');
		set({
			framePropertiesCollapsed: loaded.framePropertiesCollapsed ?? false,
			atlas: { scale: 1 },
			frame: { scale: 1 },
			animation: Object.assign({ scale: 1, loop: true, frameRate: 25 }, loaded.animation || {})
		});
	};

	const save = (model: AppStateModel) => {
		if (!model) {
			localStorage.removeItem(LS_KEY);
			return;
		}

		localStorage.setItem(LS_KEY, JSON.stringify(<PersistentData>{
			framePropertiesCollapsed: model.framePropertiesCollapsed,
			animation: {
				frameRate: model.animation.frameRate,
				loop: model.animation.loop,
			}
		}));
	};

	const setItem = (pref: keyof AppStateModel, value: any) => {
		update(model => {
			if (model && pref in model) {
				model[pref] = typeof value === 'object' ? Object.assign(model[pref], value) : value;
			}
			save(model);
			return model;
		})
	};

	return {
		set,
		subscribe,
		load,
		setItem,
	}
})();
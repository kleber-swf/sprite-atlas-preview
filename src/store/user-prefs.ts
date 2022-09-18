import type { PersistentData, UserPrefsModel } from 'model/ui-state.model';
import { writable } from 'svelte/store';

const LS_KEY = 'ui.prefs';

export const prefs = (() => {
	const { subscribe, update, set } = writable<UserPrefsModel>();

	const load = () => {
		const loaded: Partial<UserPrefsModel> = JSON.parse(localStorage.getItem(LS_KEY) ?? '{}');
		set({
			framePropertiesCollapsed: loaded.framePropertiesCollapsed ?? false,
			atlas: { scale: 1 },
			frame: { scale: 1 },
			animation: Object.assign({ scale: 1, loop: true, frameRate: 25 }, loaded.animation || {})
		});
	};

	const save = (model: UserPrefsModel) => {
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

	const setItem = (pref: keyof UserPrefsModel, value: any) => {
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
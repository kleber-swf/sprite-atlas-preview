export interface PersistentData {
	framePropertiesCollapsed: boolean;
	animation: AnimationPersistentData;
}

export interface AppStateModel extends PersistentData {
	atlas: AppStateItemModel;
	frame: AppStateItemModel;
	animation: AnimationPrefModel;
}

export interface AppStateItemModel {
	scale: number;
	scrollLeft?: number;
	scrollTop?: number;
}

export interface AnimationPrefModel extends AppStateItemModel, AnimationPersistentData { }

export interface AnimationPersistentData {
	loop: boolean;
	frameRate: number;
}

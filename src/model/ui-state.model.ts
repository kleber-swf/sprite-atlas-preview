export interface PrefModel {
	scale: number;
}

export interface AnimationPersistentData {
	loop: boolean;
	frameRate: number;
}

export interface AnimationPrefModel extends PrefModel, AnimationPersistentData { }

export interface PersistentData {
	framePropertiesCollapsed: boolean;
	animation: AnimationPersistentData;
}

export interface UIStateModel extends PersistentData {
	atlas: PrefModel;
	frame: PrefModel;
	animation: AnimationPrefModel;
}
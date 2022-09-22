export interface PersistentData {
	framePropertiesCollapsed: boolean;
	animation: AnimationPersistentData;
}

export interface UIStateModel extends PersistentData {
	atlas: UIStateItemModel;
	frame: UIStateItemModel;
	animation: AnimationPrefModel;
}

export interface UIStateItemModel {
	scale: number;
	scrollLeft?: number;
	scrollTop?: number;
}

export interface AnimationPrefModel extends UIStateItemModel, AnimationPersistentData { }

export interface AnimationPersistentData {
	loop: boolean;
	frameRate: number;
}

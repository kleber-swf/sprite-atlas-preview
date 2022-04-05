import type { FrameModel, FramesMap } from './atlas.model';

export interface TreeNodeModel {
	name: string;
	path: string;
	children: TreeNodeModel[];
}

export interface SelectionModel {
	path: string;
	items: SelectionItem[];
}

export interface SelectionItem {
	path: string;
	frame: FrameModel;
}

export interface AppModel {
	imageUrl: string;
	frames: FramesMap;
	root: TreeNodeModel;
	selection: SelectionModel;
}

export interface NineSliceModel {
	top: number;
	left: number;
	bottom: number;
	right: number;
}
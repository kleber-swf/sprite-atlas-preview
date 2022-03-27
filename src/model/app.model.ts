import type { FrameModel, FramesMap } from './atlas.model';

export interface TreeNodeModel {
	name: string;
	path: string;
	children: TreeNodeModel[];
}

export interface SelectionModel {
	path: string;
	frame: FrameModel;
}

export interface AppModel {
	imageUrl: string;
	frames: FramesMap;
	root: TreeNodeModel;
	selection: SelectionModel;
}

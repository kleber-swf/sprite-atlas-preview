import type { FramesMap } from './atlas.model';

export interface ContentModel {
	imageUrl: string;
	frames: FramesMap;
	root: TreeNodeModel;
}

export interface TreeNodeModel {
	name: string;
	path: string;
	children: TreeNodeModel[];
}

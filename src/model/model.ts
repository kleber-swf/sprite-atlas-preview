export interface Point {
	x: number;
	y: number;
}

export interface Dimension {
	w: number;
	h: number;
}

export interface Rect extends Point, Dimension { }

export type FramesMap = Record<string, FrameModel>;

export interface FrameModel {
	frame: Rect;
	rotated: boolean;
	trimmed: boolean;
	spriteSourceSize: Rect;
	sourceSize: Dimension;
}

export interface AtlasDataModel {
	frames: FramesMap;
}

export interface TreeNodeModel {
	name: string;
	path: string;
	selected: boolean;
	children: TreeNodeModel[];
}


export interface AppModel {
	selection: string;
	data: AtlasDataModel;
}

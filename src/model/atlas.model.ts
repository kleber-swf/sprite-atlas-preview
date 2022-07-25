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
	// extended fields
	name?: string;
	slice?: NineSliceModel;
}

export interface AtlasDataModel {
	frames: FramesMap;
}

export interface NineSliceModel {
	top: number;
	left: number;
	bottom: number;
	right: number;
}

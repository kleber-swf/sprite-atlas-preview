import type { FrameModel } from './atlas.model';

export interface SelectionModel {
	path: string;
	items: SelectionItem[];
}

export interface SelectionItem {
	path: string;
	frame: FrameModel;
}

export interface SelectionEventData {
	path: string;
	add: boolean;
}

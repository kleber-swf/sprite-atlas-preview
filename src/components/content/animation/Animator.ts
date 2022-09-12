import type { SelectionItem, SelectionModel } from 'model/app.model';

export class Animator {
	private selection: SelectionItem[];
	private img: HTMLImageElement;
	private currImgSrc: string;

	private index: number;
	private elapsed: number;

	public setSelection(model: SelectionModel, imageUrl: string) {
		this.selection = model?.items;
		this.index = 0;
		this.elapsed = 0;

		if (this.img && this.currImgSrc === imageUrl) return;
		this.img = document.createElement('img');
		this.img.src = imageUrl;
		this.currImgSrc = imageUrl;
	}

	public update(context: CanvasRenderingContext2D, dt: number) {
		if (!(this.img && this.selection)) return;

		this.elapsed += dt;
		if (this.elapsed > 100) {
			this.elapsed = 0;
			this.index = (this.index + 1) % this.selection.length;
		}

		const frame = this.selection[this.index].frame.frame;
		context.drawImage(this.img, frame.x, frame.y, frame.w, frame.h, 0, 0, frame.w, frame.h);
	}
}
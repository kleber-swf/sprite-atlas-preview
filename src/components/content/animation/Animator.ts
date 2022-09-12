import type { Rect } from 'model/atlas.model';

export class Animator {
	private frames: Rect[];
	private img: HTMLImageElement;
	private currImgSrc: string;

	private index: number;
	private elapsed: number;
	private playing = false;

	private delay = 1000 / 30;

	public get isPlaying() { return this.playing; }

	public set frameRate(fps: number) {
		if (fps > 0) this.delay = 1000 / fps;
	}

	public setContent(frames: Rect[], imageUrl: string) {
		this.frames = frames;
		this.index = 0;
		this.elapsed = 0;

		if (this.img && this.currImgSrc === imageUrl) return;
		this.img = document.createElement('img');
		this.img.src = imageUrl;
		this.currImgSrc = imageUrl;
	}

	public play() {
		this.playing = true;
	}

	public pause() {
		this.playing = false;
	}

	public togglePlay() {
		if (this.isPlaying) this.pause();
		else this.play();
	}

	public seek(index: number) {
		if (this.frames) {
			this.index = Math.min(Math.max(index, 0), this.frames.length - 1);
		}
	}

	public update(context: CanvasRenderingContext2D, dt: number) {
		if (!(this.img && this.frames)) return;

		if (this.playing) {
			this.elapsed += dt;
			if (this.elapsed > this.delay) {
				this.elapsed = 0;
				this.index = (this.index + 1) % this.frames.length;
			}
		}

		const frame = this.frames[this.index];
		context.drawImage(
			this.img,
			frame.x, frame.y, frame.w, frame.h,
			0, 0, frame.w, frame.h
		);
	}
}
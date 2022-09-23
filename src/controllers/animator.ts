import type { Rect } from 'model/atlas.model';

export class Animator {
	private frames: Rect[] = [];
	private img: HTMLImageElement;
	private currImgSrc: string;

	public loop: boolean;

	private _yoyo: boolean;
	private _index: number;
	private _elapsed: number;
	private _playing = false;

	private _frameRate = 30;
	private _delay = 1000 / 30;
	private _direction = 1;

	public get isPlaying() { return this._playing; }

	public get frameRate() { return this._frameRate }

	public set frameRate(fps: number) {
		if (fps > 0) {
			this._frameRate = fps;
			this._delay = 1000 / fps;
		}
	}

	public get frameIndex() { return this._index; }

	public set frameIndex(value: number) {
		if (!this.frames) return;
		this._index = Math.min(Math.max(value, 0), this.frames.length - 1);
	}

	public get yoyo() { return this._yoyo; }

	public set yoyo(value: boolean) {
		this._yoyo = value;
		this._direction = 1;
	}

	public setContent(frames: Rect[], imageUrl: string) {
		this.frames = frames;
		this.frameIndex = 0;
		this._elapsed = 0;

		if (this.img && this.currImgSrc === imageUrl) return;
		if (!this.img) this.img = document.createElement('img');
		this.img.src = imageUrl;
		this.currImgSrc = imageUrl;
	}

	public play() {
		if (this.frameIndex >= this.frames.length - 1) this.frameIndex = 0;
		this._elapsed = 0;
		this._playing = true;
	}

	public pause() {
		this._playing = false;
	}

	public togglePlay() {
		if (this.isPlaying) this.pause();
		else this.play();
	}

	public update(context: CanvasRenderingContext2D, dt: number) {
		if (!(this.currImgSrc && this.frames.length)) return;

		if (this._playing) {
			this._elapsed += dt;
			this._index = this.getNextFrame();
		}

		const frame = this.frames[this._index];
		context.drawImage(
			this.img,
			frame.x, frame.y, frame.w, frame.h,
			0, 0, frame.w, frame.h
		);
	}

	private getNextFrame() {
		if (this._elapsed < this._delay) return this._index;
		this._elapsed = 0;

		const i = this._index + this._direction;

		if (i === 0) {
			if (this.yoyo) {
				this._playing = this.loop;
				this._direction *= -1;
			}
			return i;
		}

		if (i >= this.frames.length) {
			if (this.yoyo) {
				this._direction *= -1;
				return i - 1;
			}
			if (this.loop) return 0;
			else {
				this._playing = false;
				return this._index;
			}
		}

		return i;
	}
}
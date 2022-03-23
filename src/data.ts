import type { AtlasDataModel, FramesMap, TreeNodeModel } from './model/model';

export const RAW_DATA: AtlasDataModel = {
	frames: {
		'btn-circular/disable': {
			frame: { x: 3, y: 1131, w: 326, h: 326 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 326, h: 326 },
			sourceSize: { w: 326, h: 326 }
		},
		'btn-circular/hover': {
			frame: { x: 332, y: 1131, w: 326, h: 326 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 326, h: 326 },
			sourceSize: { w: 326, h: 326 }
		},
		'btn-circular/normal': {
			frame: { x: 706, y: 450, w: 326, h: 326 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 326, h: 326 },
			sourceSize: { w: 326, h: 326 }
		},
		'btn-circular/pressed': {
			frame: { x: 1035, y: 391, w: 326, h: 326 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 326, h: 326 },
			sourceSize: { w: 326, h: 326 }
		},
		'btn-mid/green/disable': {
			frame: { x: 706, y: 779, w: 354, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 354, h: 145 },
			sourceSize: { w: 354, h: 145 }
		},
		'btn-mid/green/hover': {
			frame: { x: 1110, y: 1336, w: 354, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 354, h: 145 },
			sourceSize: { w: 354, h: 145 }
		},
		'btn-mid/green/normal': {
			frame: { x: 1110, y: 1484, w: 354, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 354, h: 145 },
			sourceSize: { w: 354, h: 145 }
		},
		'btn-mid/green/pressed': {
			frame: { x: 1448, y: 895, w: 354, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 354, h: 145 },
			sourceSize: { w: 354, h: 145 }
		},
		'btn-mid/red/disable': {
			frame: { x: 705, y: 927, w: 355, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 355, h: 145 },
			sourceSize: { w: 355, h: 145 }
		},
		'btn-mid/red/hover': {
			frame: { x: 624, y: 1519, w: 355, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 355, h: 145 },
			sourceSize: { w: 355, h: 145 }
		},
		'btn-mid/red/normal': {
			frame: { x: 1401, y: 599, w: 355, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 355, h: 145 },
			sourceSize: { w: 355, h: 145 }
		},
		'btn-mid/red/pressed': {
			frame: { x: 1401, y: 747, w: 355, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 355, h: 145 },
			sourceSize: { w: 355, h: 145 }
		},
		'btn-rect-large/disable': {
			frame: { x: 3, y: 450, w: 700, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 700, h: 145 },
			sourceSize: { w: 700, h: 145 }
		},
		'btn-rect-large/hover': {
			frame: { x: 3, y: 598, w: 700, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 700, h: 145 },
			sourceSize: { w: 700, h: 145 }
		},
		'btn-rect-large/normal': {
			frame: { x: 3, y: 894, w: 699, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 699, h: 145 },
			sourceSize: { w: 699, h: 145 }
		},
		'btn-rect-large/pressed': {
			frame: { x: 3, y: 746, w: 700, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 700, h: 145 },
			sourceSize: { w: 700, h: 145 }
		},
		'btn-rect/blue/disabled': {
			frame: { x: 1063, y: 720, w: 335, h: 151 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 335, h: 151 },
			sourceSize: { w: 335, h: 151 }
		},
		'btn-rect/blue/hover': {
			frame: { x: 1063, y: 874, w: 335, h: 151 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 335, h: 151 },
			sourceSize: { w: 335, h: 151 }
		},
		'btn-rect/blue/normal': {
			frame: { x: 1110, y: 1028, w: 335, h: 151 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 335, h: 151 },
			sourceSize: { w: 335, h: 151 }
		},
		'btn-rect/blue/pressed': {
			frame: { x: 1110, y: 1182, w: 335, h: 151 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 335, h: 151 },
			sourceSize: { w: 335, h: 151 }
		},
		'btn-rect/disabled': {
			frame: { x: 661, y: 1075, w: 446, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 446, h: 145 },
			sourceSize: { w: 446, h: 145 }
		},
		'btn-rect/hover': {
			frame: { x: 661, y: 1223, w: 446, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 446, h: 145 },
			sourceSize: { w: 446, h: 145 }
		},
		'btn-rect/normal': {
			frame: { x: 3, y: 1460, w: 447, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 447, h: 145 },
			sourceSize: { w: 447, h: 145 }
		},
		'btn-rect/pressed': {
			frame: { x: 661, y: 1371, w: 446, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 446, h: 145 },
			sourceSize: { w: 446, h: 145 }
		},
		'btn-sq-large/disable': {
			frame: { x: 3, y: 152, w: 909, h: 146 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 909, h: 146 },
			sourceSize: { w: 909, h: 146 }
		},
		'btn-sq-large/hover': {
			frame: { x: 916, y: 3, w: 909, h: 146 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 909, h: 146 },
			sourceSize: { w: 909, h: 146 }
		},
		'btn-sq-large/normal': {
			frame: { x: 3, y: 3, w: 910, h: 146 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 910, h: 146 },
			sourceSize: { w: 910, h: 146 }
		},
		'btn-sq-large/pressed': {
			frame: { x: 3, y: 301, w: 909, h: 146 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 909, h: 146 },
			sourceSize: { w: 909, h: 146 }
		},
		'btn-squared/red/disable': {
			frame: { x: 1566, y: 303, w: 208, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 208, h: 145 },
			sourceSize: { w: 208, h: 145 }
		},
		'btn-squared/red/hover': {
			frame: { x: 1566, y: 451, w: 208, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 208, h: 145 },
			sourceSize: { w: 208, h: 145 }
		},
		'btn-squared/red/info': {
			frame: { x: 1448, y: 1043, w: 208, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 208, h: 145 },
			sourceSize: { w: 208, h: 145 }
		},
		'btn-squared/red/normal': {
			frame: { x: 1659, y: 1043, w: 208, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 208, h: 145 },
			sourceSize: { w: 208, h: 145 }
		},
		'btn-squared/red/pressed': {
			frame: { x: 1467, y: 1191, w: 208, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 208, h: 145 },
			sourceSize: { w: 208, h: 145 }
		},
		'btn-squared/yellow/disable': {
			frame: { x: 1467, y: 1339, w: 208, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 208, h: 145 },
			sourceSize: { w: 208, h: 145 }
		},
		'btn-squared/yellow/hover': {
			frame: { x: 1467, y: 1487, w: 208, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 208, h: 145 },
			sourceSize: { w: 208, h: 145 }
		},
		'btn-squared/yellow/normal': {
			frame: { x: 1678, y: 1191, w: 208, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 208, h: 145 },
			sourceSize: { w: 208, h: 145 }
		},
		'btn-squared/yellow/pressed': {
			frame: { x: 1678, y: 1339, w: 208, h: 145 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 208, h: 145 },
			sourceSize: { w: 208, h: 145 }
		},
		'icon/arrow': {
			frame: { x: 1364, y: 391, w: 199, h: 200 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 199, h: 200 },
			sourceSize: { w: 199, h: 200 }
		},
		'icon/bet-icon': {
			frame: { x: 982, y: 1519, w: 116, h: 109 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 116, h: 109 },
			sourceSize: { w: 116, h: 109 }
		},
		'icon/cancel': {
			frame: { x: 1817, y: 838, w: 68, h: 67 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 68, h: 67 },
			sourceSize: { w: 68, h: 67 }
		},
		'icon/game-limits': {
			frame: { x: 1777, y: 563, w: 92, h: 96 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 92, h: 96 },
			sourceSize: { w: 92, h: 96 }
		},
		'icon/help': {
			frame: { x: 1849, y: 1487, w: 63, h: 95 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 63, h: 95 },
			sourceSize: { w: 63, h: 95 }
		},
		'icon/history': {
			frame: { x: 1802, y: 264, w: 100, h: 99 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 100, h: 99 },
			sourceSize: { w: 100, h: 99 }
		},
		'icon/interrogatio-icon': {
			frame: { x: 1838, y: 744, w: 63, h: 91 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 63, h: 91 },
			sourceSize: { w: 63, h: 91 }
		},
		'icon/lobby': {
			frame: { x: 1777, y: 366, w: 108, h: 91 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 108, h: 91 },
			sourceSize: { w: 108, h: 91 }
		},
		'icon/menu': {
			frame: { x: 1828, y: 3, w: 84, h: 89 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 84, h: 89 },
			sourceSize: { w: 84, h: 89 }
		},
		'icon/music': {
			frame: { x: 1759, y: 744, w: 76, h: 89 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 76, h: 89 },
			sourceSize: { w: 76, h: 89 }
		},
		'icon/paylader-icon': {
			frame: { x: 1802, y: 152, w: 95, h: 109 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 95, h: 109 },
			sourceSize: { w: 95, h: 109 }
		},
		'icon/responsible': {
			frame: { x: 1777, y: 460, w: 92, h: 100 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 92, h: 100 },
			sourceSize: { w: 92, h: 100 }
		},
		'icon/sfx': {
			frame: { x: 1759, y: 662, w: 103, h: 79 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 103, h: 79 },
			sourceSize: { w: 103, h: 79 }
		},
		'text/bet': {
			frame: { x: 1828, y: 95, w: 81, h: 50 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 81, h: 50 },
			sourceSize: { w: 81, h: 50 }
		},
		'text/menu': {
			frame: { x: 291, y: 1608, w: 97, h: 37 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 97, h: 37 },
			sourceSize: { w: 97, h: 37 }
		},
		'text/mini-dot': {
			frame: { x: 624, y: 1042, w: 19, h: 18 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 19, h: 18 },
			sourceSize: { w: 19, h: 18 }
		},
		'text/payladder': {
			frame: { x: 3, y: 1608, w: 178, h: 36 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 178, h: 36 },
			sourceSize: { w: 178, h: 36 }
		},
		'text/spins': {
			frame: { x: 915, y: 391, w: 104, h: 37 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 104, h: 37 },
			sourceSize: { w: 104, h: 37 }
		},
		'text/stake': {
			frame: { x: 184, y: 1608, w: 104, h: 37 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 104, h: 37 },
			sourceSize: { w: 104, h: 37 }
		},
		'top-ui/arm-left': {
			frame: { x: 3, y: 1042, w: 618, h: 86 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 618, h: 86 },
			sourceSize: { w: 618, h: 86 }
		},
		'top-ui/arm-right': {
			frame: { x: 915, y: 303, w: 623, h: 85 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 623, h: 85 },
			sourceSize: { w: 623, h: 85 }
		},
		'top-ui/cap-left': {
			frame: { x: 453, y: 1460, w: 168, h: 150 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 168, h: 150 },
			sourceSize: { w: 168, h: 150 }
		},
		'top-ui/cap-right': {
			frame: { x: 1678, y: 1487, w: 168, h: 149 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 168, h: 149 },
			sourceSize: { w: 168, h: 149 }
		},
		'top-ui/center': {
			frame: { x: 915, y: 152, w: 884, h: 148 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 884, h: 148 },
			sourceSize: { w: 884, h: 148 }
		},
		'top-ui/light-blue': {
			frame: { x: 1759, y: 836, w: 55, h: 55 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 55, h: 55 },
			sourceSize: { w: 55, h: 55 }
		},
		'top-ui/light-red': {
			frame: { x: 1849, y: 1585, w: 55, h: 55 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 55, h: 55 },
			sourceSize: { w: 55, h: 55 }
		}
	}
};


class AppModel {
	private _imageUrl: string;
	private _frames: FramesMap;
	private _selection: string;
	private _root: TreeNodeModel;

	public get imageUrl() { return this._imageUrl; }
	public get root() { return this._root; }

	public get frames() { return this._frames; }

	public set frames(value: FramesMap) {
		this._frames = value;
		this._root = value ? this.framesToRoot(value) : null;
	}

	public get selection() { return this._selection; }

	public set selection(path: string) {
		this._selection = path;
		// TODO mark selection inside root
	}


	public setData(imageUrl: string, data: AtlasDataModel) {
		this._imageUrl = imageUrl;
		this.frames = data?.frames;
	}

	private framesToRoot(framesMap: FramesMap) {
		const content: TreeNodeModel = { name: '', path: '', children: [] };

		Object.keys(framesMap).forEach((key) => {
			const parts = key.split('/');
			let curr = content;
			for (const name of parts) {
				let child = curr.children.find((e) => e.name === name);
				if (!child) {
					const path = (curr.path ? curr.path + '/' : '') + name;
					child = { name, path, children: [] };
					curr.children.push(child);
				}
				curr = child;
			}
		});

		return content;
	}
}

export const DATA = new AppModel();
// TODO this should be called by the open... method
DATA.setData('./test/game-ui.png', RAW_DATA)
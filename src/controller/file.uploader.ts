const SUPPORTED_IMAGES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

export interface AtlasInfo {
	name: string;
	atlas: any;
	imageUrl: string;
}

export class FileUploader {
	public static async upload(files: FileList): Promise<AtlasInfo> {
		if (files.length !== 2) throw new Error(`You need two files: a json and a ${SUPPORTED_IMAGES.join('/')} image`);

		let atlas: File;
		let image: File;

		if (files.item(0).type === 'application/json') {
			atlas = files.item(0);
			image = files.item(1);
		} else {
			atlas = files.item(1);
			image = files.item(0);
		}

		if (!SUPPORTED_IMAGES.includes(image.type) || atlas.type !== 'application/json') {
			throw new Error('Expected .png/.jpg and .json files.');
		}

		const content = await atlas.text();

		return {
			name: atlas.name.substring(0, atlas.name.lastIndexOf('.')),
			atlas: JSON.parse(content),
			imageUrl: URL.createObjectURL(image),
		};
	}
}
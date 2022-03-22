const preprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
	preprocess: preprocess({
		scss: { includePaths: [path.join(__dirname, 'src')] }
	}),
};
const preprocess = require('svelte-preprocess');
const path = require('path');
const fs = require('fs');


fs.writeFile('/tmp/xxx.txt', path.join(__dirname, 'src'), { encoding: 'utf8' }, () => { })

module.exports = {
	preprocess: preprocess({
		scss: { includePaths: [path.join(__dirname, 'src')] }
	}),
};
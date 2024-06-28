// ----- helper methods -----
const replaceTemplate = (temp, author) => {
	let output = temp.replace(/{%PHOTOS%}/g, author.attributes.photos);
	output = output.replace(/{%AUTHOR_NAME%}/g, author.attributes.name);
	output = output.replace(/{%NATIONALITY%}/g, author.attributes.nationality);
	output = output.replace(/{%FLAG%}/g, author.attributes.flag);
	output = output.replace(/{%WIKIPEDIA%}/g, author.attributes.wikipedia);
	output = output.replace(/{%ID%}/g, author.id);
	output = output.replace(/{%BLURB%}/g, author.attributes.blurb);

	if (!author.organic) {
		output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
	} else {
		output = output.replace(/{%NOT_ORGANIC%}/g, '');
	}

	return output;
};

module.exports = replaceTemplate;

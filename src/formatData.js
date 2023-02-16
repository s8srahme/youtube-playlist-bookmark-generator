const formatData = (dataArr, keys) => {
	let formattedData = [];
	for (const obj of dataArr) {
		if (Object.keys(obj).length !== 0) {
			const row = keys.map((key) => obj[key]);
			formattedData = [...formattedData, row];
		}
	}
	return formattedData;
};

module.exports = formatData;

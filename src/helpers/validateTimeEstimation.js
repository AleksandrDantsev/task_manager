export const validateTimeEstimation = (value, type="hours") => {
	const valueString = String(value).replace(/[^\d]/g, '');

	if (valueString[0] === '0') {
		return valueString.replace(/^0+/, "");
	}
	else {
		if (type === "minutes") {
		if (valueString.length > 1 && +valueString[0] > 5) {
			return valueString[0];
		}
		else if (+valueString[0] <= 5) return valueString.slice(0, 2);
	}
		return valueString.slice(0, 3);
	}

}
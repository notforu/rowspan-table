const _ = require("lodash/util");

const isComplexField = (property, schema) => typeof schema[property] === "object";

const normalizeItem = (item, schema, row = []) => {
	let result = [];
	// put values of all plain field to the result row, as cells
	Object.keys(item).filter(property => !isComplexField(property, schema)).forEach(property => {
		row.push({
			value: item[property],
			id: _.uniqueId(),
			rowSpan: 1,
			isVisible: true
		});
	});
	// if there are no more array-like properties, push row to the result array
	if (!Object.keys(item).find(property => isComplexField(property, schema))) {
		result.push(row);
	} else {
		// else recursively collect field values of nested objects
		Object.keys(item).filter(property => isComplexField(property, schema)).forEach(property => {
			for (const child of item[property]) {
				result = result.concat(normalizeItem(child, schema[property], [ ...row ]));
			}
		});
	}
	return result;
};

const removeDuplicateCells = rows => {
	for (let i = 0; i < rows.length; i++) {
		for (let k = 0; k < rows[i].length; k++) {
			const cell = rows[i][k];
			for (let j = rows.length - 1; j > i; j--) {
				if (rows[j][k].id === cell.id) {
					rows[j][k] = { ...rows[j][k], isVisible: false };
					cell.rowSpan++;
				}
			}
		}
	}
	return rows;
};

export function normalizeData(data, schema) {
	let result = [];
	for (const one of data) {
		result = result.concat(removeDuplicateCells(normalizeItem(one, schema)));
	}
	return result;
}

const _ = require("lodash/util");

export const isCollectionField = property => typeof property === "object";

// converts tree-item into an array of rows
const getRows = (item, schema, row = []) => {
	let result = [];
	// put values of all plain field to the result row, as cells
	Object.keys(item).filter(property => !isCollectionField(schema[property])).forEach(property => {
		row.push({
			value: item[property],
			id: _.uniqueId(),
			rowSpan: 1,
			isVisible: true
		});
	});
	// if there are no more array-like properties, push row to the result array
	if (!Object.keys(item).find(property => isCollectionField(schema[property]))) {
		result.push(row);
	} else {
		// else recursively collect field values of nested objects
		Object.keys(item).filter(property => isCollectionField(schema[property])).forEach(property => {
			for (const child of item[property]) {
				result = result.concat(getRows(child, schema[property], [ ...row ]));
			}
		});
	}
	return result;
};

const removeDuplicatedCells = rows => {
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


// converts array of tree-like items into an array of rows
export function formatItems(items, schema) {
	let result = [];
	for (const item of items) {
		result = result.concat(removeDuplicatedCells(getRows(item, schema)));
	}
	return result;
}

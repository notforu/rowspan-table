const _ = require("lodash/util");

const isCollectionField = property => !property.order && !property.label;

export const getHeaderColumns = schema => {
	let result = [];
	Object.values(schema).forEach(property => {
		if (isCollectionField(property)) {
			result = result.concat(getHeaderColumns(property));
		} else {
			result.push(property);
		}
	});
	return result.sort((a, b) => (a.order < b.order ? -1 : 1));
};

// converts tree-item into an array of rows
const getRows = (item, schema, row = []) => {
	let result = [];
	const properties = Object.keys(item);
	// put values of all plain field to the result row, as cells
	properties.filter(property => !isCollectionField(schema[property])).forEach(property => {
		row.push({
			value: item[property],
			id: _.uniqueId(),
			rowSpan: 1,
			order: schema[property].order,
			isVisible: true
		});
	});
	// if there are no more array-like properties, push row to the result array
	if (!properties.find(property => isCollectionField(schema[property]))) {
		row.sort((cellA, cellB) => (cellA.order < cellB.order ? -1 : 1));
		result.push(row);
	} else {
		// else recursively collect field values of nested objects
		properties.filter(property => isCollectionField(schema[property])).forEach(property => {
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

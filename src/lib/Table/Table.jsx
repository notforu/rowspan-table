import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./Table.scss";
import { normalizeData, isComplexField } from "./utils";

const getHeaderColumns = (schema, className) => Object.values(schema).map(property => (isComplexField(property) ? getHeaderColumns(property) : <td key={property} className={className}>{ property }</td>));

const Table = ({
	data, schema, className, tdClassName, tdHeaderClassName
}) => {
	const rows = normalizeData(data, schema);
	return <table className={classnames(className, "Table")}>
		<thead>
			<tr>{ getHeaderColumns(schema, tdHeaderClassName) }</tr>
		</thead>
		<tbody>
			{ rows.map((row, index) => <tr key={index}>
				{ row.map(cell => cell.isVisible && <td className={tdClassName} rowSpan={cell.rowSpan} key={cell.id}>{ cell.value }</td>) }
			</tr>) }
		</tbody>
	</table>;
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
	schema: PropTypes.object.isRequired,
	className: PropTypes.string,
	tdClassName: PropTypes.string,
	tdHeaderClassName: PropTypes.string,
};

export default Table;

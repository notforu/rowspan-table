import React from "react";
import PropTypes from "prop-types";
import "./Table.scss";
import { normalizeData } from "./utils";

const getHeaderColumns = schema => Object.values(schema).map(one => (typeof one === "object" ? getHeaderColumns(one) : <td>{ one }</td>));

const Table = ({ data, schema }) => {
	const rows = normalizeData(data, schema);
	return <div>
		<table className="Table">
			<thead>
				<tr>{ getHeaderColumns(schema) }</tr>
			</thead>
			<tbody>
				{ rows.map(row => <tr>
					{ row.map(cell => cell.isVisible && <td rowSpan={cell.rowSpan}>{ cell.value }</td>) }
				</tr>) }
			</tbody>
		</table>
	</div>;
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
	schema: PropTypes.object.isRequired,
};

export default Table;

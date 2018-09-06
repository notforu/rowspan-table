import React from "react";
import PropTypes from "prop-types";

const Table = ({ data }) => <div>
	{ data.map(one => one.name) }
</div>;

Table.propTypes = {
	data: PropTypes.array.isRequired
};

export default Table;

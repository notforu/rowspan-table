import React from "react";
import Table from "./Table";

const mockData = [
	{
		name: "MobileUp1",
		addresses: [
			{
				address: "ул. Большая Московская, д.1",
				services: [
					{ name: "internet", price: 1000 },
					{ name: "ip address", price: 200 }
				]
			}
		]
	}
];

const App = () => <div>
	<h1>App</h1>
	<Table data={mockData} />
</div>;

export default App;

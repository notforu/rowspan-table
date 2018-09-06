import React from "react";
import Table from "lib";

const data = [
	{
		name: "MobileUp1",
		addresses: [
			{
				address: "ул. Большая Московская, д.1",
				services: [
					{ name: "internet", price: 1000 },
					{ name: "ip address", price: 200 },
					{ name: "ip address 1", price: 300 },
					{ name: "ip address 2", price: 400 },
				]
			},
			{
				address: "ул. Большая Московская, д.3",
				services: [
					{ name: "something", price: 800 },
					{ name: "else", price: 500 }
				]
			}
		]
	}
];

const schema = {
	name: "Название",
	addresses: {
		address: "Адрес",
		services: {
			name: "Название сервиса",
			price: "Цена"
		}
	}
};

const App = () => <div>
	<h1>Table Example</h1>
	<Table data={data} schema={schema} />
</div>;

export default App;

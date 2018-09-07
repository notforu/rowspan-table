import React from "react";
import Table from "lib";

const items = [
	{
		name: "MobileUp1",
		addresses: [
			{
				address: "ул. Большая Московская, д.1",
				something: "asss",
				services: [
					{ name: "internet", price: 1000 },
					{ name: "ip address", price: 200 },
					{ name: "ip address 1", price: 300 },
					{ name: "ip address 2", price: 400 },
				],
			},
			{
				address: "ул. Большая Московская, д.3",
				something: "asss",
				services: [
					{ name: "something", price: 800 },
					{ name: "else", price: 500 }
				],
			}
		]
	}
];

const schema = {
	name: { label: "Название", order: 1 },
	addresses: {
		address: { label: "Адрес", order: 2 },
		services: {
			name: { label: "Название сервиса", order: 3 },
			price: { label: "Цена", order: 4 }
		},
		something: { label: "Something", order: 5 },
	}
};

const App = () => <div>
	<h1>Table Example</h1>
	<Table items={items} schema={schema} />
</div>;

export default App;

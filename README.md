# Rowspan Table

This is a simple table for rendering data with multiple nesting.

# Usage Example


    const items = [
		{
			name: "MobileUp1",
			addresses: [
				{
					address: "ул. Большая Московская, д.1",
					services: [
						{ name: "internet", price: 1000 },
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
		name: { label: "Название", order: 1 },
		addresses: {
			address: { label: "Адрес", order: 2 },
			services: {
				name: { label: "Название сервиса", order: 3 },
				price: { label: "Цена", order: 4 }
			},
		}
	};
	
	const App = () => <Table items={items} schema={schema} />;



# Installation

To run project locally, clone this repo, run `npm i && npm start` in your command line, and open up `http://localhost:8080` in your browser.

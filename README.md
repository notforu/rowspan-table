# Rowspan Table

This is a simple table for rendering data with multiple nesting.

# Usage Example

    const data = [
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
		name: "Название",
		addresses: {
			address: "Адрес",
			services: {
				name: "Название сервиса",
				price: "Цена"
			}
		}
	};
	const App = () => <Table data={data} schema={schema} />;



To run project locally, clone this repo, run `npm i && npm start` in your command line, and open up `http://localhost:8080` in your browser.

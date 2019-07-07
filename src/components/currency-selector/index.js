import { h, Component } from 'preact';

export default class CurrencySelector extends Component {

	render({ currencyList, currency, handleCurrencyChange }) {
		const currencyItems = currencyList && currencyList
			.map(item => <option key={item.id} value={item.id}>{item.abbr}</option>);
		return (
			<label>
				<select value={currency} onChange={handleCurrencyChange}>
					{currencyItems}
				</select>
			</label>
		);
	}
}

/*const CurrencySelector = ({ currencyList, currency, handleCurrencyChange }) => {


	const currencyItems = currencyList && currencyList
		.map(item => <option key={item.id} value={item.id}>{item.abbr}</option>);
	return (
		<label>
			<select value={currency} onChange={handleCurrencyChange}>
				{currencyItems}
			</select>
		</label>
	);
};

export default CurrencySelector;*/

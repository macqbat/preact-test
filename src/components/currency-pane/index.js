import { h, Component } from 'preact';
import CurrencySelector from '../currency-selector';

export default class CurrencyPane extends Component {

	onAmountChange = (e) => {
		const value = e.target.value,
			oldValue = this.props.amount;
		if (!value || value.match(/^\d+(?:(\.|,)\d{0,2})?$/)) {
			this.props.handleAmountChange('' + value, this.props.classNameProp);
		}
		else {
			this.props.handleAmountChange(oldValue, this.props.classNameProp);
		}
	};

	onCurrencyChange = (event) => {
		const value = event.target.value;
		this.props.handleCurrencyChange(value, this.props.classNameProp);
	};

	render({ currency, amount, currencyList, handleCurrencyChange, handleAmountChange, exchange, readyToBuy, classNameProp }) {
		return (
			<div className={classNameProp}>
				<div className={'top-line'}>
					<div className={'currency'}>
						<h2>{currency && currency.abbr}</h2>
						<CurrencySelector
							currencyList={currencyList}
							currency={currency.id}
							handleCurrencyChange={this.onCurrencyChange}
						/>
					</div>
					<input type="text" value={amount} onInput={this.onAmountChange}/>
				</div>
				<span className={'saldo'}>
					Balance: {currency.amount} {currency.id}
				</span>
				{exchange && <button onClick={exchange} className={!readyToBuy && 'disabled'}>
					Exchange
				</button>
				}
			</div>
		);
	}
}

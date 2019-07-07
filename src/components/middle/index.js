import { h, Component } from 'preact';


export default class Middle extends Component {

	render({ reverseOrder, crossRate, currencyFrom, currencyTo }) {
		return (
			<div className={'middle'}>
				<button onClick={reverseOrder}> ↑↓ </button>
				<div className={'crossRate'}>{crossRate && `1 ${currencyFrom} = ${crossRate} ${currencyTo}`}</div>
			</div>
		);
	}
}

import { setRates } from './stores/actions';

export default class RatesDrawer {
	static run(store) {
		return new RatesDrawer(store);
	}

	static timePeriod = 10000;
	static apiKey = '1539bb2a1c2a4799bc9745b90d987a50';
	static apiUrl = 'https://openexchangerates.org/api/latest.json';

	constructor(store) {
		this.store = store;
		this.queryData();
		this._startQuerying();
	}

	_startQuerying() {
		setTimeout(() => {
			try {
				this.queryData()
					.then(this._startQuerying.bind(this));
			} catch (e) {
				this._startQuerying();
			}
		}, RatesDrawer.timePeriod);
	}

	queryData() {
		const url = `${RatesDrawer.apiUrl}?app_id=${RatesDrawer.apiKey}`;
		return fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				const { currencyList } = this.store.getState(),
					withRates = currencyList.map(item => {
						item.rate = myJson.rates[item.abbr];
						return item;
					});
				this.store.dispatch(setRates(withRates));
			});
	}
}

import {
	CURRENCY_LIST,
	CURRENCY_FROM,
	CURRENCY_TO,
	RATES_LOADED
} from './constans';

const initialState = {
	[CURRENCY_LIST]: [
		{ id: '$', abbr: 'USD', name: 'Dollar', amount: 20, rate: -1 },
		{ id: '€', abbr: 'EUR', name: 'Euro', amount: 20, rate: -1 },
		{ id: '£', abbr: 'GBP', name: 'Pound', amount: 20, rate: -1 },
		{ id: 'zł', abbr: 'PLN', name: 'Złoty', amount: 20, rate: -1 }
	],
	[CURRENCY_FROM]: '£',
	[CURRENCY_TO]: '$',
	[RATES_LOADED]: false
};

export default initialState;

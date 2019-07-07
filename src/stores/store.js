import { applyMiddleware, createStore } from 'redux';;
import logger from 'redux-logger';

import {
	CURRENCY_LIST,
	CURRENCY_FROM,
	CURRENCY_TO,
	ADD_TO,
	SUBSTRACT_FROM,
	SET_RATES
} from './constans';
import initialState from './initialState';

const reducer = (state, action) => {
	switch (action.type) {
		case CURRENCY_FROM:
			return Object.assign({}, state, { [CURRENCY_FROM]: action.currency });
		case CURRENCY_TO:
			return { ...state, [CURRENCY_TO]: action.currency };
		case SET_RATES:
			console.log('setRates', action.withRates)
			return { ...state, [CURRENCY_LIST]: action.withRates, ratesLoaded: true };
		case ADD_TO:
			const currencyList = state[CURRENCY_LIST].map(curr => {
				if (curr.id === action.currency) {
					return Object.assign({}, curr, {
						amount: ((curr.amount * 100) + (action.amount * 100)) / 100
					});
				}
				return curr;
			});

			return { ...state, [CURRENCY_LIST]: currencyList };

		case SUBSTRACT_FROM:
			const currencyList2 = state[CURRENCY_LIST].map(curr => {
				if (curr.id === action.currency) {
					return Object.assign({}, curr, {
						amount: ((curr.amount * 100) - (action.amount * 100)) / 100
					});
				}
				return curr;
			});

			return { ...state, [CURRENCY_LIST]: currencyList2 };
		default:
			return state;
	}
};

//export default createStore(reducer, initialState, typeof devToolsExtension === 'function' ? devToolsExtension() : undefined);
export default createStore(reducer, initialState, applyMiddleware(logger));

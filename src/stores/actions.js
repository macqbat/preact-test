import {
	CURRENCY_FROM,
	CURRENCY_TO,
	ADD_TO,
	SUBSTRACT_FROM,
	SET_RATES
} from './constans';

export const setChoosenFrom = (currency) => ({
	type: CURRENCY_FROM, currency
});

export const setChoosenTo = (currency) => ({
	type: CURRENCY_TO, currency
});

export const addTo = (currency, amount) => ({
	type: ADD_TO, currency, amount
});

export const substractFrom = (currency, amount) => ({
	type: SUBSTRACT_FROM, currency, amount
});

export const setRates = (withRates) => ({
	type: SET_RATES, withRates
});

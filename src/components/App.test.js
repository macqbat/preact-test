import { h } from 'preact';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from './App';
import CurrencyPane from './currency-pane';

describe('App suite', () => {
	it('renders without crashing', () => {
		shallow(<App />);
	});

	it('has app class', () => {
		const wrapper = shallow(<App />);
		//console.log('.html()', wrapper.html(), '?', App)
	});
});

import { h } from "preact";
import render from "preact-render-to-string";
//import { shallow } from "enzyme";

import App from './App';
import CurrencyPane from './currency-pane';


it('renders without crashing', () => {
	//const wrapper = shallow(<App/>);
	const wrapper = render(<App/>);
	expect(wrapper.find(CurrencyPane).length).toEqual(2);
});


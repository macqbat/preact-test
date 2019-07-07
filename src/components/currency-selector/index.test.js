import { h } from "preact";
import { shallow } from "enzyme";
import { expect } from 'chai';

import CurrencySelector from './index';

describe('CurrencySelector suite', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<CurrencySelector/>);
        expect(wrapper.is('label')).to.equal(true);
    });
});

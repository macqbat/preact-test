import { h } from "preact";
import { shallow } from "enzyme";
import { expect } from 'chai';

import CurrencyPane from './index';
import sinon from "sinon";
const currencyList = [{id: 1, abbr: 'test'}, {id: 2, abbr: 'test2'}];

describe('CurrencySelector suite', () => {
    it('renders without crashing', () => {
        shallow(<CurrencyPane currency={currencyList[0]} />);
    });

    it('contain elements', () => {

        const wrapper = shallow(<CurrencyPane currency={currencyList[0]} currencyList={currencyList}/>);
        expect(wrapper.find('.top-line')).to.have.lengthOf(1);
        expect(wrapper.find('.currency')).to.have.lengthOf(1);
        expect(wrapper.find('.saldo')).to.have.lengthOf(1);
        //expect(wrapper.contains('<h2>test</h2>')).to.equal(true);
    });

    xit('has reactive input', () => {
        const onAmountChange = sinon.spy();
        const wrapper = shallow(<CurrencyPane
            currency={currencyList[0]}
            currencyList={currencyList}
            handleAmountChange={onAmountChange}
        />);
        expect(wrapper.find('input')).to.have.lengthOf(1);
        wrapper.find('input').simulate('keyDown', {which: 97}); //a
        //wrapper.find('input').simulate('change', { target: { value: 'aa' } });
        expect(onAmountChange).to.have.property('callCount', 0);
        wrapper.find('input').simulate('keyDown', {which: 49}); //1
        //wrapper.find('input').simulate('change', { target: { value: '1' } }); //1
        //expect(onAmountChange).to.have.property('callCount', 1);
        expect(wrapper.find('input').get(0).value).to.equal('1');
    });
});

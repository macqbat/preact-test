import { h } from 'preact';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Middle from './index';

describe('Middle suite', () => {
    it('renders without crashing', () => {
        shallow(<Middle />);
    });

    it('contain .middle class', () => {
        const wrapper = shallow(<Middle />);
        expect(wrapper.is('.middle')).to.equal(true);
    });

    it('contain rate display', () => {
        const wrapper = shallow(<Middle />);
        expect(wrapper.find('.crossRate')).to.have.lengthOf(1);
    });

    it('contain clickable button', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<Middle reverseOrder={onButtonClick}/>);
        wrapper.find('button').simulate('click');
        expect(onButtonClick).to.have.property('callCount', 1);
    });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import '../setupTests'

it("renders without crashing", () => {
    const wrapper = shallow(<App />);
})
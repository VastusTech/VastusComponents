import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import TestConfig from "../../../testing/TestConfig";
import {store} from "../../../testing/TestHelper";
import SearchBar from "../SearchBar";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<SearchBar store={store()}/>);
    expect(component).toMatchSnapshot();
});


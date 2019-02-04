import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import SearchBar from "../SearchBar";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<SearchBar store={store()}/>);
    expect(component).toMatchSnapshot();
});


import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import ClientDetailCard from "../ClientDetailCard";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<ClientDetailCard postID={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";
import PostManager from "../PostManager";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<PostManager store={store()}/>);
    expect(component).toMatchSnapshot();
});

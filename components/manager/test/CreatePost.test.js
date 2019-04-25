import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";
import CreatePost from "../CreatePost";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<CreatePost store={store()}/>);
    expect(component).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";
import Message from "../Message";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<Message userID={null} message={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});

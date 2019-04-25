import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";
import CreateEvent from "../CreateEvent";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<CreateEvent store={store()}/>);
    expect(component).toMatchSnapshot();
});

import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import { store } from "../../../testing/TestHelper";
import CreateEvent from "../CreateEvent";

it('renders without crashing', () => {
    const component = shallow(<CreateEvent store={store()}/>);
    expect(component).toMatchSnapshot();
});

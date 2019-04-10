import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import Messages from "../Messages";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<Messages userID={null} comments={[]} store={store()}/>);
    expect(component).toMatchSnapshot();
});

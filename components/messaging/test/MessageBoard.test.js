import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import MessageBoard from "../MessageBoard";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<MessageBoard board={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});

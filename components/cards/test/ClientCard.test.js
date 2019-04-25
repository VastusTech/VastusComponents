import React from 'react';
import ClientCard from "../ClientCard";
import { shallow, mount } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<ClientCard store={store()} clientID={null}/>);
    expect(component).toMatchSnapshot();
});

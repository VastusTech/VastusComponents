import React from 'react';
import ClientCard from "../ClientCard";
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<ClientCard store={store()} clientID={null}/>);
    expect(component).toMatchSnapshot();
});

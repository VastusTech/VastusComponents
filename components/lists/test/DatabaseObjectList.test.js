import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import DatabaseObjectList from "../DatabaseObjectList";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<DatabaseObjectList store={store()} ids={[]} noObjectsMessage={"no objects"}/>)
    expect(component).toMatchSnapshot();
});

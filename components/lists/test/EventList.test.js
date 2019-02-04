import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import EventList from "../EventList";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<EventList store={store()} eventIDs={[]} noEventsMessage={"no events"}/>)
    expect(component).toMatchSnapshot();
});

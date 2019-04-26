import React from 'react';
import EventCard from "../EventCard";
import { shallow, mount } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<EventCard store={store()} eventID={null}/>);
    expect(component).toMatchSnapshot();
});

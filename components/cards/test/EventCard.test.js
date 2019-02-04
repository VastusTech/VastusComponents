import React from 'react';
import EventCard from "../EventCard";
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<EventCard store={store()} eventID={null}/>);
    expect(component).toMatchSnapshot();
});

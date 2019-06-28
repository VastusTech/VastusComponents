import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import EventList from "../EventList";

it('renders without crashing', () => {
  const component = shallow(<EventList store={store()} eventIDs={[]} noEventsMessage={"no events"}/>);
  expect(component).toMatchSnapshot();
});

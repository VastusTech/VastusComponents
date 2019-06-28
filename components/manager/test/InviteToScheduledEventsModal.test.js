import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import InviteToScheduledEventsModal from "../InviteToScheduledEventsModal";

it('renders without crashing', () => {
  const component = shallow(<InviteToScheduledEventsModal store={store()}/>);
  expect(component).toMatchSnapshot();
});

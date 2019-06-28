import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import ClientList from "../ClientList";

it('renders without crashing', () => {
  const component = shallow(<ClientList store={store()} clientIDs={[]} noClientsMessage={"no clients"}/>);
  expect(component).toMatchSnapshot();
});

import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import ClientModal from "../ClientModal";

it('renders without crashing', () => {
  const component = shallow(<ClientModal clientID={null} onClose={() => {
  }} open={true} store={store()}/>);
  expect(component).toMatchSnapshot();
});

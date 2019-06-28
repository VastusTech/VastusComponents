import "../../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../../testing/TestHelper";
import ClientDetailCard from "../ClientDetailCard";

it('renders without crashing', () => {
  const component = shallow(<ClientDetailCard client={null} store={store()}/>);
  expect(component).toMatchSnapshot();
});

import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import PostManager from "../PostManager";

it('renders without crashing', () => {
  const component = shallow(<PostManager store={store()}/>);
  expect(component).toMatchSnapshot();
});

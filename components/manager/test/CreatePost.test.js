import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import CreatePost from "../CreatePost";

it('renders without crashing', () => {
  const component = shallow(<CreatePost store={store()}/>);
  expect(component).toMatchSnapshot();
});

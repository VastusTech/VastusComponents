import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import PostDescriptionModal from "../PostDescriptionModal";

it('renders without crashing', () => {
  const component = shallow(<PostDescriptionModal postID={null} onClose={() => {
  }} open={true} store={store()}/>);
  expect(component).toMatchSnapshot();
});

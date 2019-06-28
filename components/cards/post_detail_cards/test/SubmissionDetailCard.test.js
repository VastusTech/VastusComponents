import "../../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../../testing/TestHelper";
import SubmissionDetailCard from "../SubmissionDetailCard";

it('renders without crashing', () => {
  const component = shallow(<SubmissionDetailCard postID={null} store={store()}/>);
  expect(component).toMatchSnapshot();
});

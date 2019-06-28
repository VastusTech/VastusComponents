import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import CreateSubmissionModal from "../../manager/CreateSubmissionModal";

it('renders without crashing', () => {
  const component = shallow(<CreateSubmissionModal challengeID={null} onClose={() => {
  }} open={true} store={store()}/>);
  expect(component).toMatchSnapshot();
});

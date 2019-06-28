import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import TrainerModal from "../TrainerModal";

it('renders without crashing', () => {
  const component = shallow(<TrainerModal trainerID={null} onClose={() => {
  }} open={true} store={store()}/>);
  expect(component).toMatchSnapshot();
});


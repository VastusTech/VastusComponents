import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import TrainerPortalModal from "../TrainerPortalModal";

it('renders without crashing', () => {
  const component = shallow(<TrainerPortalModal trainerID={null} onClose={() => {
  }} open={true} store={store()}/>);
  expect(component).toMatchSnapshot();
});


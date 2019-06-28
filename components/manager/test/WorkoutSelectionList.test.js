import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import WorkoutSelectionList from "../WorkoutSelectionList";

it('renders without crashing', () => {
  const component = shallow(<WorkoutSelectionList store={store()}/>);
  expect(component).toMatchSnapshot();
});

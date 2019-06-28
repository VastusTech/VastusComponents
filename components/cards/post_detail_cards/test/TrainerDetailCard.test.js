import "../../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../../testing/TestHelper";
import TrainerDetailCard from "../TrainerDetailCard";

it('renders without crashing', () => {
  const component = shallow(<TrainerDetailCard trainer={null} store={store()}/>);
  expect(component).toMatchSnapshot();
});

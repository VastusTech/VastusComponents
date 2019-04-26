import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";
import WorkoutSelectionList from "../WorkoutSelectionList";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<WorkoutSelectionList store={store()}/>);
    expect(component).toMatchSnapshot();
});

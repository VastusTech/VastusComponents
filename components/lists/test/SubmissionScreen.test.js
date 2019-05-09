import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import {store} from "../../../testing/TestHelper";
import SubmissionsScreen from "../SubmissionsScreen";

it('renders without crashing', () => {
    const component = shallow(<SubmissionsScreen store={store()} challengeID={null}/>);
    expect(component).toMatchSnapshot();
});

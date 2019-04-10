import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import SubmissionsScreen from "../SubmissionsScreen";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<SubmissionsScreen store={store()} challengeID={null}/>)
    expect(component).toMatchSnapshot();
});

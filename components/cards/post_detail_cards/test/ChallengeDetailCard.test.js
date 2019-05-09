import "../../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import {store} from "../../../../testing/TestHelper";
import ChallengeDetailCard from "../ChallengeDetailCard";

it('renders without crashing', () => {
    const component = shallow(<ChallengeDetailCard challenge={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});

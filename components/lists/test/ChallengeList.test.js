import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import {store} from "../../../testing/TestHelper";
import ChallengeList from "../ChallengeList";

it('renders without crashing', () => {
    const component = shallow(<ChallengeList store={store()} challengeIDs={[]} noChallengesMessage={"no challenges"}/>);
    expect(component).toMatchSnapshot();
});

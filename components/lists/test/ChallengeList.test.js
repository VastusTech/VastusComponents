import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import ChallengeList from "../ChallengeList";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<ChallengeList store={store()} challengeIDs={[]} noChallengesMessage={"no challenges"}/>)
    expect(component).toMatchSnapshot();
});

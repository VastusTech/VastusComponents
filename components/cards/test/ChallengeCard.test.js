import React from 'react';
import ChallengeCard from "../ChallengeCard";
import { shallow, mount } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<ChallengeCard store={store()} challengeID={null}/>);
    expect(component).toMatchSnapshot()
});
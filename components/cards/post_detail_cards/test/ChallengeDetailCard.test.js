import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../testing/TestConfig";
import ChallengeDetailCard from "../ChallengeDetailCard";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<ChallengeDetailCard postID={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});

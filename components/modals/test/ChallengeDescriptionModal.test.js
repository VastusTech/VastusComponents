import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import ChallengeDescriptionModal from "../ChallengeDescriptionModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<ChallengeDescriptionModal challengeID={null} onClose={() => {}} open={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});

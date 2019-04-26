import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";
import CompleteChallengeModal from "../CompleteChallengeModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<CompleteChallengeModal store={store()}/>);
    expect(component).toMatchSnapshot();
});

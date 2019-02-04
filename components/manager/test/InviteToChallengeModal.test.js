import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import InviteToChallengeModal from "../InviteToChallengeModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<InviteToChallengeModal store={store()}/>);
    expect(component).toMatchSnapshot();
});

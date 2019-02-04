import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import InviteToScheduledEventsModal from "../InviteToScheduledEventsModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<InviteToScheduledEventsModal store={store()}/>);
    expect(component).toMatchSnapshot();
});

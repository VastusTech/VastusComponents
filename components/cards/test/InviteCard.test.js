import React from 'react';
import InviteCard from "../InviteCard";
import { shallow, mount } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<InviteCard store={store()} inviteID={null}/>);
    expect(component).toMatchSnapshot();
});

import React from 'react';
import NotificationCard from "../NotificationCard";
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<NotificationCard store={store()} inviteID={null}/>);
    expect(component).toMatchSnapshot();
});

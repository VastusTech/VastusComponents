import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import {store} from "../../../testing/TestHelper";
import EventDescriptionModal from "../EventDescriptionModal";

it('renders without crashing', () => {
    const component = shallow(<EventDescriptionModal eventID={null} onClose={() => {}} open={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});

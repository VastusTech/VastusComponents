import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import EventDescriptionModal from "../EventDescriptionModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<EventDescriptionModal eventID={null} onClose={() => {}} open={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});

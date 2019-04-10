import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import PostDescriptionModal from "../PostDescriptionModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<PostDescriptionModal postID={null} onClose={() => {}} open={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});

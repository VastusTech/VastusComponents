import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../testing/TestConfig";
import SubmissionDetailCard from "../SubmissionDetailCard";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<SubmissionDetailCard postID={null} store={store()}/>)
    expect(component).toMatchSnapshot();
});

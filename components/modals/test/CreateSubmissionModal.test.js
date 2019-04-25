import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";
import CreateSubmissionModal from "../../manager/CreateSubmissionModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<CreateSubmissionModal challengeID={null} onClose={() => {}} open={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});

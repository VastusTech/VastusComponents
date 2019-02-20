import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import UploadImage from "../UploadImage";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<UploadImage callback={() => {}} imageURL={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});

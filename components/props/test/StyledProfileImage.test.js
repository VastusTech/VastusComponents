import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import StyledProfileImage from "../StyledProfileImage";

it('renders without crashing', () => {
    const component = shallow(<StyledProfileImage profileImage={null} type={null}/>);
    expect(component).toMatchSnapshot();
});

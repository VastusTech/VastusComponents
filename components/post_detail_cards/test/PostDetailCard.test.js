import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import PostDetailCard from "../PostDetailCard";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<PostDetailCard postID={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});

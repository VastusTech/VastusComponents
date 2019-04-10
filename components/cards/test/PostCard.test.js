import React from 'react';
import { shallow, mount } from 'enzyme';
import PostCard from "../PostCard";
import TestConfig, {store} from "../../../../TestConfig";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<PostCard store={store({})} postID={null}/>);
    expect(component).toMatchSnapshot();
});

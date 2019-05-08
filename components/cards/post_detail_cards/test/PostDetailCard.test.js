import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../testing/TestConfig";
import PostDetailCard from "../PostDetailCard";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<PostDetailCard postID={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});

describe('Post Detail Card', () => {
    it('Post Detail Card', () => {
        const component = shallow(<PostDetailCard postID={null} store={store()}/>);
        expect(component).toMatchSnapshot();
    });
});

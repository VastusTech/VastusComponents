import "../../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import {store} from "../../../../testing/TestHelper";
import PostDetailCard from "../PostDetailCard";

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

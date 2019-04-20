import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PostCard from "../PostCard";
import TestConfig, {store} from "../../../../TestConfig";
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";

describe('PostCard.js', function () {
    beforeAll(() => {
        TestConfig();
    });

    it('renders without crashing', () => {
        const component = shallow(<PostCard store={store({})} postID={null}/>);
        expect(component).toMatchSnapshot();
    });

    it('', () => {
        const component = mount(<Grid.Column width={6}>
            {profilePicture(getByAttribute("profileImage"))}
        </Grid.Column>);
        expect();
    });

});
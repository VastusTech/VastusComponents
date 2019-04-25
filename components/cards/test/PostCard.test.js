import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PostCard from "../PostCard";
import TestConfig, {store} from "../../../../TestConfig";
import PostDetailCard from "../post_detail_cards/PostDetailCard";

TestConfig();

describe('PostCard Button', () => {
    const reduxState = {
        cache: {
            clients: {
                CL0001: {
                    id: "CL0001"
                }
            },
            challenges: {
                CH0001: {
                    id: "CH001",
                    by: "CL0001",
                }
            }
        },
    };
    const post = {
        id: "PO0001",
        by: "CL0001",
        about: "CH0001"
    };

    it('renders without crashing', () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>);

        expect(component).toMatchSnapshot();
    });

    const clickFn = jest.fn();
    it('button click should open by modal', () => {
        const component = mount(<PostCard post={post} store={store(reduxState)}/>);
        component
            .find('.ui.button')
            .simulate('click');
        expect(clickFn).toHaveBeenCalled();
    });


    it('profilePicture function displays image properly', () => {
        const component = mount(<PostCard post={post} store={store(reduxState)}/>);

        //const profilePicture;

        expect(component).toMatchSnapshot();
    });

    it('getByAttribute returns proper elements', () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>);

        //const profilePicture;

        expect(component).toMatchSnapshot();
    });

    it('getCorrectDetailCard function displays proper detail card component', () => {
        const component = render(<PostCard post={post} store={store(reduxState)}/>);

        const postDetailCard = shallow(<PostDetailCard postID={post.id}/>);

        //Figure out how to have this match a screenshot
        expect(postDetailCard).toMatchSnapshot();
    });

    it('getPostAttribute returns correct attributes', () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>);

        //const profilePicture;

        let name = "Blake";
        let name1 = "Leo";

        expect();
    });
});
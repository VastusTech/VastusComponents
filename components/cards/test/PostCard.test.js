import React from 'react';
import "../../../testing/SetTesting";
import { Card } from "semantic-ui-react";
import { expect } from 'chai';
import { store } from "../../../testing/TestHelper";
import { shallow, mount, render } from 'enzyme';
import PostCard from "../PostCard";
import PostDetailCard from "../post_detail_cards/PostDetailCard";
import Spinner from "../../props/Spinner";

describe("PostCard Button", () => {
    const reduxState = {
        cache: {
            clients: {
                CL0001: {
                    id: "CL0001",
                    profileImage: "thisIsAFakePath/Path"
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

    it("renders without crashing", () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>);

        global.expect(component).toMatchSnapshot();
    });

    const clickFn = jest.fn();
    it("button click should open by modal", () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>);
        component
            .find("Button")
            .simulate("click");
        expect(clickFn).toHaveBeenCalled();
    });

    describe("Profile Picture Tests", () => {
        it("profilePicture function displays spinner when there is no profile picture", () => {
            const component = shallow(<PostCard post={null} store={store(reduxState)}/>).shallow();

            for (const key in component.getElements()) {
                console.log(component.getElements()[key].type);
            }
            console.log(component.find("Card"));
            expect(component.find("Card")).to.have.lengthOf(1);
        });

        it("profilePicture function displays image when there is a profile picture", () => {
            const component = mount(<PostCard post={post} store={store(reduxState)}/>);

            expect(component.find("StyledProfileImage")).to.have.lengthOf(1);
        });
    });

    it("getByAttribute returns proper elements", () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>);

        //const profilePicture;

        expect(component).toMatchSnapshot();
    });

    it("getCorrectDetailCard function displays proper detail card component", () => {
        const component = render(<PostCard post={post} store={store(reduxState)}/>);

        const postDetailCard = shallow(<PostDetailCard postID={post.id}/>);

        //Figure out how to have this match a screenshot
        expect(postDetailCard).toMatchSnapshot();
    });

    it("getPostAttribute returns correct attributes", () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>);

        //const profilePicture;

        let name = "Blake";
        let name1 = "Leo";

        expect();
    });
});
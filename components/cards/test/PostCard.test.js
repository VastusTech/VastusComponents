import React from 'react';
import { Provider } from 'react-redux';
import "../../../testing/SetTesting";
import { expect } from 'chai';
import { store, funCompWrapper } from "../../../testing/TestHelper";
import { shallow, mount, render } from 'enzyme';
import PostCard, {byModal, getCorrectDetailCard, profilePicture} from "../PostCard";
import ClientDetailCard from "../post_detail_cards/ClientDetailCard";
import PostDetailCard from "../post_detail_cards/PostDetailCard";
// import ClientModal from "../modals/ClientModal";
// import TrainerModal from "../modals/TrainerModal";

const reduxState = {
    cache: {
        clients: {
            CL0001: {
                id: "CL0001",
                profileImage: "thisIsAFakePath/Path",
                name: "Sleeny"
            }
        },
        challenges: {
            CH0001: {
                id: "CH0001",
                by: "CL0001",
            }
        }
    },
};

const post = {
    id: "PO0001",
    by: "CL0001",
    about: "CH0001",
    postType: "Client",
    time_created: "2016-09-15T15:53:00"

};
const post1 = {
    id: "PO0001",
    by: "CL0001",
    about: "CH0001",
    postType: "Trainer"
};
const post2 = {
    id: "PO0001",
    by: "CL0001",
    about: "Challenge"
};
const post3 = {
    id: "PO0001",
    by: "CL0001",
    about: "Post"
};

const invalidPost = {
    id: "PO0001",
    about: "invalid"
};

describe("Profile Picture", () => {
    it("profilePicture function displays spinner when there is no profile picture", () => {
        const Wrapper = funCompWrapper(profilePicture(null));

        const component = shallow(<Wrapper/>);

        expect(component.find("Spinner")).to.have.lengthOf(1);
    });

    it("profilePicture function displays image when there is a profile picture", () => {
        const Wrapper = funCompWrapper(profilePicture("test/path"));

        const component = shallow(<Wrapper/>);

        expect(component.find("StyledProfileImage")).to.have.lengthOf(1);
    });
});

describe('getCorrectDetailCard', () => {
    it("getCorrectDetailCard displays a client detail card with postType Client.", () => {
        const Wrapper = funCompWrapper(getCorrectDetailCard("Client", "CL001"));

        const component = shallow(<Wrapper/>);

        expect(component.find(ClientDetailCard)).to.have.lengthOf(1);
    });
    it("getCorrectDetailCard displays a trainer detail card with postType Trainer.", () => {
        const Wrapper = funCompWrapper(getCorrectDetailCard("Trainer", "TR001"));

        const component = shallow(<Wrapper/>);

        expect(component.find("TrainerDetailCard")).to.have.lengthOf(1);
    });
    it("getCorrectDetailCard displays a challenge detail card with postType Challenge.", () => {
        const Wrapper = funCompWrapper(getCorrectDetailCard("Challenge", "CL001"));

        const component = shallow(<Wrapper/>);

        expect(component.find("ChallengeDetailCard")).to.have.lengthOf(1);
    });
    it("getCorrectDetailCard displays a post detail card with postType Post.", () => {
        const Wrapper = () => getCorrectDetailCard("Post", "PO001");

        const component = shallow(<Wrapper/>);

        expect(component.find("Connect(PostDetailCard)")).to.have.lengthOf(1);
    });
    it("getCorrectDetailCard displays a div with an invalid postType.", () => {
        const component = shallow(getCorrectDetailCard());

        expect(component.find("div")).to.have.lengthOf(1);
    });
});

describe("byModal", () => {
    it("getCorrectDetailCard displays a challenge detail card with postType Challenge.", () => {
        const Wrapper = funCompWrapper(byModal("CL001", "Client", true, () => {}));

        const component = shallow(<Wrapper/>);

        expect(component.find("Connect(ClientModal)")).to.have.lengthOf(1);
    });

    it("getCorrectDetailCard displays a post detail card with postType Post.", () => {
        const Wrapper = funCompWrapper(byModal("TR001", "Trainer", true, () => {}));

        const component = shallow(<Wrapper/>);

        expect(component.find("Connect(TrainerModal)")).to.have.lengthOf(1);
    });
});

describe("PostCard", () => {
    it("renders without crashing", () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>);

        global.expect(component).toMatchSnapshot();
    });

    it("Post Card displays spinner if there is no post attribute", () => {
        const component = shallow(<PostCard post={null} store={store(reduxState)}/>).shallow();

        expect(component.find("Spinner")).to.have.lengthOf(1);
    });

    it("Post Card displays spinner if there is no name attribute in the post owner", () => {
        const component = shallow(<PostCard post={invalidPost} store={store(reduxState)}/>).shallow();

        expect(component.find("Spinner")).to.have.lengthOf(1);
    });

    // it("Post Card displays PostDescriotionModal if there is a valid post", () => {
    //     const component = shallow(<PostCard post={post} store={store(reduxState)}/>).shallow();
    //
    //     expect(component.find("PostDescriptionModal")).to.have.lengthOf(1);
    // });
    //
    // it("Post Card displays spinner if there is no name attribute in the post owner", () => {
    //     const component = shallow(<PostCard post={post} store={store(reduxState)}/>).shallow();
    //
    //     expect(component.find("byModal")).to.have.lengthOf(1);
    // });

    it("The name of the owner is displayed in the post card", () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>).shallow();

        const name = component.find("GridColumn").at(1).render().text();

        console.log(name);

        expect(name).equal("Sleeny  ");
    });

    it("The date that the post was created is displayed in the post card", () => {
        const component = shallow(<PostCard post={post} store={store(reduxState)}/>).shallow();

        const date = component.find("div").at(1).render().text();

        console.log(date);

        expect(date).equal("Sep 15, 2016");
    });

    // it("The access of the post is displayed in the post card", () => {
    //     const component = shallow(<PostCard post={post} store={store(reduxState)}/>).shallow();
    //
    //     const date = component.find("CardMeta").at(1).render().text();
    //
    //     console.log(date);
    //
    //     expect(date).equal("Public");
    // });

    //TODO: Figure out the best way to simulate button clicks
    // it("button click should open by modal", () => {
    //     const component = shallow(<PostCard post={post} store={store(reduxState)}/>).shallow();
    //     component
    //         .find("Button")
    //         .simulate("click");
    //
    //     expect(component.shallow().find("byModal")).to.have.lengthOf(1);
    // });


});
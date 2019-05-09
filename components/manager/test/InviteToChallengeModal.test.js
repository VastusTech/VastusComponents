import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import { store, funCompWrapper } from "../../../testing/TestHelper";
import {expect} from "chai";
import InviteToChallengeModal, {challengeButtons, errorHandler} from "../InviteToChallengeModal";

it('renders without crashing', () => {
    const component = shallow(<InviteToChallengeModal store={store()}/>);
    global.expect(component).toMatchSnapshot();
});

describe("Challenge Buttons", () => {
    it('Correct length of component row is created based on members', () => {
        expect(challengeButtons("CL001", "CL0002", [], false, false, () => {}, () => {},
            () => {}, () => {}).length).equal(0);
        expect(challengeButtons("CL001", "CL0002", ["CL0001"], false, false, () => {}, () => {},
            () => {}, () => {}).length).equal(1);
        expect(challengeButtons("CL001", "CL0002", ["CL0001", "CL0002"], false, false, () => {}, () => {},
            () => {}, () => {}).length).equal(2);
        expect(challengeButtons("CL001", "CL0002", ["CL0001", "CL0002", "CL0003"], false, false, () => {}, () => {},
            () => {}, () => {}).length).equal(3);
    });

    it('Correct length of component row is created based on members', () => {
        const Wrapper = funCompWrapper(challengeButtons("CL001", "CL0002", ["CL0001", "CL0002", "CL0003"], false,
            false, () => {}, () => {}, () => {}, () => {}));
        const component = shallow(<Wrapper/>);

        expect(component.find("Card")).to.have.lengthOf(3);
    });
});

describe("Error Handler", () => {
    it('Given Error', () => {
        const Wrapper = funCompWrapper(errorHandler("This is an errorThis is an errorThis is an errorThis is " +
            "an errorThis is an errorThis is an errorThis is an errorThis is an errorThis is an errorThis is an " +
            "errorThis is an errorThis is an errorThis is an errorThis is an errorThis is an errorThis " +
            "is an errorThis is an errorThis is an error" +
            "This is an errorThis is an errorThis is an errorThis is an errorThis is an errorThis is an error"));
        const component = shallow(<Wrapper/>);

        expect(component.find("p").render().text()).equal("s an errorThis is an errorThis is an errorThis is ");
    });

    it('Returns nothing if not given an error', () => {
        expect(errorHandler()).equal(undefined);
    });
});

describe("Invite to Challenge Modal Prop", () => {
    describe("State", () => {
        //TODO: Figure out why it doesn't work when challenges are passed in
        // it("Displays modal if there are challenges", () => {
        //     const component = shallow(<InviteToChallengeModal challenges={["CH0001", "CH0002"]} store={store()}/>)
        //         .shallow();
        //
        //     expect(component.find("ModalHeader").render().text()).equal("Select Challenge");
        // });

        it("Displays message that there are no challenges if not given any", () => {
            const component = shallow(<InviteToChallengeModal store={store()}/>)
                .shallow();

            expect(component.find("Message").render().text()).equal("No current challenges...");
        });
    });
});
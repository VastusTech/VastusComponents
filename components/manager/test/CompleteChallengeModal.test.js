import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import { store, funCompWrapper } from "../../../testing/TestHelper";
import {expect} from "chai";
import CompleteChallengeModal, {winnerButtons} from "../CompleteChallengeModal";

it('renders without crashing', () => {
    const component = shallow(<CompleteChallengeModal store={store()}/>);
    global.expect(component).toMatchSnapshot();
});

describe("Winner Buttons", () => {
    it('Correct length of component row is created based on members', () => {
        expect(winnerButtons([], "CL0001", "CH0001", () => {}).length).equal(0);
        expect(winnerButtons(["CL0001"], "CL0001", "CH0001", () => {}).length).equal(1);
        expect(winnerButtons(["CL0001", "CL0002"], "CL0001", "CH0001", () => {}).length).equal(2);
        expect(winnerButtons(["CL0001", "CL0002", "CL0003"], "CL0001", "CH0001", () => {}).length).equal(3);
    });

    it('Correct length of component row is created based on members', () => {
        const Wrapper = funCompWrapper(winnerButtons(["CL0001", "CL0002", "CL0003"], "CL0001", "CH0001", () => {}));
        const component = shallow(<Wrapper/>);

        expect(component.find("Card")).to.have.lengthOf(3);
    });
});

describe("Complete Challenge Modal", () => {
    describe("State", () => {
        it('If modal is not passed in any members then message stating no members in the challenge is displayed', () => {
            const component = shallow(<CompleteChallengeModal store={store()}/>).shallow();

            expect(component.find("Message").render().text()).equal("No members in the challenge yet!");
        });

        it('If modal is passed in members then the modal in returned', () => {
            const component = shallow(<CompleteChallengeModal
                members={["CL0001", "CL0002", "CL0003"]} store={store()}/>).shallow();

            expect(component.find("Modal")).to.have.lengthOf(1);
        });
    });
});

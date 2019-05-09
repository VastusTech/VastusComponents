import React from 'react';
import { shallow } from 'enzyme';
import { store, funCompWrapper } from "../../../testing/TestHelper";
import "../../../testing/SetTesting";
import {expect} from "chai";
import ChallengeDescriptionModal, {displayTagIcons} from "../ChallengeDescriptionModal";

it('renders without crashing', () => {
    const component = shallow(<ChallengeDescriptionModal challengeID={null} onClose={() => {}} open={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});

describe("Display Tag Icons", () => {
    it('If no tag icons are passed in then none are returned', () => {
        const Wrapper = funCompWrapper(displayTagIcons());
        const component = shallow(<Wrapper/>);

        expect(component.find("Image")).to.have.lengthOf(0);
    });

    it('If 1 tag icon is passed in then return 1 tag icon', () => {
        const Wrapper = funCompWrapper(displayTagIcons(["HIIT"]));
        const component = shallow(<Wrapper/>);

        expect(component.find("Image")).to.have.lengthOf(1);
    });

    it('If 2 tag icons are passed in then return 2 tag icons', () => {
        const Wrapper = funCompWrapper(displayTagIcons(["HIIT", "Performance"]));
        const component = shallow(<Wrapper/>);

        expect(component.find("Image")).to.have.lengthOf(2);
    });

    it('If 3 tag icons are passed in then return 3 tag icons', () => {
        const Wrapper = funCompWrapper(displayTagIcons(["HIIT", "Performance", "Strength"]));
        const component = shallow(<Wrapper/>);

        expect(component.find("Image")).to.have.lengthOf(3);
    });

    it('If 4 tag icons are passed in then return 4 tag icons', () => {
        const Wrapper = funCompWrapper(displayTagIcons(["HIIT", "Performance", "Strength", "Endurance"]));
        const component = shallow(<Wrapper/>);

        expect(component.find("Image")).to.have.lengthOf(4);
    });
});

describe("Create Correct Modal", () => {
    it('', () => {









        
    });
});

describe("Select Winner", () => {
    it('', () => {

    });
});

describe("Create Correct Button", () => {
    it('', () => {

    });
});

describe("Display Streak Info", () => {
    it('', () => {

    });
});

describe("Display Error", () => {
    it('', () => {

    });
});

describe("Challenge Deleted", () => {
    it('', () => {

    });
});

describe("Create Correct Settings Button", () => {
    it('', () => {

    });
});

describe("Challenge Description Modal", () => {
    describe("State", () => {
        it('', () => {

        });
    });
});

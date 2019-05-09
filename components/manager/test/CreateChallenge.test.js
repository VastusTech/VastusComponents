import React from 'react';
import { shallow } from 'enzyme';
import { store, funCompWrapper } from "../../../testing/TestHelper";
import "../../../testing/SetTesting";
import {expect} from "chai";
import CreateChallenge, {createSuccessLabel, displayError, tasksPlural} from "../CreateChallenge";

it('renders without crashing', () => {
    const component = shallow(<CreateChallenge store={store()}/>);
    global.expect(component).toMatchSnapshot();
});

describe("Create Success Label", () => {
    it('Success label displays the correct header', () => {
        const Wrapper = funCompWrapper(createSuccessLabel(true));
        const component = shallow(<Wrapper/>).shallow();

        expect(component.find("MessageHeader").render().text()).equal("Success!")
    });

    it('Success label displays the correct message ', () => {
        const Wrapper = funCompWrapper(createSuccessLabel(true));
        const component = shallow(<Wrapper/>).shallow();

        expect(component.find("p").render().text()).equal("You just created a new Challenge!")
    });

    it('Success label returns nothing if passed false ', () => {
        expect(createSuccessLabel(false)).equal(null);
    });

});

describe("Display Error", () => {
    it('Success label displays the correct header', () => {
        const Wrapper = funCompWrapper(displayError("Soda machine broke!"));
        const component = shallow(<Wrapper/>).shallow();

        expect(component.find("MessageHeader").render().text()).equal("Sorry!")
    });

    it('Success label displays the correct message', () => {
        const Wrapper = funCompWrapper(displayError("Soda machine broke!"));
        const component = shallow(<Wrapper/>).shallow();

        expect(component.find("p").render().text()).equal("Soda machine broke!")
    });

    it('Success label returns nothing if passed false ', () => {
        expect(displayError("")).equal(undefined);
    });
});

describe("Tasks Plural", () => {
    it('If number is greater than one return plural of task', () => {
        expect(tasksPlural(5)).equal("tasks");
    });

    it('If number is one return singular of task', () => {
        expect(tasksPlural(1)).equal("task");
    });
});

describe("Create Challenge", () => {
    describe("State", () => {
        it('Correct number of images for challenge types', () => {
            const component = shallow(<CreateChallenge store={store()}/>).shallow();
            expect(component.find("Image")).to.have.lengthOf(4);
        });

        it('Correct number of checkbox settings', () => {
            const component = shallow(<CreateChallenge store={store()}/>).shallow();
            expect(component.find("Checkbox")).to.have.lengthOf(3);
        });
    });
});

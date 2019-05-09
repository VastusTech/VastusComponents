import React from 'react';
import ClientCard from "../ClientCard";
import { shallow, mount } from 'enzyme';
import "../../../testing/SetTesting";
import {store} from "../../../testing/TestHelper";
import EventCard from "../EventCard";
import {expect} from "chai";

const client1 = {
    id: "CL0001",
    profileImage: "thisIsAFakePath/Path",
    name: "Sleeny",
    challengesWon: ["CH001", "CH002", "CH003", "CH004", "CH005"]
};

it('renders without crashing', () => {
    const component = shallow(<ClientCard store={store()} clientID={null}/>);
    global.expect(component).toMatchSnapshot();
});

describe("Client Card", () => {
    // States ~
    describe("States", () => {
        // Here you check the state of the component, like the shown text and sub-components for the component.
        // Make sure you go into all the conditions of the component so that you test every possible state of the
        // component.
        // EXAMPLE: it("Shows the spinner when no post is passed in");
        it('Client card without event prop displays loading', () => {
            const component = shallow(<ClientCard store={store()} event={null}/>);

            expect(component.find("Spinner")).to.have.lengthOf(1);
        });

        it('Client card with client and without rank prop displays card', () => {
            const component = shallow(<ClientCard store={store()} client={client1}/>);

            expect(component.find("Card")).to.have.lengthOf(1);
        });

        it('Event card with client and no rank prop displays client name in header', () => {
            const component = shallow(<ClientCard store={store()} client={client1}/>);

            console.log(component.find("CardHeader").at(1).render().text());

            expect(component.find("CardHeader").at(1).render().text()).equals("Sleeny");
        });

        it('Event card with client and rank prop displays event date properly', () => {
            const component = shallow(<ClientCard store={store()} rank={1} client={client1}/>);

            console.log(component.find("GridColumn").at(2).render().text());

            expect(component.find("GridColumn").at(2).render().text()).equals("Sleeny");
        });

        it('Event card with event prop displays event ', () => {
            const component = shallow(<ClientCard store={store()} rank={1} client={client1}/>);

            console.log(component.find("CardMeta").render().text());

            expect(component.find("CardMeta").render().text()).equals("5 challenges won");
        });
    });
    // Events ~
    //describe("Events", () => {
        // Here you use .simultate('click') to check the change in the component.
        // Only in special circumstances should you use jest.fn() and that's if you're directly passing in a function
        // into the component's props and you have access to it.

        //TODO: Test that pressing the card sets descriptionModalOpen to true
    //});
});
import React from 'react';
import EventCard from "../EventCard";
import { shallow, mount } from 'enzyme';
import "../../../testing/SetTesting";
import {store} from "../../../testing/TestHelper";
import {expect} from "chai";

const event1 = {
    id: "EV0001",
    title: "Sleeny's event",
    time: "2019-09-15T15:53:00",
    time_created: "2019-07-14T15:53:00",
    capacity: 5,
    members: ['Blake', 'Kaloob', 'Leo']
};

it('renders without crashing', () => {
    const component = shallow(<EventCard store={store()} event={event1}/>);
    expect(component).toMatchSnapshot();
});

describe("Event Card", () => {
    // States ~
    describe("States", () => {
        // Here you check the state of the component, like the shown text and sub-components for the component.
        // Make sure you go into all the conditions of the component so that you test every possible state of the
        // component.
        // EXAMPLE: it("Shows the spinner when no post is passed in");
        it('Event card without event prop displays spinner', () => {
            const component = shallow(<EventCard store={store()} event={null}/>);

            expect(component.find("Spinner")).to.have.lengthOf(1);
        });

        it('Event card with event prop displays card', () => {
            const component = shallow(<EventCard store={store()} event={event1}/>);

            expect(component.find("Card")).to.have.lengthOf(1);
        });

        it('Event card with event prop displays event title in header', () => {
            const component = shallow(<EventCard store={store()} event={event1}/>);

            console.log(component.find("CardHeader").render().text());

            expect(component.find("CardHeader").render().text()).equals("Sleeny's event");
        });

        it('Event card with trainer prop displays event date properly', () => {
            const component = shallow(<EventCard store={store()} event={event1}/>);

            console.log(component.find("CardMeta").at(0).render().text());

            expect(component.find("CardMeta").at(0).render().text()).equals("Sun, Sep 15, 2019 03:53PM");
        });

        it('Event card with event prop displays event ', () => {
            const component = shallow(<EventCard store={store()} event={event1}/>);

            console.log(component.find("CardMeta").at(1).render().text());

            expect(component.find("CardMeta").at(1).render().text()).equals("Sun, Jul 14, 2019 03:53PM");
        });
    });
    // Events ~
    describe("Events", () => {
        // Here you use .simultate('click') to check the change in the component.
        // Only in special circumstances should you use jest.fn() and that's if you're directly passing in a function
        // into the component's props and you have access to it.

        //TODO: Test that pressing the card sets descriptionModalOpen to true
        it('trainer card with trainer prop displays trainer name in header', () => {
            const component = shallow(<EventCard store={store()} event={event1}/>);

            console.log(component.state());

            expect(component.find("CardHeader").render().text()).equals("Sleeny");
        });
    });
});

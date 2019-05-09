import React from 'react';
import "../../../testing/SetTesting";
import ChallengeCard from "../ChallengeCard";
import { shallow, mount } from 'enzyme';
import { store } from "../../../testing/TestHelper";
import ClientCard from "../ClientCard";
import {expect} from "chai";

const challenge1 = {
    title: "Sleeny's Challenge",
    tags: ["HIIT"],
    endTime: "2019-05-07T12:00",
    members: ["CL001", "CL002", "CL003", "CL004", "CL005"],
    capacity: 10
}

const challenge2 = {
    title: "Sleeny's Challenge",
    tags: ["HIIT", "Performance"],
    endTime: "2019-05-08T12:00"
}

const challenge3 = {
    title: "Sleeny's Challenge",
    tags: ["HIIT", "Performance", "Endurance"]
}

const challenge4 = {
    title: "Sleeny's Challenge",
    tags: ["HIIT", "Performance", "Endurance", "Strength"]
}

it('renders without crashing', () => {
    const component = shallow(<ChallengeCard store={store()} challenge={null}/>);
    global.expect(component).toMatchSnapshot()
});

describe('Challenge Card', function () {
    describe("States", () => {
        // Here you check the state of the component, like the shown text and sub-components for the component.
        // Make sure you go into all the conditions of the component so that you test every possible state of the
        // component.
        // EXAMPLE: it("Shows the spinner when no post is passed in");
        it('Challenge card without event prop displays loading', () => {
            const component = shallow(<ChallengeCard store={store()} challenge={null}/>);

            expect(component.find("Spinner")).to.have.lengthOf(1);
        });

        it('Challenge card with client and without rank prop displays card', () => {
            const component = shallow(<ChallengeCard store={store()} challenge={challenge1}/>);

            expect(component.find("Card")).to.have.lengthOf(1);
        });

        it('Challenge card with client and no rank prop displays client name in header', () => {
            const component = shallow(<ChallengeCard store={store()} challenge={challenge1}/>);

            console.log(component.find("CardHeader").render().text());

            expect(component.find("CardHeader").render().text()).equals("Sleeny's Challenge");
        });

        it('Challenge card with client and rank prop displays event date properly', () => {
            const component = shallow(<ChallengeCard store={store()} rank={1} challenge={challenge1}/>);

            console.log(component.find("CardMeta").at(0).render().text());

            expect(component.find("CardMeta").at(0).render().text()).equals("1 Day Left");
        });

        it('Challenge card with client and rank prop displays event date properly', () => {
            const component = shallow(<ChallengeCard store={store()} rank={1} challenge={challenge2}/>);

            console.log(component.find("CardMeta").at(0).render().text());

            expect(component.find("CardMeta").at(0).render().text()).equals("2 Days Left");
        });

        it('Challenge card with event prop displays event ', () => {
            const component = shallow(<ChallengeCard store={store()} rank={1} challenge={challenge1}/>);

            console.log(component.find("CardMeta").at(1).render().text());

            expect(component.find("CardMeta").at(1).render().text()).equals("5 of 10 spots taken.");
        });
    });
});
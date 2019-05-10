import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import {expect} from "chai";
import { store, funCompWrapper } from "../../../testing/TestHelper";
import DatabaseObjectList, {objectComponents, getObjectComponent, batchFetchMoreObjects, addObject}
from "../DatabaseObjectList";
import ClientCard from "../../cards/ClientCard";
import TrainerCard from "../../cards/TrainerCard";
import ChallengeCard from "../../cards/ChallengeCard";
import EventCard from "../../cards/EventCard";
import PostCard from "../../cards/PostCard";

const client1 = {
    id: 'CL0001'
}

const trainer1 = {
    id: 'TR0001'
}

const event1 = {
    id: 'EV0001'
}

const challenge1 = {
    id: 'CH0001'
}

const post1 = {
    id: 'PO0001'
}

it('renders without crashing', () => {
    const component = shallow(<DatabaseObjectList store={store()} ids={[]} noObjectsMessage={"no objects"}/>)
    global.expect(component).toMatchSnapshot();
});

describe("Object Components", () => {
    //TODO: This fails even though it's comparing the same thing
    it('Returns empty component list if given empty list of database objects', () => {
        const Wrapper = funCompWrapper(objectComponents([]));

        const component = shallow(<Wrapper/>);

        expect(component.find("ListItem")).to.have.lengthOf(0);
    });

    it('Returns component list of proper size', () => {
        const Wrapper = funCompWrapper(objectComponents([{key: 0, value: "a"}]));

        const component = shallow(<Wrapper/>);

        expect(component.find("ListItem")).to.have.lengthOf(1);
    });

    it('Returns component list of proper size', () => {
        const Wrapper = funCompWrapper(objectComponents([{key: 0, value: "a"}, {key: 1, value: "a"}]));

        const component = shallow(<Wrapper/>);

        expect(component.find("ListItem")).to.have.lengthOf(2);
    });

    it('Returns component list of proper size', () => {
        const Wrapper = funCompWrapper(objectComponents(
            [{key: 0, value: "a"}, {key: 1, value: "a"}, {key: 2, value: "a"}]));

        const component = shallow(<Wrapper/>);

        expect(component.find("ListItem")).to.have.lengthOf(3);
    });
});

describe("Get Object Components", () => {
    it('Returns client card if the object is a client', () => {
        const Wrapper = funCompWrapper(getObjectComponent(0, {key: "CL0001", item_type: "Client"}));

        const component = shallow(<Wrapper/>);

        expect(component.find(ClientCard)).to.have.lengthOf(1);
    });

    it('Returns trainer card if the object is a trainer', () => {
        const Wrapper = funCompWrapper(getObjectComponent(0, {key: "TR0001", item_type: "Trainer"}));

        const component = shallow(<Wrapper/>);

        expect(component.find(TrainerCard)).to.have.lengthOf(1);
    });

    it('Returns event card if the object is an event', () => {
        const Wrapper = funCompWrapper(getObjectComponent(0, {key: "EV0001", item_type: "Event"}));

        const component = shallow(<Wrapper/>);

        expect(component.find(EventCard)).to.have.lengthOf(1);
    });

    it('Returns challenge card if the object is a challenge', () => {
        const Wrapper = funCompWrapper(getObjectComponent(0, {key: "CH0001", item_type: "Challenge"}));

        const component = shallow(<Wrapper/>);

        expect(component.find(ChallengeCard)).to.have.lengthOf(1);
    });

    it('Returns post card if the object is a post', () => {
        const Wrapper = funCompWrapper(getObjectComponent(0, {key: "PO0001", item_type: "Post"}));

        const component = shallow(<Wrapper/>);

        expect(component.find(PostCard)).to.have.lengthOf(1);
    });
});

describe("Database Object List", () => {
    describe("State", () => {
        it('If no ids are passed in display the given no objects message', () => {
            const component = shallow(<DatabaseObjectList store={store()} ids={[]}
                                                          noObjectsMessage={"no objects"}/>).shallow();

            expect(component.find("Message").render().text()).equal("no objects");
        });

        //TODO: Figure out why this doesn't work
        // it('If no ids are passed in display the given no objects message', () => {
        //     const component = shallow(<DatabaseObjectList store={store()} ids={["CL0001", "CL0002"]}
        //                                                   noObjectsMessage={"no objects"}/>);
        //
        //     expect(component.find("List")).to.have.lengthOf(1);
        // });
    });
});

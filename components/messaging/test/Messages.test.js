import React from 'react';
import { shallow } from 'enzyme';
import {store} from "../../../testing/TestHelper";
import "../../../testing/SetTesting";
import {expect} from "chai";
import Messages from "../Messages";


it('renders without crashing', () => {
    const component = shallow(<Messages userID={null} messages={[]} store={store()}/>);
    global.expect(component).toMatchSnapshot();
});

describe("Messages", () => {
    describe("State", () => {
        it('Displays nothing if there are no messages', () => {
            const component = shallow(<Messages userID={null} messages={[]} store={store()}/>);

            expect(component.find("Message")).to.have.lengthOf(0);
        });

        it('Displays proper number messages', () => {
            const component = shallow(<Messages userID={null} messages={["hey"]} store={store()}/>);

            expect(component.find("Message")).to.have.lengthOf(1);
        });

        it('Displays proper number of messages', () => {
            const component = shallow(<Messages userID={null} messages={["hey", "there"]} store={store()}/>);

            expect(component.find("Message")).to.have.lengthOf(2);
        });

        it('Displays proper number of messages', () => {
            const component = shallow(<Messages userID={null} messages={["hey", "there", "sleeny"]} store={store()}/>);

            expect(component.find("Message")).to.have.lengthOf(3);
        });
    });
});

import "../../../testing/SetTesting";
import React from 'react';
import { expect } from "chai";
import { shallow } from 'enzyme';
import TestConfig from "../../../testing/TestConfig";
import { store } from "../../../testing/TestHelper";
import Spinner from "../Spinner";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<Spinner loading={true} store={store()}/>);
    global.expect(component).toMatchSnapshot();
    const message = component.find("Message");
    const icon = message.find("Icon");
    const content = message.find("MessageContent");
    const header = content.find("MessageHeader");
    console.log("TEST~");
    // expect(header.text()).to.be.equal("Loading...");
    console.log(header.text());
    const renderedHeader = header.render();
    console.log(renderedHeader.text());
    const elements = header.getElements();
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        console.log(element);
    }
    // console.log(JSON.stringify(component.find("div")));
});

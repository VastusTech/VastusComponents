import "../../../testing/SetTesting";
import React from 'react';
import { expect } from "chai";
import { shallow } from 'enzyme';
import TestConfig from "../../../testing/TestConfig";
import { store } from "../../../testing/TestHelper";
import Spinner from "../Spinner";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<Spinner loading={true}/>);
    global.expect(component).toMatchSnapshot();
    const message = component.find("Message");
    const icon = message.find("Icon");
    const content = message.find("MessageContent");
    const header = content.find("MessageHeader");
    // expect(header.text()).to.be.equal("Loading...");
    const renderedHeader = header.render();
    const elements = component.getElements();
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
    }
    // console.log(JSON.stringify(component.find("div")));
});

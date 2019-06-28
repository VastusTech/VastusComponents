import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import "../../../testing/SetTesting";
import {expect} from "chai";
import Messages from "../Messages";
import Message from "../Message";

const message1: Message = {
  board: "BOARD", from: "FROM", message: "HEY",
  name: "NAME", profileImagePath: "IMAGEPATH", profileImage: "IMAGE",
  type: "text"
};
const message2: Message = {
  board: "BOARD", from: "FROM", message: "THERE",
  name: "NAME", profileImagePath: "IMAGEPATH", profileImage: "IMAGE",
  type: "text"
};
const message3: Message = {
  board: "BOARD", from: "FROM", message: "SLEENY",
  name: "NAME", profileImagePath: "IMAGEPATH", profileImage: "IMAGE",
  type: "text"
};

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
      const component = shallow(<Messages userID={null} messages={[message1]} store={store()}/>);

      expect(component.find("Message")).to.have.lengthOf(1);
    });

    it('Displays proper number of messages', () => {
      const component = shallow(<Messages userID={null} messages={[message1, message2]} store={store()}/>);

      expect(component.find("Message")).to.have.lengthOf(2);
    });

    it('Displays proper number of messages', () => {
      const component = shallow(<Messages userID={null} messages={[message1, message2, message3]} store={store()}/>);

      expect(component.find("Message")).to.have.lengthOf(3);
    });
  });
});

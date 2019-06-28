import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import "../../../testing/SetTesting";
import {expect} from "chai";
import MessageInput from "../MessageInput";

it('renders without crashing', () => {
  const component = shallow(<MessageInput board={null} store={store()}/>);
  global.expect(component).toMatchSnapshot();
});

describe("Message Input", () => {
  describe("State", () => {
    it('Message Input is contained within a fragment', () => {
      const component = shallow(<MessageInput board={null} store={store()}/>).shallow();
      expect(component.find("Fragment")).to.have.lengthOf(1);
    });

    it('Message input contains an input area', () => {
      const component = shallow(<MessageInput board={null} store={store()}/>).shallow();
      expect(component.find("input")).to.have.lengthOf(2);
      expect(component.find("Input")).to.have.lengthOf(1);
    });
  });
  //TODO: Figure out how to test the buttons here especially
});


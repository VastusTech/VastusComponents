import React from 'react';
import {shallow} from 'enzyme';
import {store} from "../../../testing/TestHelper";
import "../../../testing/SetTesting";
import {expect} from "chai";
import Message from "../Message";

const message1 = {
  from: "CL0001",
  name: "Sleeny",
  message: "Hey there Blinky",
  type: "picture",
  messageURL: "amazonaws.com",
  profilePicture: "this/is/a/fake/path"
}

const message2 = {
  from: "CL0001",
  name: "Blinky",
  message: "Hey there Sleenorino",
  type: "video",
  messageURL: "amazonaws.com",
  profilePicture: "this/is/a/fake/path"
}

const message3 = {
  from: "CL0001",
  name: "Sleeny",
  message: "Hey there Blinky",
  messageURL: "amazonaws.com",
  profilePicture: "this/is/a/fake/path"
}

it('renders without crashing', () => {
  const component = shallow(<Message userID={"CL0001"} message={message1} store={store()}/>);
  global.expect(component).toMatchSnapshot();
});

describe("Message", () => {
  describe("State", () => {
    describe("Picture", () => {
      it('if type is picture and sender is the current user, have three divs', () => {
        const component = shallow(<Message userID={"CL0001"} message={message1} store={store()}/>);

        expect(component.find("div")).to.have.lengthOf(3);
      });

      it('if type is picture and sender is not the current user, show to correct name', () => {
        const component = shallow(<Message userID={"CL0002"} message={message1} store={store()}/>);

        expect(component.find("GridRow").at(0).render().text()).equal("Sleeny");
      });
    });

    describe("Video", () => {
      it('if type is video and sender is the current user, have player', () => {
        const component = shallow(<Message userID={"CL0001"} message={message2} store={store()}/>);

        expect(component.find("Player")).to.have.lengthOf(1);
      });

      it('if type is video and sender is not the current user, have player', () => {
        const component = shallow(<Message userID={"CL0002"} message={message2} store={store()}/>);

        expect(component.find("Player")).to.have.lengthOf(1);
      });

      it('if type is video and sender is not the current user, show to correct name', () => {
        const component = shallow(<Message userID={"CL0002"} message={message2} store={store()}/>);

        expect(component.find("GridRow").at(0).render().text()).equal("Blinky");
      });
    });

    describe("Text", () => {
      it('if no type and sender is the current user, show correct message', () => {
        const component = shallow(<Message userID={"CL0001"} message={message3} store={store()}/>);

        expect(component.find("Label").render().text()).equal("Hey there Blinky");
      });

      it('if no type and sender is not the current user, show to correct name', () => {
        const component = shallow(<Message userID={"CL0002"} message={message3} store={store()}/>);

        expect(component.find("GridRow").at(0).render().text()).equal("Sleeny");
      });

      it('if no type and sender is not the current user, show to correct message', () => {
        const component = shallow(<Message userID={"CL0002"} message={message3} store={store()}/>);

        expect(component.find("GridRow").at(1).render().text()).equal("Hey there Blinky");
      });
    });
  });
});

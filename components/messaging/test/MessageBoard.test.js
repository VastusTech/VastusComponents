import React from 'react';
import {shallow} from 'enzyme';
import {funCompWrapper, store} from "../../../testing/TestHelper";
import "../../../testing/SetTesting";
import {expect} from "chai";
import MessageBoard, {getOtherReadStatus} from "../MessageBoard";

it('renders without crashing', () => {
  const component = shallow(<MessageBoard board={null} store={store()}/>);
  global.expect(component).toMatchSnapshot();
});

describe("Get Other Read Status", () => {
  it('if user is in the last seen for list then show that the message has been seen', () => {
    const Wrapper = funCompWrapper(getOtherReadStatus("CL0001", {from: "CL0002", lastSeenFor: ["CL0001"]}));

    const component = shallow(<Wrapper/>);

    expect(component.find("Message").render().text()).equal("Seen");
  });

  it('if user is not in the last seen for list then show that the message has not been seen', () => {
    const Wrapper = funCompWrapper(getOtherReadStatus("CL0001", {from: "CL0002", lastSeenFor: []}));

    const component = shallow(<Wrapper/>);

    expect(component.find("Message").render().text()).equal("Unseen");
  });

  it('if user is not in the last seen for list then show that the message has not been seen', () => {
    expect(getOtherReadStatus(null, {from: "CL0002", lastSeenFor: ["CL0001"]})).equal(null);
  });

});

const message1 = {
  from: "CL0001",
  name: "Sleeny",
  message: "Hey there Blinky",
  type: "picture",
  boardIfFirsts: {},
  messageURL: "amazonaws.com",
  profilePicture: "this/is/a/fake/path"
}

//TODO: Double shallow gives errors figure out why
// describe("Message Board", () => {
//     describe("State", () => {
//         it('Scroll view shows up with proper inputs', () => {
//             const component = shallow(<MessageBoard message={message1} board={"BO0001"} store={store()}/>).shallow();
//
//             expect(component.find("ScrollView")).to.have.lengthOf(1);
//         });
//
//         it('Comment box shows up with proper inputs', () => {
//             const component = shallow(<MessageBoard message={message1} board={"BO0001"} store={store()}/>).shallow();
//
//             expect(component.find("CommentBox")).to.have.lengthOf(1);
//         });
//     });
// });

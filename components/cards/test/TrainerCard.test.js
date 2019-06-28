import React from 'react';
import {Provider} from "react-redux";
import {shallow, mount} from 'enzyme';
import TrainerCard from "../TrainerCard";
import "../../../testing/SetTesting";
import {store} from "../../../testing/TestHelper";
import {funCompWrapper} from "../../../testing/TestHelper";
import {profilePicture} from "../PostCard";
import {expect} from "chai";

const reduxState = {
  cache: {
    trainers: {
      TR0001: {
        id: "TR0001",
        profileImage: "thisIsAFakePath/Path",
        name: "Sleeny"
      }
    },
    challenges: {
      CH0001: {
        id: "CH0001",
        by: "CL0001",
      }
    }
  },
};

const trainer1 = {
  id: "TR0001",
  profileImage: "thisIsAFakePath/Path",
  name: "Sleeny"
};

it('renders without crashing', () => {
  const component = shallow(<TrainerCard store={store()} rank={1} trainer={trainer1}/>);
  global.expect(component).toMatchSnapshot();
});

describe("Post Card", () => {
  // States ~
  describe("States", () => {
    // Here you check the state of the component, like the shown text and sub-components for the component.
    // Make sure you go into all the conditions of the component so that you test every possible state of the
    // component.
    // EXAMPLE: it("Shows the spinner when no post is passed in");
    it('trainer card without trainer prop displays spinner', () => {
      const component = shallow(<TrainerCard store={store()} rank={1} trainer={null}/>);

      expect(component.find("Spinner")).to.have.lengthOf(1);
    });

    it('trainer card with trainer prop displays card', () => {
      const component = shallow(<TrainerCard store={store()} rank={1} trainer={trainer1}/>);

      expect(component.find("Card")).to.have.lengthOf(1);
    });

    it('trainer card with trainer prop displays trainer name in header', () => {
      const component = shallow(<TrainerCard store={store(reduxState)} rank={1} trainer={trainer1}/>);

      console.log(component.find("CardHeader").render().text());

      expect(component.find("CardHeader").render().text()).equals("Sleeny");
    });
  });
  // Events ~
  describe("Events", () => {
    // Here you use .simultate('click') to check the change in the component.
    // Only in special circumstances should you use jest.fn() and that's if you're directly passing in a function
    // into the component's props and you have access to it.

    //TODO: Test that pressing the card sets descriptionModalOpen to true
    it('trainer card with trainer prop displays trainer name in header', () => {
      const component = shallow(<TrainerCard store={store(reduxState)} rank={1} trainer={trainer1}/>);

      expect(component.find("CardHeader").render().text()).equals("Sleeny");
    });
  });
});

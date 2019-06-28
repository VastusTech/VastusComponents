import "../../../testing/SetTesting";
import React from 'react';
import {shallow} from 'enzyme';
import {store, funCompWrapper} from "../../../testing/TestHelper";
import "../../../testing/SetTesting";
import {expect} from "chai";
import SearchBar, {getResultModal, getFormattedResults} from "../SearchBar";
import ClientModal from "../../modals/ClientModal"
import TrainerModal from "../../modals/TrainerModal";
import EventDescriptionModal from "../../modals/EventDescriptionModal";
import ChallengeDescriptionModal from "../../modals/ChallengeDescriptionModal";
import PostDescriptionModal from "../../modals/PostDescriptionModal";
import GroupDescriptionModal from "../../modals/GroupDescriptionModal";

it('renders without crashing', () => {
  const component = shallow(<SearchBar store={store()}/>);
  global.expect(component).toMatchSnapshot();
});

describe("Get Result Modal", () => {
  it('If given result is a client then return a client modal', () => {
    const Wrapper = funCompWrapper(getResultModal({item_type: "Client", id: "CL0001"}, false, () => {
    }));
    const component = shallow(<Wrapper/>);

    expect(component.find(ClientModal)).to.have.lengthOf(1);
  });

  it('If given result is a client then return a client modal', () => {
    const Wrapper = funCompWrapper(getResultModal({item_type: "Trainer", id: "CL0001"}, false, () => {
    }));
    const component = shallow(<Wrapper/>);

    expect(component.find(TrainerModal)).to.have.lengthOf(1);
  });

  it('If given result is a client then return a client modal', () => {
    const Wrapper = funCompWrapper(getResultModal({item_type: "Event", id: "CL0001"}, false, () => {
    }));
    const component = shallow(<Wrapper/>);

    expect(component.find(EventDescriptionModal)).to.have.lengthOf(1);
  });

  it('If given result is a client then return a client modal', () => {
    const Wrapper = funCompWrapper(getResultModal({item_type: "Challenge", id: "CL0001"}, false, () => {
    }));
    const component = shallow(<Wrapper/>);

    expect(component.find(ChallengeDescriptionModal)).to.have.lengthOf(1);
  });

  it('If given result is a client then return a client modal', () => {
    const Wrapper = funCompWrapper(getResultModal({item_type: "Post", id: "CL0001"}, false, () => {
    }));
    const component = shallow(<Wrapper/>);

    expect(component.find(PostDescriptionModal)).to.have.lengthOf(1);
  });

  it('If given result is a client then return a client modal', () => {
    const Wrapper = funCompWrapper(getResultModal({item_type: "Group", id: "CL0001"}, false, () => {
    }));
    const component = shallow(<Wrapper/>);

    expect(component.find(GroupDescriptionModal)).to.have.lengthOf(1);
  });
});

describe("Search Bar Prop", () => {
  describe("State", () => {
    //TODO: Figure out why components like this cannot have double shallows
    // it('Search bar contains search component', () => {
    //     const component = shallow(<SearchBar store={store()}/>).shallow();
    //
    //     expect(component.find("Search")).to.have.lengthOf(1);
    // });
  });
});
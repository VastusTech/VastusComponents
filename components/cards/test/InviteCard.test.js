import React from 'react';
import InviteCard, {isValidRequest, fromModal, toModal, aboutModal, getInviteDetails} from "../InviteCard";
import {shallow, mount} from 'enzyme';
import {store, funCompWrapper} from "../../../testing/TestHelper";
import "../../../testing/SetTesting";
import {expect} from "chai";
import {getCorrectDetailCard, profilePicture} from "../PostCard";
import ClientDetailCard from "../post_detail_cards/ClientDetailCard";
import ClientModal from "../../modals/ClientModal"
import TrainerModal from "../../modals/TrainerModal"
import EventDescriptionModal from "../../modals/EventDescriptionModal"
import ChallengeDescriptionModal from "../../modals/ChallengeDescriptionModal"
import GroupDescriptionModal from "../../modals/GroupDescriptionModal"


//"time_created", "from", "to", "inviteType", "about", "description"
const invite1 = {
  id: "IV0001"
}

it('renders without crashing', () => {
  const component = shallow(<InviteCard store={store()} invite={invite1}/>);
  global.expect(component).toMatchSnapshot();
});

describe("Is Valid Request", () => {
  it('Request is valid if given all of the required inputs', () => {

    expect(isValidRequest("CL0001", "IV0001", "CH0001", "CL0002", "CL0001")).equal("CL0001");
  });

  it('Request is invalid if not given all of the required inputs', () => {

    expect(isValidRequest("CL0001", "IV0001", "CH0001", "CL0002", null)).equal(null);
  });
});

describe("From Modal", () => {
  it('If invite is from a client then open a client modal.', () => {
    const Wrapper = funCompWrapper(fromModal("CL0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    expect(component.find(ClientModal)).to.have.lengthOf(1);
  });

  it('If invite is from a trainer then open a trainer modal.', () => {
    const Wrapper = funCompWrapper(fromModal("TR0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    expect(component.find(TrainerModal)).to.have.lengthOf(1);
  });
});

describe("To Modal", () => {
  it('If invite is from a client then open a client modal.', () => {
    const Wrapper = funCompWrapper(toModal("CL0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    console.log(component.text());

    expect(component.find(ClientModal)).to.have.lengthOf(1);
  });

  it('If invite is from a trainer then open a trainer modal.', () => {
    const Wrapper = funCompWrapper(toModal("TR0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    expect(component.find(TrainerModal)).to.have.lengthOf(1);
  });

  it('If invite is to an event then open an event modal.', () => {
    const Wrapper = funCompWrapper(toModal("EV0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    //console.log(component.text());

    expect(component.find(EventDescriptionModal)).to.have.lengthOf(1);
  });

  it('If invite is to a challenge then open a challenge modal.', () => {
    const Wrapper = funCompWrapper(toModal("CH0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    expect(component.find(ChallengeDescriptionModal)).to.have.lengthOf(1);
  });

  it('If invite is to a group then open a group modal.', () => {
    const Wrapper = funCompWrapper(toModal("GR0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    //console.log(component.text());

    expect(component.find(GroupDescriptionModal)).to.have.lengthOf(1);
  });
});

describe("About Modal", () => {
  it('If invite is from a client then open a client modal.', () => {
    const Wrapper = funCompWrapper(aboutModal("CL0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    expect(component.find(ClientModal)).to.have.lengthOf(1);
  });

  it('If invite is about a trainer then open a trainer modal.', () => {
    const Wrapper = funCompWrapper(aboutModal("TR0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    expect(component.find(TrainerModal)).to.have.lengthOf(1);
  });

  it('If invite is about an event then open an event modal.', () => {
    const Wrapper = funCompWrapper(aboutModal("EV0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    //console.log(component.text());

    expect(component.find(EventDescriptionModal)).to.have.lengthOf(1);
  });

  it('If invite is about a challenge then open a challenge modal.', () => {
    const Wrapper = funCompWrapper(aboutModal("CH0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    expect(component.find(ChallengeDescriptionModal)).to.have.lengthOf(1);
  });

  it('If invite is about a group then open a group modal.', () => {
    const Wrapper = funCompWrapper(aboutModal("GR0001", false, () => {
    }));

    const component = shallow(<Wrapper/>);

    //console.log(component.text());

    expect(component.find(GroupDescriptionModal)).to.have.lengthOf(1);
  });
});

describe("Get Invite Details", () => {
  describe("Friend Request", () => {
    it("Header Shows Correct Name", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "friendRequest"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, () => {
        }, false, (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("CardHeader").render().text()).equal("Sleeny");
    });
  });

  describe("Event Invite", () => {
    it("Correct event title shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "eventInvite"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, (title) => {
          return "Event 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("FeedUser").at(0).render().text()).equal("Event 1");
    });

    it("Correct user name shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "eventInvite"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, (title) => {
          return "Event 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("FeedUser").at(1).render().text()).equal("Sleeny");
    });
  });

  describe("Challenge Invite", () => {
    it("Correct user name in header shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "challengeInvite"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, (title) => {
          return "Event 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("CardHeader").render().text()).equal("Sleeny");
    });

    it("Correct user name shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "challengeInvite"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, (title) => {
          return "Challenge 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("FeedUser").render().text()).equal("Challenge 1");
    });
  });

  describe("Group Invite", () => {
    it("Correct user name in header shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "groupInvite"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, (title) => {
          return "Group 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("CardHeader").render().text()).equal("Sleeny");
    });

    it("Correct user name shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "groupInvite"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, (title) => {
          return "Group 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("FeedUser").render().text()).equal("Group 1");
    });
  });

  describe("Event Request", () => {
    it("Correct user name is shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "eventRequest"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, (title) => {
          return "Event 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("FeedUser").at(0).render().text()).equal("Event 1");
    });

    it("Correct title is shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "eventRequest"
        },
        (name) => {
          return "Sleeny"
        }, () => {
          return "Blinky"
        }, (title) => {
          return "Group 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("FeedUser").at(1).render().text()).equal("Blinky");
    });
  });

  describe("Challenge Request", () => {
    it("Correct user name is shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "challengeRequest"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, (title) => {
          return "Event 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("CardHeader").render().text()).equal("Sleeny");
    });

    it("Correct title is shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "challengeRequest"
        },
        (name) => {
          return "Sleeny"
        }, () => {
          return "Blinky"
        }, (title) => {
          return "Challenge 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("FeedUser").render().text()).equal("Blinky");
    });
  });

  describe("Group Request", () => {
    it("Correct user name is shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "groupRequest"
        },
        (name) => {
          return "Sleeny"
        }, () => {
        }, (title) => {
          return "Event 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("FeedUser").at(0).render().text()).equal("Sleeny");
    });

    it("Correct title is shown", () => {
      const Wrapper = funCompWrapper(getInviteDetails("CL001", (string) => {
          return "groupRequest"
        },
        (name) => {
          return "Sleeny"
        }, () => {
          return "Blinky"
        }, (title) => {
          return "Challenge 1"
        }, false,
        (string, func, funct) => {
        }, () => {
        }, () => {
          return false
        },
        () => {
          return false
        }, () => {
        }, false, () => {
        }));

      const component = shallow(<Wrapper/>);

      expect(component.find("FeedUser").at(1).render().text()).equal("Blinky");
    });
  });
});

describe("Invite Card", () => {
  // States ~
  describe("States", () => {
    // Here you check the state of the component, like the shown text and sub-components for the component.
    // Make sure you go into all the conditions of the component so that you test every possible state of the
    // component.
    // EXAMPLE: it("Shows the spinner when no post is passed in");

    it("Invite Card displays spinner if there is no name attribute in the post owner", () => {
      const component = shallow(<InviteCard invite={null} store={store()}/>).shallow();

      expect(component.find("Spinner")).to.have.lengthOf(1);
    });

    //TODO: Can't test state with invite because props.user.id gets confused with the double shallow call :(
  });
});
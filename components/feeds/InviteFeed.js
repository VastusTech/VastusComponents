import React, {useState, useEffect, Fragment} from 'react'
import _ from 'lodash'
import {Dimmer, Message} from 'semantic-ui-react'
import InviteCard, {InviteCardInfo} from "../cards/InviteCard";
import {fetchUserAttributes, forceFetchUserAttributes} from "../../redux/actions/userActions";
import {connect} from 'react-redux';
import {
  fetchInvite,
  fetchEvent,
  fetchChallenge,
  fetchGroup,
  fetchClient,
  fetchTrainer
} from "../../redux/convenience/cacheItemTypeActions";
import {getItemTypeFromID} from "../../logic/ItemType";
import {err, log} from "../../../Constants";
import Spinner from "../props/Spinner";

/**
 * Fetches the about and from info for an invite so that the InviteCard can properly display the information.
 *
 * @param {Invite} invite The invite object to fetch the info for.
 * @param {function(string, [string])} fetchClient The function to fetch a Client from the database.
 * @param {function(string, [string])} fetchTrainer The function to fetch a Trainer from the database.
 * @param {function(string, [string])} fetchEvent The function to fetch an Event from the database.
 * @param {function(string, [string])} fetchChallenge The function to fetch a Challenge from the database.
 * @param {function(string, [string])} fetchGroup The function to fetch a Group from the database.
 */
const fetchAboutAndFromInfo = (invite, fetchClient, fetchTrainer, fetchEvent, fetchChallenge, fetchGroup) => {
  // TODO We don't need this much stuff....
  if (invite && invite.from && invite.to && invite.inviteType && invite.about) {
    // Fetch from user information
    const fromItemType = getItemTypeFromID(invite.from);
    if (fromItemType === "Client") {
      fetchClient(invite.from, InviteCardInfo.fromInfo.clientFetchList);
    } else if (fromItemType === "Trainer") {
      fetchTrainer(invite.from, InviteCardInfo.fromInfo.trainerFetchList);
    } else if (fromItemType === "Gym") {
      // TODO FETCH THIS?
      log && console.log("not implemented!");
    } else {
      log && console.error("ITEM TYPE NOT RECOGNIZED FOR INVITE?");
    }

    const toItemType = getItemTypeFromID(invite.to);
    if (toItemType === "Client") {
      fetchClient(invite.to, InviteCardInfo.toInfo.clientFetchList);
    } else if (toItemType === "Trainer") {
      fetchTrainer(invite.to, InviteCardInfo.toInfo.trainerFetchList);
    } else if (toItemType === "Gym") {
      // TODO FETCH THIS?
      log && console.log("not implemented!");
    } else if (toItemType === "Event") {
      fetchEvent(invite.to, InviteCardInfo.toInfo.eventFetchList);
    } else if (toItemType === "Challenge") {
      fetchChallenge(invite.to, InviteCardInfo.toInfo.challengeFetchList);
    } else if (toItemType === "Group") {
      fetchGroup(invite.to, InviteCardInfo.toInfo.groupFetchList);
    } else {
      err && console.error("ITEM TYPE NOT RECOGNIZED FOR INVITE?");
    }
    // Fetch about item information
    const aboutItemType = getItemTypeFromID(invite.about);
    if (aboutItemType === "Client") {
      fetchClient(invite.about, InviteCardInfo.aboutInfo.clientFetchList);
    } else if (aboutItemType === "Trainer") {
      fetchTrainer(invite.about, InviteCardInfo.aboutInfo.trainerFetchList);
    } else if (aboutItemType === "Gym") {
      // TODO FETCH THIS?
      log && console.log("not implemented!");
    } else if (aboutItemType === "Event") {
      fetchEvent(invite.about, InviteCardInfo.aboutInfo.eventFetchList);
    } else if (aboutItemType === "Challenge") {
      fetchChallenge(invite.about, InviteCardInfo.aboutInfo.challengeFetchList);
    } else if (aboutItemType === "Group") {
      fetchGroup(invite.about, InviteCardInfo.aboutInfo.groupFetchList);
    } else {
      err && console.error("ITEM TYPE NOT RECOGNIZED FOR INVITE?");
    }
  } else {
    // TODO FIll in the invite with bum info?
  }
};

/*
* NotificationCard Feed
*
* This is a feed which contains all of the buddy (friend) requests that have been sent to the current user.
 */
const InviteFeed = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (props.user.id) {
      setIsLoading(true);
      props.fetchUserAttributes(["receivedInvites", "ownedEvents", "ownedChallenges", "ownedGroups"], () => {
        setIsLoading(false);
      });
    }
  }, [props.user.id]);

  useEffect(() => {
    const fetchAndAddInvite = (inviteID) => {
      props.fetchInvite(inviteID, InviteCardInfo.fetchList, (data) => {
        setNotifications(p => [
          ...p,
          data
        ]);
        fetchAboutAndFromInfo(data, props.fetchClient, props.fetchTrainer, props.fetchEvent,
          props.fetchChallenge, props.fetchGroup);
        setIsLoading(false);
      });
    };
    const fetchAndAddReceivedInvites = (itemType, id) => {
      let fetchFunction;
      if (itemType === "Event") {
        fetchFunction = props.fetchEvent;
      }
      if (itemType === "Challenge") {
        fetchFunction = props.fetchChallenge;
      }
      if (itemType === "Group") {
        fetchFunction = props.fetchGroup;
      }
      fetchFunction(id, ["receivedInvites"], (data) => {
        if (data.receivedInvites && data.receivedInvites.length > 0) {
          for (let i = 0; i < data.receivedInvites.length; i++) {
            fetchAndAddInvite(data.receivedInvites[i]);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
    };
    setNotifications([]);
    const user = props.user;
    if (user.hasOwnProperty("receivedInvites") && user.receivedInvites) {
      for (let i = 0; i < user.receivedInvites.length; i++) {
        setIsLoading(true);
        fetchAndAddInvite(user.receivedInvites[i]);
      }
    }
    if (user.hasOwnProperty("ownedEvents") && user.ownedEvents) {
      for (let i = 0; i < user.ownedEvents.length; i++) {
        setIsLoading(true);
        fetchAndAddReceivedInvites("Event", user.ownedEvents[i]);
      }
    }
    if (user.hasOwnProperty("ownedChallenges") && user.ownedChallenges) {
      for (let i = 0; i < user.ownedChallenges.length; i++) {
        setIsLoading(true);
        fetchAndAddReceivedInvites("Challenge", user.ownedChallenges[i]);
      }
    }
    if (user.hasOwnProperty("ownedGroups") && user.ownedGroups) {
      for (let i = 0; i < user.ownedGroups.length; i++) {
        setIsLoading(true);
        fetchAndAddReceivedInvites("Group", user.ownedGroups[i]);
      }
    }
  }, [props.user.receivedInvites, props.user.ownedEvents, props.user.ownedChallenges, props.user.ownedGroups]);

  //The buddy requests consists of a profile picture with the name of the user who has sent you a request.
  //To the right of the request is two buttons, one to accept and one to deny the current request.
  if (isLoading) {
    return (
      <Dimmer>
        <Spinner/>
      </Dimmer>
    );
  }
  if (notifications && notifications.length && notifications.length > 0) {
    return (
      <Fragment>
        {_.times(notifications.length, i => (
          <InviteCard key={i} invite={notifications[i]}/>
        ))}
      </Fragment>
    );
  } else {
    return (
      <Message>
        <div align="center">No Notifications!</div>
      </Message>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserAttributes: (attributesList, dataHandler) => {
      dispatch(fetchUserAttributes(attributesList, dataHandler));
    },
    forceFetchUserAttributes: (attributeList) => {
      dispatch(forceFetchUserAttributes(attributeList));
    },
    fetchInvite: (id, variablesList, dataHandler) => {
      dispatch(fetchInvite(id, variablesList, dataHandler));
    },
    fetchClient: (id, variablesList) => {
      dispatch(fetchClient(id, variablesList));
    },
    fetchTrainer: (id, variablesList) => {
      dispatch(fetchTrainer(id, variablesList));
    },
    fetchEvent: (id, variablesList, dataHandler) => {
      dispatch(fetchEvent(id, variablesList, dataHandler));
    },
    fetchChallenge: (id, variablesList, dataHandler) => {
      dispatch(fetchChallenge(id, variablesList, dataHandler));
    },
    fetchGroup: (id, variablesList, dataHandler) => {
      dispatch(fetchGroup(id, variablesList, dataHandler));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteFeed);


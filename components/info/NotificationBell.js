import React, {useState, useEffect} from 'react'
import {Icon, Grid} from 'semantic-ui-react'
import {fetchUserAttributes, forceFetchUserAttributes} from "../../redux/actions/userActions";
import {connect} from 'react-redux';
import {fetchChallenge, fetchEvent, fetchGroup, fetchInvite} from "../../redux/convenience/cacheItemTypeActions";

/**
 * Displays the notification info about the User, specifically how many pending notifications the User has.
 *
 * @param {{}} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const NotificationBell = (props) => {
  const [numNotifications, setNumNotifications] = useState(0);

  useEffect(() => {
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
        if (data.hasOwnProperty("receivedInvites") && data.receivedInvites) {
          setNumNotifications((prevNumNotifications) => (prevNumNotifications + data.receivedInvites.length));
        }
      });
    };
    const data = props.user;
    if (data) {
      if (data.hasOwnProperty("receivedInvites") && data.receivedInvites) {
        setNumNotifications((prevNumNotifications) => (prevNumNotifications + data.receivedInvites.length));
      }
      if (data.hasOwnProperty("ownedEvents") && data.ownedEvents) {
        for (let i = 0; i < data.ownedEvents.length; i++) {
          fetchAndAddReceivedInvites("Event", data.ownedEvents[i]);
        }
      }
      if (data.hasOwnProperty("ownedChallenges") && data.ownedChallenges) {
        // console.log("Grabbing " + data.ownedChallenges.length + " challenges for notification bell");
        for (let i = 0; i < data.ownedChallenges.length; i++) {
          fetchAndAddReceivedInvites("Challenge", data.ownedChallenges[i]);
        }
      }
      if (data.hasOwnProperty("ownedGroups") && data.ownedGroups) {
        for (let i = 0; i < data.ownedGroups.length; i++) {
          fetchAndAddReceivedInvites("Group", data.ownedGroups[i]);
        }
      }
    }
    return () => {
      setNumNotifications(0);
    }
  }, [props.user.receivedInvites, props.user.ownedEvents, props.user.ownedChallenges, props.user.ownedGroups]);

  const {fetchInvite, fetchGroup, fetchChallenge, fetchEvent, forceFetchUserAttributes, fetchUserAttributes, ...otherProps} = props;
  if (numNotifications > 0) {
    return (
      <Grid style={{marginTop: "6px"}} centered>
        <div {...otherProps}>
          <Icon name='bell' size='big'/>
          {numNotifications}
        </div>
      </Grid>
    );
  } else {
    return (
      <Grid style={{marginTop: "6px"}} centered>
        <div {...otherProps}>
          <Icon name='bell outline' size='big'/>
        </div>
      </Grid>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
  info: state.info
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserAttributes: (attributesList, dataHandler) => {
      dispatch(fetchUserAttributes(attributesList, dataHandler));
    },
    forceFetchUserAttributes: (attributeList) => {
      dispatch(forceFetchUserAttributes(attributeList));
    },
    fetchEvent: (id, variablesList, dataHandler) => {
      dispatch(fetchEvent(id, variablesList, dataHandler));
    },
    fetchChallenge: (id, variablesList, dataHandler) => {
      dispatch(fetchChallenge(id, variablesList, dataHandler));
    },
    fetchGroup: (id, variablesList, dataHandler) => {
      dispatch(fetchGroup(id, variablesList, dataHandler));
    },
    fetchInvite: (id, variablesList, dataHandler) => {
      dispatch(fetchInvite(id, variablesList, dataHandler));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBell);

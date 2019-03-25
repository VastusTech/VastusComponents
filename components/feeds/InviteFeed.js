import React, {useState, useEffect, Fragment} from 'react'
import _ from 'lodash'
import {Dimmer, Loader, Message, Grid} from 'semantic-ui-react'
import InviteCard from "../cards/InviteCard";
import {fetchUserAttributes, forceFetchUserAttributes} from "../../../redux_helpers/actions/userActions";
import {connect} from 'react-redux';
import {
    fetchInvite,
    fetchEvent,
    fetchChallenge,
    fetchGroup,
    fetchClient,
    fetchTrainer
} from "../../redux_actions/cacheActions";
import {getItemTypeFromID} from "../../logic/ItemType";
import {err, log} from "../../../Constants";

const fetchAboutAndFromInfo = (invite, fetchClient, fetchTrainer, fetchEvent, fetchChallenge, fetchGroup) => {
    // TODO We don't need this much stuff....
    if (invite && invite.from && invite.to && invite.inviteType && invite.about) {
        // Fetch from user information
        const fromItemType = getItemTypeFromID(invite.from);
        if (fromItemType === "Client") {
            fetchClient(invite.from, ["id", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath"]);
        } else if (fromItemType === "Trainer") {
            fetchTrainer(invite.from, ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"]);
        } else if (fromItemType === "Gym") {
            // TODO FETCH THIS?
            log&&console.log("not implemented!");
        } else {
            log&&console.error("ITEM TYPE NOT RECOGNIZED FOR INVITE?");
        }

        const toItemType = getItemTypeFromID(invite.to);
        if (toItemType === "Client") {
            fetchClient(invite.to, ["id", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath"]);
        } else if (toItemType === "Trainer") {
            fetchTrainer(invite.to, ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"]);
        } else if (toItemType === "Gym") {
            // TODO FETCH THIS?
            log&&console.log("not implemented!");
        } else if (toItemType === "Event") {
            fetchEvent(invite.to, ["id", "title", "time", "time_created", "owner", "members", "capacity", "difficulty"]);
        } else if (toItemType === "Challenge") {
            fetchChallenge(invite.to, ["id", "title", "endTime", "time_created", "owner", "members", "capacity", "difficulty"]);
        } else if (toItemType === "Group") {
            // TODO FETCH THIS?
            log&&console.log("not implemented!");
        } else {
            err&&console.error("ITEM TYPE NOT RECOGNIZED FOR INVITE?");
        }
        // Fetch about item information
        const aboutItemType = getItemTypeFromID(invite.about);
        if (aboutItemType === "Client") {
            fetchClient(invite.about, ["id", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath"]);
        } else if (aboutItemType === "Trainer") {
            fetchTrainer(invite.about, ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"]);
        } else if (aboutItemType === "Gym") {
            // TODO FETCH THIS?
            log&&console.log("not implemented!");
        } else if (aboutItemType === "Event") {
            fetchEvent(invite.about, ["id", "title", "time", "time_created", "owner", "members", "capacity", "difficulty", "restriction"]);
        } else if (aboutItemType === "Challenge") {
            fetchChallenge(invite.about, ["id", "title", "endTime", "time_created", "owner", "members", "capacity", "difficulty", "restriction"]);
        } else if (aboutItemType === "Group") {
            // TODO FETCH THIS?
            log&&console.log("not implemented!");
        } else {
            err&&console.error("ITEM TYPE NOT RECOGNIZED FOR INVITE?");
        }
    }
    else {
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
            const fetchAndAddInvite = (inviteID) => {
                props.fetchInvite(inviteID, InviteCard.fetchVariableList, (data) => {
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
                if (itemType === "Event") { fetchFunction = props.fetchEvent; }
                if (itemType === "Challenge") { fetchFunction = props.fetchChallenge; }
                if (itemType === "Group") { fetchFunction = props.fetchGroup; }
                fetchFunction(id, ["receivedInvites"], (data) => {
                    if (data.hasOwnProperty("receivedInvites") && data.receivedInvites) {
                        for (let i = 0; i < data.receivedInvites.length; i++) {
                            fetchAndAddInvite(data.receivedInvites[i]);
                        }
                    }
                });
            };
            setIsLoading(true);
            props.fetchUserAttributes(["receivedInvites", "ownedEvents", "ownedChallenges", "ownedGroups"], (data) => {
                if (data) {
                    if (data.hasOwnProperty("receivedInvites") && data.receivedInvites) {
                        for (let i = 0; i < data.receivedInvites.length; i++) {
                            fetchAndAddInvite(data.receivedInvites[i]);
                        }
                    }
                    if (data.hasOwnProperty("ownedEvents") && data.ownedEvents) {
                        for (let i = 0; i < data.ownedEvents.length; i++) {
                            fetchAndAddReceivedInvites("Event", data.ownedEvents[i]);
                        }
                    }
                    if (data.hasOwnProperty("ownedChallenges") && data.ownedChallenges) {
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
                else {
                    setIsLoading(false);
                }
            });
        }
    }, [props.user.id]);

    //The buddy requests consists of a profile picture with the name of the user who has sent you a request.
    //To the right of the request is two buttons, one to accept and one to deny the current request.
    if (isLoading) {
        return(
            <Dimmer>
                <Loader/>
            </Dimmer>
        );
    }
    if (notifications && notifications.length && notifications.length > 0) {
        return(
            <Fragment>
                {_.times(notifications.length, i => (
                    <InviteCard inviteID={notifications[i].id}/>
                ))}
            </Fragment>
        );
    }
    else {
        return(
            <Message><div align="center">No Notifications!</div></Message>
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


import React, {useState} from 'react'
import {Image, Button, Card, Feed, Divider, Dimmer} from 'semantic-ui-react'
import ClientModal from "../modals/ClientModal";
import TrainerModal from "../modals/TrainerModal";
import EventDescriptionModal from "../modals/EventDescriptionModal";
import ChallengeDescriptionModal from "../modals/ChallengeDescriptionModal";
import { connect } from "react-redux";
import UserFunctions from "../../database_functions/UserFunctions";
import InviteFunctions from "../../database_functions/InviteFunctions";
import EventFunctions from "../../database_functions/EventFunctions";
import ChallengeFunctions from "../../database_functions/ChallengeFunctions";
import {getItemTypeFromID, switchReturnItemType} from "../../logic/ItemType";
import Spinner from "../props/Spinner";
import {getAttributeFromObject, getObjectAttribute} from "../../logic/CacheRetrievalHelper";
import {err} from "../../../Constants";
import GroupFunctions from "../../database_functions/GroupFunctions";
import GroupDescriptionModal from "../modals/GroupDescriptionModal";
import type Invite from "../../types/Invite";

/**
 * All of the different fetchLists used for the different types of cards.
 *
 * @type {{fetchList: string[], fromInfo: {clientFetchList: string[], trainerFetchList: string[]},
 * toInfo: {clientFetchList: string[], trainerFetchList: string[], eventFetchList: string[],
 * challengeFetchList: string[], groupFetchList: string[]}, aboutInfo: {clientFetchList: string[],
 * trainerFetchList: string[], eventFetchList: string[], challengeFetchList: string[], groupFetchList: string[]},
 * ifSubscribe: boolean}}
 */
export const InviteCardInfo = {
    fetchList: ["time_created", "from", "to", "inviteType", "about", "description"],
    fromInfo: {
        clientFetchList: ["id", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath"],
        trainerFetchList: ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"],
    },
    toInfo: {
        clientFetchList: ["id", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath"],
        trainerFetchList: ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"],
        eventFetchList: ["id", "title", "time", "time_created", "owner", "members", "capacity", "difficulty", "restriction"],
        challengeFetchList: ["id", "title", "endTime", "time_created", "owner", "members", "capacity", "difficulty", "restriction"],
        groupFetchList: ["id", "title"],
    },
    aboutInfo: {
        clientFetchList: ["id", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath"],
        trainerFetchList: ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"],
        eventFetchList: ["id", "title", "time", "time_created", "owner", "members", "capacity", "difficulty", "restriction"],
        challengeFetchList: ["id", "title", "endTime", "time_created", "owner", "members", "capacity", "difficulty", "restriction"],
        groupFetchList: ["id", "title"],
    },
    ifSubscribe: false
};

type Props = {
    invite: Invite
};

/**
 * Checks if the request contains all of the ids it requires.
 *
 * @param {string} userID The current user's id.
 * @param {string} inviteID The id that represents the invite itself.
 * @param {string} aboutID The id of the attribute that the request references.
 * @param {string} fromID The id of the user that is sending the request.
 * @param {string} toID The id of the user that the request is being sent to.
 * @returns {*} The React JSX used to display the component.
 */
export const isValidRequest = (userID, inviteID, aboutID, fromID, toID) => (userID && inviteID && aboutID && fromID && toID);

/**
 * Checks if the response has all of the necessary props.
 *
 * @param {string} userID The current user's id.
 * @param {string} inviteID The id that represents the invite itself.
 * @param {string} aboutID The id of the attribute that the request references.
 * @param {string} fromID The id of the user that is sending the request.
 * @param {string} toID The id of the user that the request is being sent to.
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 * @param {function()} responseHandler {string}
 */
export const checkResponse = (userID, inviteID, aboutID, fromID, toID, setIsLoading, responseHandler) => {
    setIsLoading(true);
    if (isValidRequest(userID, inviteID, aboutID, fromID, toID)) {
        responseHandler(() => {
            // this.props.feedUpdate();
            setIsLoading(false);
        }, (error) => {
            console.log(error);
            setIsLoading(false);
        });
    }
    else {
        err&&console.error("Request doesn't have all the necessary props!");
        setIsLoading(false);
    }
};

/**
 * The action for deleting requests.
 *
 * @param {string} userID The current user's id.
 * @param {string} inviteID The id that represents the invite itself.
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 */
const deleteRequest = (userID, inviteID, setIsLoading) => {
    checkResponse(userID, inviteID, {}, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        InviteFunctions.delete(userID, inviteID, successHandler, failureHandler);
    });
};

/**
 * Accepts a friend request for the current user.
 *
 * @param {string} userID The current user's id.
 * @param {string} aboutID The id of the user that the request is being sent to
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 */
const handleAcceptFriendRequest = (userID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        UserFunctions.addFriend(userID, userID, aboutID, successHandler, failureHandler);
    });
};

/**
 * Declines a friend request for the current user.
 *
 * @type {deleteRequest}
 */
const handleDeclineFriendRequest = deleteRequest;

/**
 * Accepts the invite to an event for the current user.
 *
 * @param {string} userID The current user's id.
 * @param {string} aboutID The id of the user that the request is being sent to
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 */
const handleAcceptEventInvite = (userID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        UserFunctions.addEvent(userID, userID, aboutID, successHandler, failureHandler);
    });
};

/**
 * Declines an invite to an event for the current user.
 *
 * @type {deleteRequest}
 */
const handleDeclineEventInvite = deleteRequest;

/**
 * Accepts invite to challenge for current user.
 *
 * @param {string} userID The current user's id.
 * @param {string} aboutID The id of the user that the request is being sent to
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 */
const handleAcceptChallengeInvite = (userID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        UserFunctions.addChallenge(userID, userID, aboutID, successHandler, failureHandler);
    });
};

/**
 * Declines invite to challenge for current user.
 *
 * @type {deleteRequest}
 */
const handleDeclineChallengeInvite = deleteRequest;

/**
 * Accepts the invite to a group for the current user.
 *
 * @param {string} userID The current user's id.
 * @param {string} aboutID The id of the group that corresponds to the invite.
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 */
const handleAcceptGroupInvite = (userID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        UserFunctions.addGroup(userID, userID, aboutID, successHandler, failureHandler);
    });
};

/**
 * Declines an invite to a group for the current user.
 *
 * @type {deleteRequest}
 */
const handleDeclineGroupInvite = deleteRequest;

/**
 * Accepts the request to a event to an event for the current user.
 *
 * @param {string} userID The current user's id.
 * @param {string} toID The id of the user that the event request is being sent to.
 * @param {string} aboutID The id of the event that corresponds to the request.
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 */
const handleAcceptEventRequest = (userID, toID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, toID, setIsLoading, (successHandler, failureHandler) => {
        EventFunctions.addMember(userID, toID, aboutID, successHandler, failureHandler);
    });
};

/**
 * Declines an invite to an event for the current user.
 *
 * @type {deleteRequest}
 */
const handleDeclineEventRequest = deleteRequest;

/**
 * Accepts a challenge invite for the current user.
 *
 * {string} userID The current user's id.
 * @param {string} toID The id of the user that the event request is being sent to.
 * @param {string} aboutID The id of the event that corresponds to the request.
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 */
const handleAcceptChallengeRequest = (userID, toID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, toID, setIsLoading, (successHandler, failureHandler) => {
        ChallengeFunctions.addMember(userID, toID, aboutID, successHandler, failureHandler);
    });
};

/**
 * Declines a challenge invite for the current user.
 *
 * @type {deleteRequest}
 */
const handleDeclineChallengeRequest = deleteRequest;

/**
 * Accepts a group invite for the current user.
 *
 * @param {string} userID The id of the author.
 * @param {string} toID The id of the user being sent the invite.
 * @param {string} aboutID The id of the group that the user is being invited to.
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 */
const handleAcceptGroupRequest = (userID, toID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, toID, setIsLoading, (successHandler, failureHandler) => {
        GroupFunctions.addMember(userID, toID, aboutID, successHandler, failureHandler);
    });
};

/**
 * Declines a group invite for the current user.
 *
 * @type {deleteRequest}
 */
const handleDeclineGroupRequest = deleteRequest;

/**
 * Displays the modal of the user who sent the invite.
 *
 * @param {string} fromID The id of the user who sent the invite.
 * @param {boolean} fromModalOpen Determines if the modal of the sender is open or not
 * @param {function()} setFromModalOpen Sets the open attribute of the from modal to open.
 * @returns {*} The React JSX used to display the component.
 */
export const fromModal = (fromID, fromModalOpen, setFromModalOpen) => {
    const fromItemType = getItemTypeFromID(fromID);
    return switchReturnItemType(fromItemType,
        <ClientModal open={fromModalOpen} onClose={() => setFromModalOpen(false)}
                     clientID={fromID}/>,
        <TrainerModal trainerID={fromID} open={fromModalOpen}
                      onClose={() => setFromModalOpen(false)}/>,
        null, null, null, null, null, null, null, null, null, null, null, null, "INVITE FROM MODAL");
};

/**
 * The modal relating to the client that the invite is to.
 *
 * @param {string} toID The id of the client that the invite is being sent to.
 * @param {function()} toModalOpen Opens the modal for the client being sent the invite.
 * @param {function(boolean)} setToModalOpen Sets the open attribute of the to modal to true.
 * @returns {*} The React JSX used to display the component.
 */
export const toModal = (toID, toModalOpen, setToModalOpen) => {
    const toItemType = getItemTypeFromID(toID);
    return switchReturnItemType(toItemType,
        <ClientModal open={toModalOpen} onClose={() => toModalOpen(false)}
                     clientID={toID}/>,
        <TrainerModal trainerID={toID} open={toModalOpen}
                      onClose={() => setToModalOpen(false)}/>,
        null, null, null,
        <EventDescriptionModal eventID={toID} open={toModalOpen}
                               onClose={() => setToModalOpen(false)}/>,
        <ChallengeDescriptionModal challengeID={toID} open={toModalOpen}
                                   onClose={() => setToModalOpen(false)}/>,
        null, null, null,
        <GroupDescriptionModal open={toModalOpen} onClose={() => setToModalOpen(false)}
                               groupID={toID}/>,
        null, null, null, null, "INVITE TO MODAL");
};

/**
 * Displays the modal for the element that the invite is about.
 *
 * @param {String} aboutID The id of the element that the invite is about.
 * @param {function()} aboutModalOpen Opens the about modal.
 * @param {function(boolean)} setAboutModalOpen Sets the open attribute of the about modal to true.
 * @returns {*} The React JSX used to display the component.
 */
export const aboutModal = (aboutID, aboutModalOpen, setAboutModalOpen) => {
    const aboutItemType = getItemTypeFromID(aboutID);
    return switchReturnItemType(aboutItemType,
        <ClientModal open={aboutModalOpen} onClose={() => aboutModalOpen(false)}
                     clientID={aboutID}/>,
        <TrainerModal trainerID={aboutID} open={aboutModalOpen}
                      onClose={() => setAboutModalOpen(false)}/>,
        null, null, null,
        <EventDescriptionModal eventID={aboutID} open={aboutModalOpen}
                               onClose={() => setAboutModalOpen(false)}/>,
        <ChallengeDescriptionModal challengeID={aboutID} open={aboutModalOpen}
                                   onClose={() => setAboutModalOpen(false)}/>,
        null, null, null,
        <GroupDescriptionModal open={aboutModalOpen} onClose={() => setAboutModalOpen(false)}
                               groupID={aboutID}/>,
        null, null, null, null, "INVITE ABOUT MODAL");
};

/**
 * Gets the details of the invite function.
 *
 * @param {string} userID The id of the current user.
 * @param {function()} getInviteAttribute *
 * @param {function()} getFromAttribute *
 * @param {function()} getToAttribute *
 * @param {function()} getAboutAttribute *
 * @param {boolean} fromModalOpen Determines if the from modal is open.
 * @param {function(string, function(), function())} setFromModalOpen
 * @param {function()} toModalOpen Sets the open attribute of the to modal to open.
 * @param {function(boolean)} setToModalOpen Sets modal of the recipient client open attribute to true.
 * @param {function(boolean)} aboutModalOpen Sets the open attribute of the about modal to open.
 * @param {function(boolean)} setAboutModalOpen Sets the open attribute for the about model to open.
 * @param {boolean} isLoading Shows whether the invite component is loading or not.
 * @param {function(boolean)} setIsLoading Sets isLoading to the given boolean.
 * @returns {*} The React JSX used to display the component.
 */
export const getInviteDetails = (userID, getInviteAttribute, getFromAttribute, getToAttribute, getAboutAttribute,
                          fromModalOpen, setFromModalOpen, toModalOpen, setToModalOpen, aboutModalOpen,
                          setAboutModalOpen, isLoading, setIsLoading) => {
    const type = getInviteAttribute("inviteType");
    if (type === "friendRequest") {
        return [
            <Card.Content textAlign='center'>
                <Card.Header onClick={() => setFromModalOpen(true)}>
                    {getFromAttribute("name")}
                </Card.Header>
                {fromModal(getInviteAttribute("from"), fromModalOpen, setFromModalOpen)}
                <Card.Description>
                    has sent you a buddy request {/*Insert Invite Sent Time Here*/}
                </Card.Description>
            </Card.Content>,
            <Card.Content extra textAlign='center'>
                <Button.Group fluid>
                    <Button loading={isLoading} onClick={() => handleDeclineFriendRequest(userID, getInviteAttribute("id"), setIsLoading)}>Deny</Button>
                    <Button loading={isLoading} primary onClick={() => handleAcceptFriendRequest(userID, getInviteAttribute("about"), setIsLoading)}>Accept</Button>
                </Button.Group>
            </Card.Content>
        ];
    }
    else if (type === "eventInvite") {
        return [
            <Card.Content>
                <Feed>
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                You were invited to{' '}
                                <Feed.User onClick={() => setAboutModalOpen(true)}>
                                    {getAboutAttribute("title")}
                                </Feed.User>
                                {aboutModal(getInviteAttribute("about"), aboutModalOpen, setAboutModalOpen)}
                                {' '}by{' '}
                                <Feed.User onClick={() => setFromModalOpen(true)}>
                                    {getFromAttribute("name")}
                                </Feed.User>
                                {fromModal(getInviteAttribute("from"), fromModalOpen, setFromModalOpen)}
                                <Feed.Date>{/*Insert Invite Sent Time Here*/}</Feed.Date>
                            </Feed.Summary>
                            <Divider/>
                            <Feed.Extra>
                                <Button inverted loading={isLoading} disabled={isLoading} floated="right"
                                        size="small" onClick={() => handleDeclineEventInvite(userID, getInviteAttribute("id"), setIsLoading)}>Deny</Button>
                                <Button primary loading={isLoading} disabled={isLoading} floated="right"
                                        size="small" onClick={() => handleAcceptEventInvite(userID, getInviteAttribute("about"), setIsLoading)}>Accept</Button>
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </Card.Content>
        ];
    }
    else if (type === "challengeInvite") {
        return [
            <Card.Content textAlign='center'>
                <Card.Header onClick={() => setFromModalOpen(true)}>
                    {getFromAttribute("name")}
                </Card.Header>
                {fromModal(getInviteAttribute("from"), fromModalOpen, setFromModalOpen)}
                <Card.Description>
                    has invited you to {/*Insert Invite Sent Time Here*/}
                    <Feed.User onClick={setAboutModalOpen(true)}>
                        {getAboutAttribute("title")}
                    </Feed.User>
                    {aboutModal(getInviteAttribute("about"), aboutModalOpen, setAboutModalOpen)}
                </Card.Description>
            </Card.Content>,
            <Card.Content extra textAlign='center'>
                <Button.Group fluid>
                    <Button loading={isLoading} onClick={() => handleDeclineChallengeInvite(userID, getInviteAttribute("id"), setIsLoading)}>Deny</Button>
                    <Button loading={isLoading} primary onClick={() => handleAcceptChallengeInvite(userID, getInviteAttribute("about"), setIsLoading)}>Accept</Button>
                </Button.Group>
            </Card.Content>
        ];
    }
    else if (type === "groupInvite") {
        return [
            <Card.Content textAlign='center'>
                <Card.Header onClick={() => setFromModalOpen(true)}>
                    {getFromAttribute("name")}
                </Card.Header>
                {fromModal(getInviteAttribute("from"), fromModalOpen, setFromModalOpen)}
                <Card.Description>
                    has invited you to {/*Insert Invite Sent Time Here*/}
                    <Feed.User onClick={() => setAboutModalOpen(true)}>
                        {getAboutAttribute("title")}
                    </Feed.User>
                    {aboutModal(getInviteAttribute("about"), aboutModalOpen, setAboutModalOpen)}
                </Card.Description>
            </Card.Content>,
            <Card.Content extra textAlign='center'>
                <Button.Group fluid>
                    <Button loading={isLoading} onClick={() => handleDeclineGroupInvite(userID, getInviteAttribute("id"), setIsLoading)}>Deny</Button>
                    <Button loading={isLoading} primary onClick={() => handleAcceptGroupInvite(userID, getInviteAttribute("about"), setIsLoading)}>Accept</Button>
                </Button.Group>
            </Card.Content>
        ];
    }
    else if (type === "eventRequest") {
        return [
            <Card.Content>
                <Feed>
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                <Feed.User onClick={() => setFromModalOpen(true)}>
                                    {getAboutAttribute("name")}
                                </Feed.User>
                                {aboutModal(getInviteAttribute("about"), aboutModalOpen, setAboutModalOpen)}
                                Would like to join {' '}
                                <Feed.User onClick={() => setToModalOpen(true)}>
                                    {getToAttribute("title")}
                                </Feed.User>
                                {toModal(getInviteAttribute("to"), toModalOpen, setToModalOpen)}
                                <Feed.Date>{/*Insert Invite Sent Time Here*/}</Feed.Date>
                            </Feed.Summary>
                            <Divider/>
                            <Feed.Extra>
                                <Button inverted loading={isLoading} disabled={isLoading} floated="right"
                                        size="small" onClick={() => handleDeclineEventRequest(userID, getInviteAttribute("id"), setIsLoading)}>Deny</Button>
                                <Button primary loading={isLoading} disabled={isLoading} floated="right"
                                        size="small" onClick={() => handleAcceptEventRequest(userID, getInviteAttribute("to"), getInviteAttribute("about"), setIsLoading)}>Accept</Button>
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </Card.Content>
        ];
    }
    else if (type === "challengeRequest") {
        return [
            <Card.Content textAlign='center'>
                <Card.Header onClick={() => setFromModalOpen(true)}>
                    {getFromAttribute("name")}
                </Card.Header>
                {fromModal(getInviteAttribute("from"), fromModalOpen, setFromModalOpen)}
                <Card.Description>
                    would like to join {/*Insert Invite Sent Time Here*/}
                    <Feed.User onClick={() => setToModalOpen(true)}>
                        {getToAttribute("title")}
                    </Feed.User>
                    {toModal(getInviteAttribute("to"), toModalOpen, setToModalOpen)}
                </Card.Description>
            </Card.Content>,
            <Card.Content extra textAlign='center'>
                <Button.Group fluid>
                    <Button loading={isLoading} onClick={() => handleDeclineChallengeRequest(userID, getInviteAttribute("id"), setIsLoading)}>Deny</Button>
                    <Button primary loading={isLoading} onClick={() => handleAcceptChallengeRequest(userID, getInviteAttribute("to"), getInviteAttribute("about"), setIsLoading)}>Accept</Button>
                </Button.Group>
            </Card.Content>
        ]
    }
    else if (type === "groupRequest") {
        return [
            <Card.Content>
                <Feed>
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                <Feed.User onClick={() => setFromModalOpen(true)}>
                                    {getFromAttribute("name")}
                                </Feed.User>
                                {fromModal(getInviteAttribute("from"), fromModalOpen, setFromModalOpen)}
                                Would like to join {' '}
                                <Feed.User onClick={() => setToModalOpen(true)}>
                                    {getToAttribute("title")}
                                </Feed.User>
                                {toModal(getInviteAttribute("to"), toModalOpen, setToModalOpen)}
                                <Feed.Date>{/*Insert Invite Sent Time Here*/}</Feed.Date>
                            </Feed.Summary>
                            <Divider/>
                            <Feed.Extra>
                                <Button inverted loading={isLoading} disabled={isLoading} floated="right"
                                        size="small" onClick={() => handleDeclineGroupRequest(userID, getInviteAttribute("id"), setIsLoading)}>Deny</Button>
                                <Button primary loading={isLoading} disabled={isLoading} floated="right"
                                        size="small" onClick={() => handleAcceptGroupRequest(userID, getInviteAttribute("to"), getInviteAttribute("about"), setIsLoading)}>Accept</Button>
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </Card.Content>
        ];
    }
    else {
        return null;
    }
};

/**
 * The card for displaying different kinds of invites the user can receive.
 *
 * @param {Props} props The given props to the component.
 * @returns {*} The React JSX used to display the component.
 * @constructor
 */
const InviteCard = (props: Props) => {
    const [fromModalOpen, setFromModalOpen] = useState(false);
    const [toModalOpen, setToModalOpen] = useState(false);
    const [aboutModalOpen, setAboutModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getInviteAttribute = (attributeName) => {
        return getAttributeFromObject(props.invite, attributeName);
    };
    const getFromAttribute = (attributeName) => {
        return getObjectAttribute(getInviteAttribute("from"), attributeName, props.cache);
    };
    const getToAttribute = (attributeName) => {
        return getObjectAttribute(getInviteAttribute("to"), attributeName, props.cache);
    };
    const getAboutAttribute = (attributeName) => {
        return getObjectAttribute(getInviteAttribute("about"), attributeName, props.cache);
    };
    // const getTimeSinceInvite = () => {
    //     let today = new Date();
    //     let time = today.getHours();
    //     let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //     let inviteTime = getInviteAttribute("time_created");
    //     if(time > 24) {
    //         return date;
    //     }
    //     else {
    //         return inviteTime;
    //     }
    // };

    if (!props.invite) {
        return (
            <Dimmer>
                <Spinner/>
            </Dimmer>
        );
    }
    return (
        <Card fluid raised centered>
            <div className="u-container">
                <div className="u-avatar u-avatar--large u-margin-bottom--neg2 u-margin-x--auto"
                     style={{backgroundImage: `url(${getFromAttribute("profileImage")})`}}/>
            </div>
            {getInviteDetails(props.user.id, getInviteAttribute, getFromAttribute, getToAttribute, getAboutAttribute,
            fromModalOpen, setFromModalOpen, toModalOpen, setToModalOpen, aboutModalOpen, setAboutModalOpen, isLoading,
            setIsLoading)}
        </Card>
    );
};

const mapStateToProps = state => ({
    cache: state.cache,
    user: state.user
});

export default connect(mapStateToProps)(InviteCard);

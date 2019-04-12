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

/**
 * Checks if the request contains all of the ids it requires.
 *
 * @param {string} userID The current user's id.
 * @param {string} inviteID The id that represents the invite itself.
 * @param {string} aboutID The id of the attribute that the request references.
 * @param {string} fromID The id of the user that is sending the request.
 * @param {string} toID The id of the user that the request is being sent to.
 * @returns {*}
 */
const isValidRequest = (userID, inviteID, aboutID, fromID, toID) => (userID && inviteID && aboutID && fromID && toID);

/**
 * Checks if the response has all of the necessary props.
 *
 * @param {string} userID The current user's id.
 * @param {string} inviteID The id that represents the invite itself.
 * @param {string} aboutID The id of the attribute that the request references.
 * @param {string} fromID The id of the user that is sending the request.
 * @param {string} toID The id of the user that the request is being sent to.
 * @param {boolean} setIsLoading
 * @param {function()} responseHandler {string}
 */
const checkResponse = (userID, inviteID, aboutID, fromID, toID, setIsLoading, responseHandler) => {
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
 *
 * @param {string} userID The current user's id.
 * @param {string} inviteID The id that represents the invite itself.
 * @param {boolean} setIsLoading
 */
const deleteRequest = (userID, inviteID, setIsLoading) => {
    checkResponse(userID, inviteID, {}, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        InviteFunctions.delete(userID, inviteID, successHandler, failureHandler);
    });
};

/**
 *
 * @param {string} userID The current user's id.
 * @param {string} aboutID The id of the user that the request is being sent to
 * @param setIsLoading
 */
const handleAcceptFriendRequest = (userID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        UserFunctions.addFriend(userID, userID, aboutID, successHandler, failureHandler);
    });
};

/**
 *
 * @type {deleteRequest}
 */
const handleDeclineFriendRequest = deleteRequest;

/**
 *
 * @param {string} userID The current user's id.
 * @param {string} aboutID The id of the user that the request is being sent to
 * @param setIsLoading
 */
const handleAcceptEventInvite = (userID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        UserFunctions.addEvent(userID, userID, aboutID, successHandler, failureHandler);
    });
};

/**
 *
 * @type {deleteRequest}
 */
const handleDeclineEventInvite = deleteRequest;

/**
 *
 * @param {string} userID The current user's id.
 * @param {string} aboutID The id of the user that the request is being sent to
 * @param setIsLoading
 */
const handleAcceptChallengeInvite = (userID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        UserFunctions.addChallenge(userID, userID, aboutID, successHandler, failureHandler);
    });
};

/**
 *
 * @type {deleteRequest}
 */
const handleDeclineChallengeInvite = deleteRequest;

/**
 *
 * @param {string} userID The current user's id.
 * @param {string} aboutID The id of the user that the request is being sent to
 * @param setIsLoading
 */
const handleAcceptGroupInvite = (userID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, {}, setIsLoading, (successHandler, failureHandler) => {
        UserFunctions.addGroup(userID, userID, aboutID, successHandler, failureHandler);
    });
};

/**
 *
 * @type {deleteRequest}
 */
const handleDeclineGroupInvite = deleteRequest;

/**
 *
 * @param userID
 * @param toID
 * @param aboutID
 * @param setIsLoading
 */
const handleAcceptEventRequest = (userID, toID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, toID, setIsLoading, (successHandler, failureHandler) => {
        EventFunctions.addMember(userID, toID, aboutID, successHandler, failureHandler);
    });
};

/**
 *
 * @type {deleteRequest}
 */
const handleDeclineEventRequest = deleteRequest;

/**
 *
 * @param userID
 * @param toID
 * @param aboutID
 * @param setIsLoading
 */
const handleAcceptChallengeRequest = (userID, toID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, toID, setIsLoading, (successHandler, failureHandler) => {
        ChallengeFunctions.addMember(userID, toID, aboutID, successHandler, failureHandler);
    });
};

/**
 *
 * @type {deleteRequest}
 */
const handleDeclineChallengeRequest = deleteRequest;

/**
 *
 * @param userID
 * @param toID
 * @param aboutID
 * @param setIsLoading
 */
const handleAcceptGroupRequest = (userID, toID, aboutID, setIsLoading) => {
    checkResponse(userID, {}, aboutID, {}, toID, setIsLoading, (successHandler, failureHandler) => {
        GroupFunctions.addMember(userID, toID, aboutID, successHandler, failureHandler);
    });
};

/**
 *
 * @type {deleteRequest}
 */
const handleDeclineGroupRequest = deleteRequest;

/**
 *
 * @param fromID
 * @param fromModalOpen
 * @param setFromModalOpen
 * @returns {*}
 */
const fromModal = (fromID, fromModalOpen, setFromModalOpen) => {
    const fromItemType = getItemTypeFromID(fromID);
    return switchReturnItemType(fromItemType,
        <ClientModal open={fromModalOpen} onClose={() => setFromModalOpen(false)}
                     clientID={fromID}/>,
        <TrainerModal trainerID={fromID} open={fromModalOpen}
                      onClose={() => setFromModalOpen(false)}/>,
        null, null, null, null, null, null, null, null, null, null, null, null, "INVITE FROM MODAL");
};

/**
 *
 * @param toID
 * @param toModalOpen
 * @param setToModalOpen
 * @returns {*}
 */
const toModal = (toID, toModalOpen, setToModalOpen) => {
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
        null, null, null, null, "INVITE ABOUT MODAL");
};

/**
 *
 * @param aboutID
 * @param aboutModalOpen
 * @param setAboutModalOpen
 * @returns {*}
 */
const aboutModal = (aboutID, aboutModalOpen, setAboutModalOpen) => {
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
 *
 * @param userID
 * @param getInviteAttribute
 * @param getFromAttribute
 * @param getToAttribute
 * @param getAboutAttribute
 * @param fromModalOpen
 * @param setFromModalOpen
 * @param toModalOpen
 * @param setToModalOpen
 * @param aboutModalOpen
 * @param setAboutModalOpen
 * @param isLoading
 * @param setIsLoading
 * @returns {*}
 */
const getInviteDetails = (userID, getInviteAttribute, getFromAttribute, getToAttribute, getAboutAttribute,
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
                    <Feed.User onClick={setAboutModalOpen.bind(true)}>
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

type Props = {
    invite: {
        time_created: string,
        from: string,
        to: string,
        inviteType: string,
        about: string,
        description: string
    }
};

/**
 *
 * @param props
 * @returns {*}
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
    user: state.cache
});

export default connect(mapStateToProps)(InviteCard);

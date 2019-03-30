import React, { useState, useEffect, Fragment } from 'react';
import {Icon, Modal, Button, Divider, Grid, Message, Image, Tab, Dimmer, Label, Loader } from 'semantic-ui-react';
import ClientModal from "./ClientModal";
import { connect } from 'react-redux';
import {
    fetchClient,
    fetchTrainer,
    forceFetchChallenge,
    fetchChallenge,
    clearChallengeQuery,
    subscribeFetchChallenge
} from "../../redux_actions/cacheActions";
import CompleteChallengeModal from "../manager/CompleteChallengeModal";
import {forceFetchUserAttributes} from "../../../redux_helpers/actions/userActions";
import CommentScreen from "../messaging/MessageBoard";
import UserFunctions from "../../database_functions/UserFunctions";
import InviteFunctions from "../../database_functions/InviteFunctions";
import ChallengeFunctions from "../../database_functions/ChallengeFunctions";
import CreateSubmissionModal from "./CreateSubmissionModal";
// import SubmissionsScreen from "../lists/SubmissionsScreen";
import {getItemTypeFromID} from "../../logic/ItemType";
import DatabaseObjectList from "../lists/DatabaseObjectList";
import SubmissionList from "../lists/SubmissionList";
import {getObjectAttribute} from "../../logic/CacheRetrievalHelper";
import {daysLeft, parseISOString} from "../../logic/TimeHelper";
import TrainerModal from "./TrainerModal";
import Spinner from "../props/Spinner";

export const ChallengeDescriptionModalInfo = {
    // TODO Contains everything that is referenced here
    fetchList: ["id", "item_type", "title", "endTime", "ifCompleted", "tags", "time_created", "capacity", "members", "memberRequests", "prize", "goal", "owner", "access", "restriction", "submissions"],
    ifSubscribe: true,
};

type Props = {
    open: boolean,
    onClose: any,
    challengeID: string
};

const displayTagIcons = (tags) => {
    if (tags) {
        if (tags.length === 1) {
            return (
                <Image avatar src={require('../../img/' + tags[0] + '_icon.png')}/>
            );
        }
        else if (tags.length === 2) {
            return (
                <div>
                    <Image avatar src={require('../../img/' + tags[0] + '_icon.png')}/>
                    <Image avatar src={require('../../img/' + tags[1] + '_icon.png')}/>
                </div>
            );
        }
        else if (tags.length === 3) {
            return(
                <div>
                    <Image avatar src={require('../../img/' + tags[0] + '_icon.png')}/>
                    <Image avatar src={require('../../img/' + tags[1] + '_icon.png')}/>
                    <Image avatar src={require('../../img/' + tags[2] + '_icon.png')}/>
                </div>
            );
        }
        else if (tags.length === 4) {
            return(
                <div>
                    <Image avatar src={require('../../img/' + tags[0] + '_icon.png')}/>
                    <Image avatar src={require('../../img/' + tags[1] + '_icon.png')}/>
                    <Image avatar src={require('../../img/' + tags[2] + '_icon.png')}/>
                    <Image avatar src={require('../../img/' + tags[3] + '_icon.png')}/>
                </div>
            );
        }
    }
    else {
        return (
            // "There ain't no tags round these parts partner " + tags
            null
        );
    }
};

const handleDeleteChallengeButton = (userID, challengeID, setIsLoading, onClose) => {
    //console.log("Handling deleting the event");
    setIsLoading(true);
    ChallengeFunctions.delete(userID, challengeID, (data) => {
        // this.forceUpdate(data.id);
        // console.log(JSON.stringify(data));
        // this.setState({isLoading: false, isDeleteLoading: false, event: null, isOwned: false, isJoined: false, deleted: true});
        setIsLoading(false);
        onClose();
    }, (error) => {
        // console.log(JSON.stringify(error));
        // this.setState({isLoading: false, isDeleteLoading: false, error: error, deleted: false});
        setIsLoading(false);
    })
};

const handleLeaveChallengeButton = (userID, challengeID, setIsLoading) => {
    //console.log("Handling leaving the event");
    // this.setState({isLeaveLoading: true, isLoading: true});
    setIsLoading(true);
    UserFunctions.removeChallenge(userID, userID, challengeID, (data) => {
        setIsLoading(false);
        // this.forceUpdate(data.id);
        //console.log(JSON.stringify(data));
        // this.setState({isLoading: false, isLeaveLoading: false, isJoined: false});
    }, (error) => {
        setIsLoading(false);
        //console.log(JSON.stringify(error));
        // this.setState({isLoading: false, isLeaveLoading: false, error: error});
    })
};

const handleJoinChallengeButton = (userID, challengeID, setIsLoading) => {
    //console.log("Handling joining the event");
    // this.setState({isJoinLoading: true, isLoading: true});
    setIsLoading(true);
    UserFunctions.addChallenge(userID, userID, challengeID,
        () => {
            setIsLoading(false);
            // this.forceUpdate();
            //console.log(JSON.stringify(data));
            // this.setState({isLoading: false, isJoinLoading: false, isJoined: true});
        }, (error) => {
            setIsLoading(false);
            // this.setState({isLoading: false, isJoinLoading: false, error: error});
        });
};

const handleRequestChallengeButton = (userID, challengeID, setIsLoading) => {
    // this.setState({isRequestLoading: true, isLoading: true});
    setIsLoading(true);
    InviteFunctions.createChallengeRequest(userID, userID, challengeID,
        () => {
            setIsLoading(false);
            // this.forceUpdate();
            // this.setState({isLoading: false, isRequestLoading: false, isRequesting: true});
        }, (error) => {
            setIsLoading(false);
            // this.setState({isLoading: false, isRequestLoading: false, error: error})
        });
};

const createCorrectModal = (ownerID, ownerModalOpen, setOwnerModalOpen) => {
    const itemType = getItemTypeFromID(ownerID);
    if (itemType === "Client") {
        return (
            <ClientModal open={ownerModalOpen} onClose={() => setOwnerModalOpen(false)} clientID={ownerID}/>
        );
    }
    else if (itemType === "Trainer") {
        return (
            <TrainerModal open={ownerModalOpen} onClose={() => setOwnerModalOpen(false)} trainerID={ownerID}/>
        );
    }
    return null;
};

const createCorrectButton = (userID, challengeID, submissions, isLoading, isCompleted, isOwned, isJoined, isRestricted,
                             isRequesting, setIsLoading, setSubmitModalOpen, setCompleteModalOpen, onClose) => {
    const panes = [
        { menuItem: 'Submissions', render: () => (
                <Tab.Pane basic className='u-border--0 u-padding--0 u-margin-top--3'>
                    <SubmissionList ids={submissions} noSubmissionsMessage="No submissions yet!"/>
                </Tab.Pane>
            )},
        { menuItem: 'Challenge Chat', render: () => (
                <Tab.Pane basic className='u-border--0 u-padding--0 u-margin-top--3'>
                    <CommentScreen board={challengeID}/>
                </Tab.Pane>
            )},
    ];

    //console.log("Owned: " + isOwned + " Joined: " + isJoined);
    // console.log(ifCompleted);
    if (isCompleted) {
        return(
            <Button disabled fluid inverted size="large">This Event is completed</Button>
        );
    }
    else if (isOwned) {
        // TODO This should also link the choose winner button
        return (
            <Fragment>
                <Button primary fluid className='u-margin-bottom--1' onClick={() => setSubmitModalOpen(true)}>Submit Your Entry</Button>
                <Button primary fluid size="large" onClick={() => setCompleteModalOpen(true)}>Select Winner</Button>
                <Button loading={isLoading} fluid negative size="large" disabled={isLoading} onClick={() => handleDeleteChallengeButton(userID, challengeID, setIsLoading, onClose)}>Delete</Button>
                <Divider className='u-margin-top--4' />
                <Tab menu={{ widths: 2, inverted: true }} panes={panes} className='u-challenge u-margin-top--2' />
            </Fragment>
        )
    }
    else if (isJoined) {
        return (
            <Fragment>
                <Button primary fluid className='u-margin-bottom--1' onClick={() => setSubmitModalOpen(true)}>Submit Your Entry</Button>
                <Button loading={isLoading} fluid inverted size="large" disabled={isLoading} onClick={() => handleLeaveChallengeButton(userID, challengeID, setIsLoading)}>Leave</Button>
                <Divider className='u-margin-top--4' />
                <Tab menu={{ widths: 2, inverted: true }} panes={panes} className='u-challenge u-margin-top--2' />
            </Fragment>
        )
    }
    else if (isRestricted) {
        if (isRequesting) {
            return (
                <div>
                    <Button inverted fluid size="large" disabled={true}>Request Sent!</Button>
                </div>
            )
        }
        else {
            return (<div><Button loading={isLoading} fluid size="large" disabled={isLoading}
                                 onClick={() => handleRequestChallengeButton(userID, challengeID, setIsLoading)}>Send Join Request</Button></div>)
        }
    }
    else {
        //console.log(isJoinLoading);
        return (<Button loading={isLoading} fluid size="large" disabled={isLoading}
                        onClick={() => handleJoinChallengeButton(userID, challengeID, setIsLoading)}>Join</Button>)
    }
};

const displayError = (error) => {
    if (error === "Error while trying to update an item in the database safely. Error: The item failed the checkHandler: That challenge is already filled up!") {
        return (<Message negative>
            <Message.Header>Sorry!</Message.Header>
            <p>That challenge is already filled up!</p>
        </Message>);
    }
};

const challengeDeleted = (isDeleted) => {
    if(isDeleted) {
        return (<Message negative>
            <Message.Header>This Challenge is Deleted!</Message.Header>
        </Message>);
    }
};

/*
* Event Description Modal
*
* This is the event description which displays more in depth information about a challenge, and allows the user
* to join the challenge.
 */
const ChallengeDescriptionModal = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOwned, setIsOwned] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isRestricted, setIsRestricted] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [ownerModalOpen, setOwnerModalOpen] = useState(false);
    const [completeModalOpen, setCompleteModalOpen] = useState(false);
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const getChallengeAttribute = attribute => getObjectAttribute(props.challengeID, attribute, props.cache);
    const getOwnerAttribute = attribute => getObjectAttribute(getChallengeAttribute("owner"), attribute, props.cache);

    useEffect(() => {
        if (props.challengeID) {
            // TODO Reset state?
            props.fetchChallenge(props.challengeID, ChallengeDescriptionModalInfo.fetchList, (challenge) => {
                if (challenge) {
                    if (challenge.owner) {
                        if (challenge.owner === props.user.id) {
                            setIsOwned(true);
                        }
                        const itemType = getItemTypeFromID(challenge.owner);
                        if (itemType === "Client") {
                            props.fetchClient(challenge.owner, ["id", "name", "profileImagePath", "profileImagePaths"]);
                        }
                        else if (itemType === "Trainer") {
                            props.fetchTrainer(challenge.owner, ["id", "name", "profileImagePath", "profileImagePaths"]);
                        }
                    }
                    if (challenge.members) {
                        setIsJoined(challenge.members.includes(props.user.id));
                    }
                    if (challenge.memberRequests) {
                        setIsRequesting(challenge.memberRequests.includes(props.user.id));
                    }
                    if (challenge.restriction) {
                        setIsRestricted(challenge.restriction === "invite");
                    }
                    if (challenge.completed) {
                        setIsCompleted(challenge.completed === "true");
                    }
                }
                else {
                    setDeleted(true);
                }
            }, (error) => {

            });
        }
        return () => {
            // TODO clean up
        }
    }, [props.challengeID]);
    // const forceUpdate = () => {
    //     forceFetchChallenge(this.getChallengeAttribute("id"), ["owner",
    //         "time", "capacity", "title", "description", "difficulty", "memberIDs", "memberRequests", "access", "restriction", "prize"]);
    // };


    //This modal displays the challenge information and at the bottom contains a button which allows the user
    //to join a challenge.
    if (!getChallengeAttribute("id")) {
        return(
            <Modal open={props.open} onClose={() => props.onClose()} closeIcon>
                <Spinner loading={true}/>
            </Modal>
        );
    }
    return (
        <div>
            <Modal open={props.open} onClose={() => props.onClose()}>
                <Icon className='close' onClick={() => props.onClose()}/>
                <Modal.Header align='center'><div>
                {getChallengeAttribute("title")}</div>
                    <div>{displayTagIcons(getChallengeAttribute("tags"))}</div>
                    <div>
                        {daysLeft(parseISOString(getChallengeAttribute("endTime")))} days left
                    </div>
                    </Modal.Header>
                <Modal.Content align='center'>
                    <Grid>
                        <Grid.Row centered>
                            <Icon.Group size='large'>
                                <Icon name='bullseye' />
                            </Icon.Group> {getChallengeAttribute("goal")}
                        </Grid.Row>
                        <Grid.Row centered>
                            <div>
                                <Icon.Group size='large'>
                                    <Icon name='trophy' />
                                </Icon.Group> {getChallengeAttribute("prize")}
                            </div>
                        </Grid.Row>
                        <Grid.Column floated='left' width={6}>
                            <Grid.Row>
                                <Icon name='user'/><Button className="u-button--flat" onClick={() => setOwnerModalOpen(true)}>{getOwnerAttribute("name")}</Button>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6}>
                            <Grid.Row>
                                <Icon name='users' /><Modal trigger={<Button primary className="u-button--flat u-padding-left--1">Members</Button>} closeIcon>
                                    <Modal.Content>
                                        <DatabaseObjectList ids={getChallengeAttribute("members")}
                                                            noObjectsMessage={"No members yet!"}
                                                            acceptedItemTypes={["Client", "Trainer"]}
                                        />
                                    </Modal.Content>
                                </Modal>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                    <Divider/>
                    <Modal.Description>
                        {createCorrectModal(getChallengeAttribute("owner"), ownerModalOpen, setOwnerModalOpen)}
                        <CompleteChallengeModal open={completeModalOpen} onClose={() => setCompleteModalOpen(false)} challengeID={props.challengeID}/>
                        <CreateSubmissionModal open={submitModalOpen} onClose={() => setSubmitModalOpen(false)} challengeID={props.challengeID}/>
                        {createCorrectButton(props.user.id, props.challengeID, getChallengeAttribute("submissions"),
                            isLoading, isCompleted, isOwned, isJoined, isRestricted, isRequesting, setIsLoading,
                            setSubmitModalOpen, setCompleteModalOpen, props.onClose)}
                    </Modal.Description>
                    <div>{displayError(props.info.error)}{challengeDeleted(deleted)}</div>
                </Modal.Content>
            </Modal>
            {challengeDeleted(deleted)}
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
    info: state.info
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClient: (id, variablesList) => {
            dispatch(fetchClient(id, variablesList));
        },
        fetchTrainer: (id, variablesList) => {
            dispatch(fetchClient(id, variablesList));
        },
        forceFetchUserAttributes: (attributeList) => {
            dispatch(forceFetchUserAttributes(attributeList));
        },
        fetchChallenge: (id, variablesList, dataHandler, failureHandler) => {
            dispatch(fetchChallenge(id, variablesList, dataHandler, failureHandler));
        },
        subscribeFetchChallenge: (id, variableList, dataHandler) => {
            dispatch(subscribeFetchChallenge(id, variableList, dataHandler));
        },
        forceFetchChallenge: (id, variablesList) => {
            dispatch(forceFetchChallenge(id, variablesList));
        },
        clearChallengeQuery: () => {
            dispatch(clearChallengeQuery());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDescriptionModal);

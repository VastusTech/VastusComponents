import React, { useState, useEffect, Fragment } from 'react';
import {Icon, Modal, Button, Divider, Grid, Message, Image, Tab, Header, Popup} from 'semantic-ui-react';
import ClientModal from "./ClientModal";
import { connect } from 'react-redux';
import {
    fetchClient,
    forceFetchChallenge,
    fetchChallenge,
    subscribeFetchChallenge, fetchStreak
} from "../../redux/convenience/cacheItemTypeActions";
import CompleteChallengeModal from "../manager/CompleteChallengeModal";
import {forceFetchUserAttributes} from "../../redux/actions/userActions";
import CommentScreen from "../messaging/MessageBoard";
import UserFunctions from "../../database_functions/UserFunctions";
import InviteFunctions from "../../database_functions/InviteFunctions";
import ChallengeFunctions from "../../database_functions/ChallengeFunctions";
import CreateSubmissionModal from "../manager/CreateSubmissionModal";
import {getItemTypeFromID} from "../../logic/ItemType";
import DatabaseObjectList from "../lists/DatabaseObjectList";
import {getObjectAttribute} from "../../logic/CacheRetrievalHelper";
import {daysLeft, parseISOString} from "../../logic/TimeHelper";
import TrainerModal from "./TrainerModal";
import Spinner from "../props/Spinner";
import {ifStreakExpired} from "../../logic/StreakHelper";
import {arrayIntersection} from "../../logic/ArrayHelper";
import {err} from "../../../Constants";
import LogOutButton from "../manager/LogOutButton";
import {Card} from "semantic-ui-react/dist/commonjs/views/Card/Card";
import SubmissionList from "../lists/SubmissionList";

export const ChallengeDescriptionModalInfo = {
    // TODO Contains everything that is referenced here
    fetchList: ["id", "item_type", "title", "endTime", "ifCompleted", "tags", "time_created", "capacity", "members",
        "memberRequests", "prize", "goal", "owner", "access", "restriction", "submissions", "streaks", "challengeType",
        "streakN", "streakUpdateSpanType", "streakUpdateInterval"],
    ifSubscribe: true,
};

type Props = {
    open: boolean,
    onClose: any,
    challengeID: string
};

/**
 * TODO
 *
 * @param tags
 * @return {*}
 */
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

/**
 * TODO
 *
 * @param userID
 * @param challengeID
 * @param setIsLoading
 * @param onClose
 */
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

/**
 * TODO
 *
 * @param userID
 * @param challengeID
 * @param setIsLoading
 */
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

/**
 * TODO
 *
 * @param userID
 * @param challengeID
 * @param setIsLoading
 */
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

/**
 * TODO
 *
 * @param userID
 * @param challengeID
 * @param setIsLoading
 */
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

/**
 * TODO
 *
 * @param ownerID
 * @param ownerModalOpen
 * @param setOwnerModalOpen
 * @return {*}
 */
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

const selectWinner = (isOwned, openCompleteModal) => {
    if(isOwned) {
        return (
            <Button primary fluid onClick={openCompleteModal}>Select Winner</Button>
        );
    }
}

/**
 * TODO
 *
 * @param userID
 * @param challengeID
 * @param submissions
 * @param isLoading
 * @param isCompleted
 * @param isOwned
 * @param isJoined
 * @param isRestricted
 * @param isRequesting
 * @param setIsLoading
 * @param setSubmitModalOpen
 * @param setCompleteModalOpen
 * @param onClose
 * @return {*}
 */
const createCorrectButton = (userID, challengeID, submissions, isLoading, isCompleted, isOwned, isJoined, isRestricted,
                             isRequesting, setIsLoading, setSubmitModalOpen, openCompleteModal) => {
    const panes = [
        { menuItem: 'Submissions', render: () => (
                <Tab.Pane basic className='u-border--0 u-padding--0 u-margin-top--3'>
                    <Grid columns={2}>
                        <Grid.Column>
                            {selectWinner(isOwned, openCompleteModal)}
                        </Grid.Column>
                        <Grid.Column>
                            <Button primary fluid onClick={() => setSubmitModalOpen(true)}>
                                Task Completion Post</Button>
                        </Grid.Column>
                    </Grid>
                    <SubmissionList ids={submissions}
                                    noSubmissionsMessage="No submissions yet!"
                                    sortFunction={(a, b) => a.time_created.localeCompare(b.time_created)}
                    />
                    {/*<DatabaseObjectList ids={submissions}*/}
                                        {/*noObjectsMessage="No submissions yet!"*/}
                                        {/*acceptedItemTypes={["Submission"]}*/}
                                        {/*// TODO Check the sort...*/}
                                        {/*sortFunction={(a, b) => a.time_created.localeCompare(b.time_created)}*/}
                    {/*/>*/}
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
                <Divider className='u-margin-top--4' />
                <Tab menu={{ widths: 2, inverted: true }} panes={panes} className='u-challenge u-margin-top--2' />
            </Fragment>
        )
    }
    else if (isJoined) {
        return (
            <Fragment>
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

/**
 * TODO
 *
 * @param ifStreak
 * @param streak
 * @return {*}
 */
const displayStreakInfo = (ifStreak, streak) => {
    if (ifStreak) {
        if (streak) {
            const ifExpired = ifStreakExpired(streak);
            if (ifExpired) {
                return [
                    <Header color="gray"><Icon name='fire extinguisher' size='large' color='grey'/>
                        Your Streak Has Expired!</Header>
                ];
            }
            else {
                const currentNumber = streak.N;
                return [
                    <Header color="purple">Streak: <Icon name='fire' size='large' color='purple'/> {currentNumber}</Header>
                ];
            }
        }
        else {
            return [
                <Divider/>,
                <Header color="gray">Could not read streak data...</Header>
            ];
        }
    }
    return null;
};

/**
 * TODO
 *
 * @param error
 * @return {*}
 */
const displayError = (error) => {
    if (error === "Error while trying to update an item in the database safely. Error: The item failed the checkHandler: That challenge is already filled up!") {
        return (<Message negative>
            <Message.Header>Sorry!</Message.Header>
            <p>That challenge is already filled up!</p>
        </Message>);
    }
};

/**
 * TODO
 *
 * @param isDeleted
 * @return {*}
 */
const challengeDeleted = (isDeleted) => {
    if(isDeleted) {
        return (<Message negative>
            <Message.Header>This Challenge is Deleted!</Message.Header>
        </Message>);
    }
};

/**
 * This function controls the state of the edit button depending on whether the page is currently being edited or not.
 *
 * @param {boolean} isEditing If the profile is being edited or not.
 * @param {function(boolean)} setIsEditing {boolean} Function for setting the edit boolean.
 * @returns {*} The React JSX used to display the component.
 */
function editButton(isEditing, setIsEditing) {
    if(!isEditing) {
        return (
            <Button onClick = { () => setIsEditing(p => !p)} floated='left' circular icon color={'purple'}>
                <Icon name='edit outline'/>
            </Button>
        );
    }
    else {
        return (
            <div>
                <Button onClick = { () => setIsEditing(p => !p)} floated='left' circular icon color={'purple'}>
                    <Icon name='save'/>
                </Button>
                <Button onClick = { () => setIsEditing(p => !p)} floated='left' circular icon>
                    <Icon name='cancel'/>
                </Button>
            </div>
        );
    }
}

/**
 * This function controls the state of the settings button depending on whether the user owns or is joined to the
 * challenge.
 *
 * @param {boolean} isOwned If the user owns the challenge or not.
 * @param {boolean} isJoined If the user has joined the challenge or not.
 * @returns {*} The React JSX used to display the component.
 */
function createCorrectSettingsButton(isOwned, isJoined, challengeID, setIsLoading, isLoading, userID, setCompleteModalOpen, onClose) {
    if(isOwned) {
        return (<Popup
            trigger={<Button floated='right' circular icon color={'purple'}>
                <Icon name='cog'/>
            </Button>}
            content={<Button loading={isLoading} fluid negative size="large" disabled={isLoading}
                             onClick={() => handleDeleteChallengeButton(userID, challengeID, setIsLoading, onClose)}>
                Delete</Button>}
            on='click'
            position='bottom right'
        />);
    }
    else if(isJoined) {
        return (<Popup
            trigger={<Button floated='right' circular icon color={'purple'}>
                <Icon name='cog'/>
            </Button>}
            content={<Button loading={isLoading} fluid inverted size="large" disabled={isLoading}
                             onClick={() => handleLeaveChallengeButton(userID, challengeID, setIsLoading)}>
                Leave
            </Button>}
            on='click'
            position='bottom right'
        />);
    }
    else {
        return null;
    }
}

/**
 * TODO
 *
 * @param props
 * @return {*}
 * @constructor
 */
const ChallengeDescriptionModal = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [challengeType, setChallengeType] = useState(null);
    const [streak, setStreak] = useState(null);
    const [isOwned, setIsOwned] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isRestricted, setIsRestricted] = useState(false);
    const [ownerModalOpen, setOwnerModalOpen] = useState(false);
    const [completeModalOpen, setCompleteModalOpen] = useState(false);
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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
                    if (challenge.challengeType) {
                        setChallengeType(challenge.challengeType);
                        if (challenge.challengeType === "streak") {
                            if (challenge.streaks && props.user.streaks) {
                                const intersection = arrayIntersection(challenge.streaks, props.user.streaks);
                                if (intersection && intersection.length && intersection.length === 1) {
                                    props.fetchStreak(intersection[0], ["lastUpdated", "N", "bestN", "currentN", "updateSpanType", "updateInterval"], (streak) => {
                                        setStreak(streak);
                                    });
                                }
                                else {
                                    err&&console.error("Could not determine which streak is for this challenge!!");
                                }
                            }
                        }
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
            <Modal open={props.open} onClose={() => props.onClose()} closeIcon>
                <Icon className='close' onClick={() => props.onClose()}/>
                <Modal.Header align='center' style={{marginTop: '10px'}}><div>
                {getChallengeAttribute("title")}</div>
                    {editButton(isEditing, setIsEditing)}
                    {createCorrectSettingsButton(isOwned, isJoined, props.challengeID, setIsLoading, isLoading,
                        props.user.id, setCompleteModalOpen, props.onClose)}
                    <div>{displayTagIcons(getChallengeAttribute("tags"))}</div>
                    <div>
                        {daysLeft(parseISOString(getChallengeAttribute("endTime")))} days left
                    </div>
                    </Modal.Header>
                <Modal.Content align='center'>
                    <Grid centered columns='equal'>
                        <Grid.Row >
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
                        <Grid.Column>
                                <Button floated='left' className="u-button--flat" onClick={() => setOwnerModalOpen(true)}>
                                    <Icon name='user'/> {getOwnerAttribute("name")}
                                </Button>

                            <Modal trigger={
                            <Button floated='right' primary className="u-button--flat u-padding-left--1">
                                <Icon name='users' /> Members</Button>} closeIcon>
                            <Modal.Content>
                                <DatabaseObjectList ids={getChallengeAttribute("members")}
                                                    noObjectsMessage={"No members yet!"}
                                                    acceptedItemTypes={["Client", "Trainer"]}
                                />
                            </Modal.Content>
                        </Modal>
                        </Grid.Column>
                    </Grid>
                    <Divider/>
                    {displayStreakInfo(challengeType === "streak", streak)}
                    <Modal.Description>
                        {createCorrectModal(getChallengeAttribute("owner"), ownerModalOpen, setOwnerModalOpen)}
                        <CompleteChallengeModal open={completeModalOpen} onClose={() => setCompleteModalOpen(false)} challengeID={props.challengeID}/>
                        <CreateSubmissionModal open={submitModalOpen} onClose={() => setSubmitModalOpen(false)} challengeID={props.challengeID}/>
                        {createCorrectButton(props.user.id, props.challengeID, getChallengeAttribute("submissions"),
                            isLoading, isCompleted, isOwned, isJoined, isRestricted, isRequesting, setIsLoading,
                            setSubmitModalOpen, setCompleteModalOpen)}
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
        fetchStreak: (id, variableList, dataHandler) => {
            dispatch(fetchStreak(id, variableList, dataHandler));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDescriptionModal);

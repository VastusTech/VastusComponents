import React, {useState, useEffect} from 'react'
import {Button, Card, Modal, Dimmer, Loader, List, Icon, Label, Divider } from 'semantic-ui-react'
import { Storage } from 'aws-amplify';
import {log} from "../../../Constants";
import ChallengeList from "../lists/ChallengeList";
import {fetchUserAttributes, forceFetchUserAttributes} from "../../../redux_helpers/actions/userActions";
import { connect } from "react-redux";
import TrainerFunctions from "../../database_functions/TrainerFunctions";
import TrainerPostFeed from "../lists/TrainerPostFeed";
import EventList from "../lists/EventList";
import MessageBoard from "../messaging/MessageBoard";
import MessageHandler from "../../api/MessageHandler";
import {getTrainerAttribute} from "../../logic/CacheRetrievalHelper";

type Props = {
    trainerID: string,
    open: boolean,
    onClose: any
};

/**
 * Profile
 *
 * This is the profile page which displays information about the current user.
 */
const TrainerModal = (props: Props) => {
    // const [buddyModalOpen, setBuddyModalOpen] = useState(false);
    const [ownedModalOpen, setOwnedModalOpen] = useState(false);
    const [scheduledModalOpen, setScheduledModalOpen] = useState(false);

    // state = {
    //     trainerID: null,
    //     isLoading: true,
    //     checked: false,
    //     sentRequest: false,
    //     buddyModalOpen: false,
    //     scheduledModalOpen: false,
    //     ownedModalOpen: false,
    //     error: null
    // };

    // constructor(props) {
    //     // log&&console.log("constructor props: " + JSON.stringify(props));
    //     super(props);
    //     // this.setState({isLoading: true, checked: false, error: null});
    //     // ("Got into Profile constructor");
    //     this.setPicture = this.setPicture.bind(this);
    //     this.update = this.update.bind(this);
    //     this.profilePicture = this.profilePicture.bind(this);
    //     this.openBuddyModal = this.openBuddyModal.bind(this);
    //     this.closeBuddyModal = this.closeBuddyModal.bind(this);
    //     this.openScheduledModal = this.openScheduledModal.bind(this);
    //     this.closeScheduledModal = this.closeScheduledModal.bind(this);
    //     this.openOwnedModal = this.openOwnedModal.bind(this);
    //     this.closeOwnedModal = this.closeOwnedModal.bind(this);
    //     this.handleLogOut = this.handleLogOut.bind(this);
    // }

    // resetState() {
    //     this.setState({
    //         isLoading: true,
    //         checked: false,
    //         sentRequest: false,
    //         buddyModalOpen: false,
    //         scheduledModalOpen: false,
    //         completedModalOpen: false,
    //         ownedModalOpen: false,
    //         error: null,
    //     });
    // }

    // componentDidMount() {
    //     // log&&console.log("componentDidMount");
    //     this.update();
    // }

    // componentWillReceiveProps(newProps, nextContext) {
    //     // log&&console.log("componentWillReceiveProps");
    //     // log&&console.log("receive props: " + JSON.stringify(newProps));
    //     if (newProps.user.profileImagePath) {
    //         this.setState({isLoading: true});
    //     }
    //     if (newProps.user && this.props.user && newProps.user.id !== this.props.user.id) {
    //         this.resetState();
    //     }
    //     this.update();
    // }

    // update() {
    //     const user = this.props.user;
    //     // log&&console.log("Updating. User = " + JSON.stringify(user) + ". State = " + JSON.stringify(this.state));
    //     if (!user.id) {
    //         // log&&console.log("ID is not set inside profile... This means a problem has occurred");
    //     }
    //
    //     if (!this.props.info.isLoading && !this.state.sentRequest && !(user.id && user.name && user.username && user.birthday && user.profilePicture)) {
    //         this.state.sentRequest = true;
    //         // this.props.fetchUserAttributes(["name", "username", "birthday", "profileImagePath", "challengesWon", "friends", "challenges", "ownedChallenges", "completedChallenges"]);
    //     }
    //     else {
    //         this.setState({isLoading: false});
    //     }
    // }

    const getAttribute = (attribute) => {
        return getTrainerAttribute(props.trainerID, attribute, props.cache);
    };

    const profilePicture = () => {
        if (getAttribute("profileImage")) {
            return (
                <div className="u-avatar u-avatar--large u-margin-x--auto u-margin-top--neg4" style={{backgroundImage: `url(${getAttribute("profileImage")})`}}/>
            );
        }
        else {
            return(
                <Dimmer inverted>
                    <Loader />
                </Dimmer>
            );
        }
    };

    // if (this.state.isLoading) {
    //     return(
    //         <Dimmer>
    //             <Loader/>
    //         </Dimmer>
    //     )
    // }

    //This displays some basic user information, a profile picture, buttons to modify some user related attributes,
    //and a switch to set the privacy for the user.
    /*
    For a trainer's portal, we want to display their name / basic info, then links to their challenges/events stuff,
    then finally a feed of their posts.
     */
    return(
        <Modal open={props.open} onClose={props.onClose}>
            <Icon className='close' onClick={props.onClose}/>
            <Card color='purple' fluid raised className="u-margin-top--2">
                <Card.Content textAlign="center">
                    {profilePicture()}
                    <Card.Header as="h2" style={{"margin": "12px 0 0"}}>{getAttribute("name")}</Card.Header>
                    <List id = "profile buttons">
                        <List.Item>
                            <Button primary fluid size="large" onClick={() => setOwnedModalOpen(true)}><Icon name="trophy" /> Current Challenges</Button>
                            <Modal basic size='mini' open={ownedModalOpen} onClose={() => setOwnedModalOpen(false)} closeIcon>
                                <Modal.Content>
                                    <ChallengeList challengeIDs={getAttribute("ownedChallenges")} noChallengesMessage="No owned challenges yet!"/>
                                </Modal.Content>
                            </Modal>
                        </List.Item>
                        <List.Item>
                            <Button primary fluid size="large" onClick={() => setScheduledModalOpen(true)}><Icon name="checked calendar" /> Scheduled Events</Button>
                            <Modal basic size='mini' open={scheduledModalOpen} onClose={() => setScheduledModalOpen(false)} closeIcon>
                                <Modal.Content>
                                    <EventList eventIDs={getAttribute("scheduledEvents")} noEventsMessage="No scheduled events yet!"/>
                                </Modal.Content>
                            </Modal>
                        </List.Item>
                        <List.Item>
                            <Modal trigger={<Button primary fluid><Icon name="wechat" /> Trainer Chat</Button>}>
                                <MessageBoard board={MessageHandler.getBoard([getAttribute("id"), props.user.id])}/>
                            </Modal>
                        </List.Item>
                    </List>
                    <TrainerPostFeed trainerID={getAttribute("id")}/>
                </Card.Content>
            </Card>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    info: state.info,
    cache: state.cache,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserAttributes: (attributesList) => {
            dispatch(fetchUserAttributes(attributesList));
        },
        forceFetchUserAttributes: (variablesList) => {
            dispatch(forceFetchUserAttributes(variablesList));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainerModal);

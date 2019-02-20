import React from 'react'
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
class TrainerModal extends React.PureComponent<Props> {
    state = {
        trainerID: null,
        isLoading: true,
        checked: false,
        sentRequest: false,
        buddyModalOpen: false,
        scheduledModalOpen: false,
        ownedModalOpen: false,
        error: null
    };

    toggle = () => this.setState({ checked: !this.state.checked });

    constructor(props) {
        // log&&console.log("constructor props: " + JSON.stringify(props));
        super(props);
        // this.setState({isLoading: true, checked: false, error: null});
        // ("Got into Profile constructor");
        this.setPicture = this.setPicture.bind(this);
        this.update = this.update.bind(this);
        this.profilePicture = this.profilePicture.bind(this);
        this.openBuddyModal = this.openBuddyModal.bind(this);
        this.closeBuddyModal = this.closeBuddyModal.bind(this);
        this.openScheduledModal = this.openScheduledModal.bind(this);
        this.closeScheduledModal = this.closeScheduledModal.bind(this);
        this.openOwnedModal = this.openOwnedModal.bind(this);
        this.closeOwnedModal = this.closeOwnedModal.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    resetState() {
        this.setState({
            isLoading: true,
            checked: false,
            sentRequest: false,
            buddyModalOpen: false,
            scheduledModalOpen: false,
            completedModalOpen: false,
            ownedModalOpen: false,
            error: null,
        });
    }

    componentDidMount() {
        // log&&console.log("componentDidMount");
        this.update();
    }

    componentWillReceiveProps(newProps, nextContext) {
        // log&&console.log("componentWillReceiveProps");
        // log&&console.log("receive props: " + JSON.stringify(newProps));
        if (newProps.user.profileImagePath) {
            this.setState({isLoading: true});
        }
        if (newProps.user && this.props.user && newProps.user.id !== this.props.user.id) {
            this.resetState();
        }
        this.update();
    }

    update() {
        const user = this.props.user;
        // log&&console.log("Updating. User = " + JSON.stringify(user) + ". State = " + JSON.stringify(this.state));
        if (!user.id) {
            // log&&console.log("ID is not set inside profile... This means a problem has occurred");
        }

        if (!this.props.info.isLoading && !this.state.sentRequest && !(user.id && user.name && user.username && user.birthday && user.profilePicture)) {
            this.state.sentRequest = true;
            // this.props.fetchUserAttributes(["name", "username", "birthday", "profileImagePath", "challengesWon", "friends", "challenges", "ownedChallenges", "completedChallenges"]);
        }
        else {
            this.setState({isLoading: false});
        }
    }

    getTrainerAttribute(attribute) {
        if (this.props.trainerID) {
            //log&&console.log(this.props.trainerID);
            let trainer = this.props.cache.trainers[this.props.trainerID];
            if (trainer) {
                if (attribute.substr(attribute.length - 6) === "Length") {
                    attribute = attribute.substr(0, attribute.length - 6);
                    if (trainer[attribute] && trainer[attribute].length) {
                        return trainer[attribute].length;
                    }
                    else {
                        return 0;
                    }
                }
                return trainer[attribute];
            }
        }
        else {
            return null;
        }
    }

    setPicture(event) {
        //log&&console.log(JSON.stringify(this.props));
        if (this.props.user.id) {
            const path = "/ClientFiles/" + this.props.user.id + "/profileImage";
            //log&&console.log("Calling storage put");
            //log&&console.log("File = " + JSON.stringify(event.target.files[0]));
            Storage.put(path, event.target.files[0], { contentType: "video/*;image/*" }).then((result) => {
                // Now we update the database object to reflect this
                //log&&console.log("resulttt:" + JSON.stringify(result));
                //log&&console.log("Successfully put the image, now putting the data into the database!");
                TrainerFunctions.updateProfileImagePath(this.props.user.id, this.props.user.id, path,
                    (data) => {
                        //log&&console.log("successfully editted client");
                        //log&&console.log(JSON.stringify(data));
                        this.props.forceFetchUserAttributes(["profileImagePath"]);
                        this.setState({isLoading: true});
                    }, (error) => {
                        log&&console.log("Failed edit client attribute");
                        log&&console.log(JSON.stringify(error));
                    });
                this.setState({isLoading: true});
            }).catch((error) => {
                log&&console.log("failed storage put");
                log&&console.log(error);
            });
        }
    }

    profilePicture() {
        if (this.getTrainerAttribute("profileImage")) {
            // if (this.state.ifS3) {
            //     // <S3Image size='medium' imgKey={this.state.profilePicture} circular/>
            //     return(
            //         <Item.Image size='medium' src={this.state.profilePicture} circular/>
            //     );
            // }
            /*return(
                <div className="u-avatar u-avatar--large u-margin-x--auto u-margin-top--neg4" style={{backgroundImage: `url(${this.props.user.profilePicture})`}}>
                    <Label as="label" htmlFor="proPicUpload" circular className="u-bg--primaryGradient">
                        <Icon name="upload" className='u-margin-right--0' size="large" inverted />
                    </Label>
                    <input type="file" accept="video/*;capture=camcorder" id="proPicUpload" hidden={true} onChange={this.setPicture}/>
                </div>
            );*/
            //log&&console.log("PROPICIMAGE!!!!: " + this.props.user.profilePicture);
            //alert("Profile Image: " + this.getTrainerAttribute("profileImage"));
            return (
                <div>
                    <div className="u-avatar u-avatar--large u-margin-x--auto u-margin-top--neg4" style={{backgroundImage: `url(${this.getTrainerAttribute("profileImage")})`}}>
                    </div>
                </div>
            );
        }
        else {
            return(
                <Dimmer inverted>
                    <Loader />
                </Dimmer>
            );
        }
    }

    handleLogOut() {
        // log&&console.log("logging out");
        this.props.logOut();
        // this.setState({isLoading: true});
        // Auth.signOut({global: true}).then((data) => {
        //     log&&console.log("Successfully signed out!");
        //     log&&console.log(data);
        //     this.setState({isLoading: false, username: null});
        //     this.props.signOut();
        // }).catch((error) => {
        //     log&&console.log("Sign out has failed :(");
        //     log&&console.log(error);
        //     this.setState({error: error, isLoading: false});
        // });
    }

    openBuddyModal = () => { this.setState({buddyModalOpen: true}); };
    closeBuddyModal = () => { this.setState({buddyModalOpen: false}); };
    openScheduledModal = () => { this.setState({scheduledModalOpen: true}); };
    closeScheduledModal = () => { this.setState({scheduledModalOpen: false}); };
    openCompletedModal = () => { this.setState({completedModalOpen: true}); };
    closeCompletedModal = () => { this.setState({completedModalOpen: false}); };
    openOwnedModal = () => { this.setState({ownedModalOpen: true}); };
    closeOwnedModal = () => { this.setState({ownedModalOpen: false}); };


    render() {
        //log&&console.log(JSON.stringify(this.state));
        /**
         * This creates an error message from the given error string
         * @param error A string containing the error message that was invoked
         * @returns {*} Returns a Semantic-ui script for displaying the error
         */
        // function errorMessage(error) {
        //     if (error) {
        //         return (
        //             <Message color='red'>
        //                 <h1>Error!</h1>
        //                 <p>{error}</p>
        //             </Message>
        //         );
        //     }
        // }

        /**
         *
         * @param profilePicture Displays the
         * @returns {*}
         */

        // function numChallengesWon(challengesWon) {
        //     if (challengesWon && challengesWon.length) {
        //         return challengesWon.length;
        //     }
        //     return 0;
        // }

        if (this.state.isLoading) {
            return(
                <Dimmer>
                    <Loader/>
                </Dimmer>
            )
        }

        //This displays some basic user information, a profile picture, buttons to modify some user related attributes,
        //and a switch to set the privacy for the user.
        /*
        For a trainer's portal, we want to display their name / basic info, then links to their challenges/events stuff,
        then finally a feed of their posts.
         */
        return(
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <Icon className='close' onClick={() => this.props.onClose()}/>
                <Card color='purple' fluid raised className="u-margin-top--2">
                    <Card.Content textAlign="center">
                        {this.profilePicture()}
                        <Card.Header as="h2" style={{"margin": "12px 0 0"}}>{this.getTrainerAttribute("name")}</Card.Header>
                        <List id = "profile buttons">
                            <List.Item>
                                <Button primary fluid size="large" onClick={this.openOwnedModal.bind(this)}><Icon name="trophy" /> Current Challenges</Button>
                                <Modal basic size='mini' open={this.state.ownedModalOpen} onClose={this.closeOwnedModal.bind(this)} closeIcon>
                                    <Modal.Content>
                                        <ChallengeList challengeIDs={this.props.user.ownedChallenges} noChallengesMessage="No owned challenges yet!"/>
                                    </Modal.Content>
                                </Modal>
                            </List.Item>
                            <List.Item>
                                <Button primary fluid size="large" onClick={this.openScheduledModal.bind(this)}><Icon name="checked calendar" /> Scheduled Events</Button>
                                <Modal basic size='mini' open={this.state.scheduledModalOpen} onClose={this.closeScheduledModal.bind(this)} closeIcon>
                                    <Modal.Content>
                                        <EventList eventIDs={this.props.user.scheduledEvents} noEventsMessage="No scheduled events yet!"/>
                                    </Modal.Content>
                                </Modal>
                            </List.Item>
                            <List.Item>
                                <Modal trigger={<Button primary fluid><Icon name="wechat" /> Trainer Chat</Button>}>
                                    <MessageBoard board={MessageHandler.getBoard([this.getTrainerAttribute("id"), this.props.user.id])}/>
                                </Modal>
                            </List.Item>
                        </List>
                        <TrainerPostFeed trainerID={this.getTrainerAttribute("id")}/>
                    </Card.Content>
                </Card>
            </Modal>
        );
    }
}

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

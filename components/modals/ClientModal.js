import React, { useState, useEffect, Fragment } from 'react';
import ReactSwipe from 'react-swipe';
import {Modal, Button, List, Dimmer, Loader, Message, Icon, Image, Label, Grid} from 'semantic-ui-react';
import { connect } from "react-redux";
import InviteToChallengeModalProp from "../manager/InviteToChallengeModal";
import _ from "lodash";
import {fetchClient} from "../../redux/convenience/cacheItemTypeActions";
import {forceFetchUserAttributes} from "../../redux/actions/userActions";
import InviteFunctions from "../../database_functions/InviteFunctions";
import UserFunctions from "../../database_functions/UserFunctions";
import {debugAlert} from "../../logic/DebuggingHelper";
import MessageBoard from "../messaging/MessageBoard";
import {log, err} from "../../../Constants";
import {getClientAttribute} from "../../logic/CacheRetrievalHelper";
import Spinner from "../props/Spinner";
import {getMessageBoardName} from "../../logic/MessageHelper";
import ProfileImage from "../props/ProfileImage";

// TODO Rewrite for the new design
// TODO Move the functions outside of the component to improve efficiency

type Props = {
    open: boolean,
    onClose: any,
    clientID: string
}

/**
 * TODO
 *
 * @param props
 * @return {*}
 * @constructor
 */
const ClientModal = (props: Props) => {
    const [clientID, setClientID] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddFriendLoading, setIsAddFriendLoading] = useState(false);
    const [isRemoveFriendLoading, setIsRemoveFriendLoading] = useState(false);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [sentFriendRequest, setSentFriendRequest] = useState(false);

    // Changed clientID
    useEffect(() => {
        if (props.clientID) {
            setClientID(props.clientID);
            // TODO Reset state
        }
    }, [props.clientID]);

    // Finished setting client ID
    useEffect(() => {
    }, [clientID]);

    // ???? TODO TEST For open?
    useEffect(() => {
        if (props.open && clientID) {
            // alert("opened!");
            debugAlert("Fetching Client for Client Modal!");
            props.fetchClient(clientID, ["id", "username", "gender", "birthday", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath", "profileImagePaths", "friendRequests"]);
        }
    }, [props.open]);

    const getAttribute = (attribute) => { return getClientAttribute(clientID, attribute, props.cache); };

    const handleAddFriendButton = () => {
        const userID = props.user.id;
        const friendID = getAttribute("id");
        if (userID && friendID) {
            setIsAddFriendLoading(true);
            InviteFunctions.createFriendRequest(userID, userID, friendID, (data) => {
                setIsAddFriendLoading(false);
                props.forceFetchUserAttributes(["friends"]);
            }, (error) => {
                setIsAddFriendLoading(false);
                log&&console.log(error);
                setError(error);
            });
        }
    };

    const handleRemoveFriendButton = () => {
        const userID = props.user.id;
        const friendID = getAttribute("id");
        if (userID && friendID) {
            setIsRemoveFriendLoading(true);
            UserFunctions.removeFriend(userID, userID, friendID, (data) => {
                setIsRemoveFriendLoading(false);
                log&&console.log("Successfully removed " + getAttribute("name") + " from friends list");
                props.forceFetchUserAttributes(["friends"]);
            }, (error) => {
                setIsRemoveFriendLoading(false);
                err&&console.error(error);
                setError(error);
            });
        }
    };

    const imageGallery = () => {
        if (getAttribute("profileImages")) {
            return _.times(getAttribute("profileImages").length, i => (
                <div>
                    <Image src={getAttribute("profileImages")[i]} align='center' style={{height: '300px',
                        width: '300px', display: 'block',
                        margin: 'auto'}}/>
                </div>
            ));
        }
        else {
            return( <div align="center">
                No Images in Gallery
            </div> );
        }
    };

    const profilePicture = () => {
        if (getAttribute("profileImage")) {
            return(
                <div className="u-avatar u-avatar--small u-margin-bottom--1" style={{backgroundImage: `url(${getAttribute("profileImage")})`}}/>
            );
        }
        else {
            return(
                <Dimmer inverted>
                    <Spinner />
                </Dimmer>
            );
        }
    };

    const swipeGallery = () => {
        let reactSwipeEl;
        return (
            <div>
                <Grid centered>
                    <Grid.Column width={1} style={{marginRight: "10px"}} onClick={() => reactSwipeEl.prev()}>
                        <Icon size='large' name="caret left" style={{marginTop: "150px"}}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <ReactSwipe
                            className="carousel"
                            swipeOptions={{ continuous: false }}
                            ref={el => (reactSwipeEl = el)}
                        >
                            {imageGallery()}
                        </ReactSwipe>
                    </Grid.Column>
                    <Grid.Column width={1} style={{marginRight: "10px", marginLeft: "-10px"}} onClick={() => reactSwipeEl.next()}>
                        <Icon size='large' name="caret right" style={{marginTop: "150px"}}/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    };
    const getCorrectFriendActionButton = () => {
        const friendID = getAttribute("id");
        if (friendID) {
            if (props.user.friends && props.user.friends.length) {
                if (props.user.friends.includes(friendID)) {
                    // Then they're already your friend
                    return (
                        <Button inverted
                                loading={isRemoveFriendLoading}
                                type='button'
                                onClick={handleRemoveFriendButton}>
                            Remove Buddy
                        </Button>
                    );
                }
            }
            const friendRequests = getAttribute("friendRequests");
            if (friendRequests && friendRequests.length && friendRequests.includes(props.user.id) || sentFriendRequest) {
                // Then you already sent a friend request
                return (
                    <Button inverted disabled
                            type='button'>
                        Sent Request!
                    </Button>
                );
            }
        }
        return(
            <Button inverted
                    loading={isAddFriendLoading}
                    type='button'
                    onClick={handleAddFriendButton}>
                Add Buddy
            </Button>
        );
    };

    // TODO Unsure what this was doing exactly? this.state.showSuccessLabel and this.state.showModal confused me
    // const createSuccessLabel = () => {
    //     if(this.state.showSuccessLabel && this.state.showModal) {
    //         this.setState({showSuccessLabel: false});
    //     }
    //     else if(this.state.showSuccessLabel) {
    //         return (<Message positive>
    //             <Message.Header>Success!</Message.Header>
    //             <p>
    //                 You just shared this User!
    //             </p>
    //         </Message>);
    //     }
    //     else {
    //         return null;
    //     }
    // }

    // TODO Put this in once it's applicable
    // shareClient() {
    //     this.setState({shareLoading: true});
    //     //console.log(this.props.user.id + " and " + this.getClientAttribute("description") + " and " + this.getClientAttribute("access"));
    //     PostFunctions.createShareItemPostOptional(this.props.user.id, this.props.user.id, "", "public", "Client", this.getClientAttribute("id"), null, null, (returnValue) => {
    //         console.log("Successfully Created Post!");
    //         console.log(JSON.stringify(returnValue));
    //         this.setState({shareLoading: false});
    //         this.setState({showSuccessLabel: true});
    //     }, (error) => {
    //         err&&console.error(error);
    //         this.setState({error: "Could not share page at this time"});
    //         this.setState({shareLoading: false});
    //     });
    // }

    //This render function displays the user's information in a small profile page, and at the
    //bottom there is an add buddy function, which sends out a buddy request (friend request).
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Icon className='close' onClick={() => props.onClose()}/>
            {loadingProp(props.info.isLoading)}
            {errorMessage(error)}
            <Modal.Header>{getAttribute("name")}</Modal.Header>
            <Modal.Content image>
                <ProfileImage userID={props.user.id}
                              profileImage={getAttribute("profileImage")}
                              profileImages={getAttribute("profileImages")}
                />
                {/*{profilePicture()}*/}
                <Modal.Description>
                    {/*<Button primary floated='right' loading={this.state.shareLoading} disabled={this.state.shareLoading} onClick={() => this.shareClient()}>Share Page</Button>*/}
                    <List relaxed>
                        {/* Bio */}
                        <List.Item>
                            <List.Icon name='user' />
                            <List.Content>
                                {"Username: " + getAttribute("username")}
                            </List.Content>
                        </List.Item>

                        {/* Friends */}
                        <List.Item>
                            <List.Icon name='users' />
                            <List.Content>
                                {getAttribute("friendsLength") + " friends"}
                            </List.Content>
                        </List.Item>
                        {/* Event Wins */}
                        <List.Item>
                            <List.Icon name='trophy' />
                            <List.Content>
                                {getAttribute("challengesWonLength") + " challenges won"}
                            </List.Content>
                        </List.Item>
                    </List>
                </Modal.Description>
            </Modal.Content>
            <Modal.Content fluid>
                {swipeGallery()}
            </Modal.Content>
            <Modal.Actions>
                <Button primary onClick={() => setInviteModalOpen(true)}>Invite to Challenge</Button>
                <InviteToChallengeModalProp
                    open={inviteModalOpen}
                    onOpen={() => setInviteModalOpen(true)}
                    onClose={() => setInviteModalOpen(false)}
                    friendID={getAttribute("id")}
                />
                {getCorrectFriendActionButton()}
            </Modal.Actions>
            {/*<Modal.Content>*/}
                {/*{createSuccessLabel()}*/}
            {/*</Modal.Content>*/}
            <Modal trigger={<Button primary fluid><Icon name="wechat" /> Chat </Button>}>
                <MessageBoard board={getMessageBoardName([getAttribute("id"), props.user.id])}/>
            </Modal>
        </Modal>
    );
};

function loadingProp(isLoading) {
    if (isLoading) {
        return (
            <Dimmer active>
                <Spinner/>
            </Dimmer>
        );
    }
    return null;
}

function errorMessage(error) {
    if (error) {
        return (
            <Message color='red'>
                <h1>Error!</h1>
                <p>{error}</p>
            </Message>
        );
    }
}

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
        forceFetchUserAttributes: (variablesList) => {
            dispatch(forceFetchUserAttributes(variablesList));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientModal);

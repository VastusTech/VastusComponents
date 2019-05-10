import React, { useState, useEffect } from 'react';
import {Modal, Button, Dimmer, Message, Icon, Grid} from 'semantic-ui-react';
import { connect } from "react-redux";
import InviteToChallengeModalProp from "../manager/InviteToChallengeModal";
import {fetchClient, fetchInvite} from "../../redux/convenience/cacheItemTypeActions";
import {
    addToUserAttribute,
    fetchUserAttributes,
    forceFetchUserAttributes,
    removeFromUserAttribute
} from "../../redux/actions/userActions";
import InviteFunctions from "../../database_functions/InviteFunctions";
import UserFunctions from "../../database_functions/UserFunctions";
import {debugAlert} from "../../logic/DebuggingHelper";
import MessageBoard from "../messaging/MessageBoard";
import {log, err} from "../../../Constants";
import {getClientAttribute} from "../../logic/CacheRetrievalHelper";
import Spinner from "../props/Spinner";
import {getMessageBoardName} from "../../logic/MessageHelper";
import ProfileImage from "../props/ProfileImage";
import type Invite from "../../types/Invite";
import {addToItemAttribute, removeFromItemAttribute} from "../../redux/actions/cacheActions";

// TODO Rewrite for the new design
// TODO Move the functions outside of the component to improve efficiency

type Props = {
    open: boolean,
    onClose: any,
    clientID: string
}

/**
 * Client Modal allows you to see a Client's attributes and also you can interact with the Client like adding them as a
 * friend.
 *
 * @param props
 * @return {*}
 * @constructor
 */
const ClientModal = (props: Props) => {
    const [clientID, setClientID] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isActionButtonLoading, setIsActionButtonLoading] = useState(false);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [friendRequestID, setFriendRequestID] = useState(null);
    const [hasFriendRequest, setHasFriendRequest] = useState(false);
    const [pendingFriendRequest, setPendingFriendRequest] = useState(false);

    const getAttribute = (attribute) => { return getClientAttribute(clientID, attribute, props.cache); };

    // Changed clientID
    useEffect(() => {
        if (props.clientID) {
            setClientID(props.clientID);
            setError(null);
            setIsFriend(false);
            setFriendRequestID(null);
            setHasFriendRequest(false);
            setPendingFriendRequest(false);
            // TODO Reset state

        }
    }, [props.clientID]);

    // Finished setting client ID
    useEffect(() => {
    }, [clientID]);

    useEffect(() => {
        if (props.open && clientID) {
            // alert("opened!");
            debugAlert("Fetching Client for Client Modal!");
            props.fetchClient(clientID, ["id", "username", "gender", "birthday", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath", "profileImagePaths", "friendRequests"]);
        }
    }, [props.open]);

    // Automatically update friend status
    useEffect(() => {
        if (props.user.friends && props.clientID) {
            setIsFriend(props.user.friends.includes(props.clientID));
        }
        if (props.user.friendRequests && props.clientID) {
            setHasFriendRequest(props.user.friendRequests.includes(props.clientID));
        }
        const clientFriendRequests = getAttribute("friendRequests");
        if (clientFriendRequests && props.user.id) {
            setPendingFriendRequest(clientFriendRequests.includes(props.user.id));
            if (clientFriendRequests.includes(props.user.id)) {
                props.fetchUserAttributes(["receivedInvites"], (user) => {
                    if (user.receivedInvites) {
                        for (let i = 0; i < user.receivedInvites.length; i++) {
                            const inviteID = user.receivedInvites[i];
                            props.fetchInvite(inviteID, ["inviteType", "to"], (invite: Invite) => {
                                if (invite.inviteType === "friendRequest" && invite.to === props.clientID) {
                                    setFriendRequestID(inviteID);
                                }
                            });
                        }
                    }
                    else {
                        console.error("Error in getting friend request");
                    }
                }, (error) => {
                    console.error("Error in getting friend request invite id." + error);
                });
            }
        }
    }, [props.user.friends, props.user.friendRequests, getAttribute("friendRequests")]);

    const handleAddFriendButton = () => {
        const userID = props.user.id;
        const friendID = getAttribute("id");
        if (userID && friendID) {
            setIsActionButtonLoading(true);
            InviteFunctions.createFriendRequest(userID, userID, friendID, () => {
                setIsActionButtonLoading(false);
            }, (error) => {
                setIsActionButtonLoading(false);
                log&&console.log(error);
                setError(error);
            }, props);
        }
    };

    // This is really long because we want to find the invite ID to delete (locally) as well.
    const handleAcceptFriendRequestButton = () => {
        const userID = props.user.id;
        const friendID = getAttribute("id");
        alert(userID + " " + friendID + " " + friendRequestID);
        if (userID && friendID && friendRequestID) {
            setIsActionButtonLoading(true);
            UserFunctions.addFriend(userID, userID, friendID, friendRequestID, () => {
                setIsActionButtonLoading(false);
            }, (error) => {
                setIsActionButtonLoading(false);
                log&&console.log(error);
                setError(error);
            });
        }
        else {

        }
    };

    const handleRemoveFriendButton = () => {
        const userID = props.user.id;
        const friendID = getAttribute("id");
        if (userID && friendID) {
            setIsActionButtonLoading(true);
            UserFunctions.removeFriend(userID, userID, friendID, (data) => {
                setIsActionButtonLoading(false);
                log&&console.log("Successfully removed " + getAttribute("name") + " from friends list");
                props.forceFetchUserAttributes(["friends"]);
            }, (error) => {
                setIsActionButtonLoading(false);
                err&&console.error(error);
                setError(error);
            }, props);
        }
    };

    const getCorrectFriendActionButton = () => {
        if (isFriend) {
            return (
                <Button inverted fluid loading={isActionButtonLoading}
                        type='button' onClick={handleRemoveFriendButton}>
                    Remove Buddy
                </Button>
            );
        }
        else if (pendingFriendRequest) {
            return (
                <Button inverted disabled fluid type='button'>
                    Sent Request!
                </Button>
            );
        }
        else if (hasFriendRequest) {
            return(
                <Button inverted fluid loading={isActionButtonLoading}
                        type='button' onClick={handleAcceptFriendRequestButton}>
                    Accept Buddy Request
                </Button>
            );
        }
        else {
            return(
                <Button inverted fluid loading={isActionButtonLoading}
                        type='button' onClick={handleAddFriendButton}>
                    Add Buddy
                </Button>
            );
        }
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
                <Grid columns='equal'>
                    <Grid.Column>
                        <ProfileImage userID={props.user.id}
                                      profileImage={getAttribute("profileImage")}
                                      profileImages={getAttribute("profileImages")}
                        />
                    </Grid.Column>
                    <div>
                        <Icon name='trophy'/>
                        {getAttribute("challengesWonLength") + " challenges won"}
                    </div>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <Grid columns={2}>
                    <Grid.Column>
                        <Button primary fluid onClick={() => setInviteModalOpen(true)}>Invite to Challenge</Button>
                        <InviteToChallengeModalProp
                            open={inviteModalOpen}
                            onOpen={() => setInviteModalOpen(true)}
                            onClose={() => setInviteModalOpen(false)}
                            friendID={getAttribute("id")}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        {getCorrectFriendActionButton()}
                    </Grid.Column>
                </Grid>
            </Modal.Actions>
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
        fetchClient: (id, variablesList, dataHandler, failureHandler) => {
            dispatch(fetchClient(id, variablesList, dataHandler, failureHandler));
        },
        fetchInvite: (id, variableList, dataHandler, failureHandler) => {
            dispatch(fetchInvite(id, variableList, dataHandler, failureHandler));
        },
        fetchUserAttributes: (variableList, dataHandler, failureHandler) => {
            dispatch(fetchUserAttributes(variableList, dataHandler, failureHandler));
        },
        forceFetchUserAttributes: (variablesList) => {
            dispatch(forceFetchUserAttributes(variablesList));
        },
        addToUserAttribute: (attributeName, attributeValue) => {
            dispatch(addToUserAttribute(attributeName, attributeValue));
        },
        addToItemAttribute: (id, attributeName, attributeValue) => {
            dispatch(addToItemAttribute(id, attributeName, attributeValue));
        },
        removeFromUserAttribute: (attributeName, attributeValue) => {
            dispatch(removeFromUserAttribute(attributeName, attributeValue));
        },
        removeFromItemAttribute: (id, attributeName, attributeValue) => {
            dispatch(removeFromItemAttribute(id, attributeName, attributeValue));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientModal);

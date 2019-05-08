import React, { useState, useEffect } from 'react';
import {Modal, Button, Dimmer, Message, Icon, Grid} from 'semantic-ui-react';
import { connect } from "react-redux";
import InviteToChallengeModalProp from "../manager/InviteToChallengeModal";
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
    // const [isLoading, setIsLoading] = useState(false);
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
                setSentFriendRequest(true);
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

    const getCorrectFriendActionButton = () => {
        const friendID = getAttribute("id");
        if (friendID) {
            if (props.user.friends && props.user.friends.length) {
                if (props.user.friends.includes(friendID)) {
                    // Then they're already your friend
                    return (
                        <Button inverted
                                fluid
                                loading={isRemoveFriendLoading}
                                type='button'
                                onClick={handleRemoveFriendButton}>
                            Remove Buddy
                        </Button>
                    );
                }
            }
            const friendRequests = getAttribute("friendRequests");
            if (friendRequests && friendRequests.length && (friendRequests.includes(props.user.id) || sentFriendRequest)) {
                // Then you already sent a friend request
                return (
                    <Button inverted disabled fluid
                            type='button'>
                        Sent Request!
                    </Button>
                );
            }
        }
        return(
            <Button inverted
                    fluid
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
        fetchClient: (id, variablesList) => {
            dispatch(fetchClient(id, variablesList));
        },
        forceFetchUserAttributes: (variablesList) => {
            dispatch(forceFetchUserAttributes(variablesList));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientModal);

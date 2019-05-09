import React, {useState, useEffect} from 'react';
import {Button, Modal, Grid, Message} from "semantic-ui-react";
import {connect} from "react-redux";
import {fetchItem} from "../../redux/actions/cacheActions";
import {addToUserAttribute, fetchUserAttributes} from "../../redux/actions/userActions";
import {getItemTypeFromID} from "../../logic/ItemType";
import UserFunctions from "../../database_functions/UserFunctions";
import {getMessageBoardName} from "../../logic/MessageHelper";
import {debugAlert} from "../../logic/DebuggingHelper";
import {UserCardInfo} from "../cards/UserCard";
import {err} from "../../../Constants";
import {addUniqueElementToArray, removeFromArray} from "../../logic/ArrayHelper";
import Spinner from "../props/Spinner";
import UserCard from "../cards/UserCard";

type Props = {
    open: boolean,
    onClose: any
};

/**
 * Creates a Chat with another user / multiple users and adds it to your Message boards.
 *
 * @param {string} userID The ID of the User starting the chat.
 * @param {[string]} selectedIDs The IDs of the Users that the User is starting a chat with.
 * @param {function(string, string)} addToUserAttribute User function to add to the main User's attributes manually.
 * @param {function()} onClose Closes the modal.
 */
const createChat = (userID, selectedIDs, addToUserAttribute, onClose) => {
    debugAlert("Creating chat with " + JSON.stringify(selectedIDs));
    const board = getMessageBoardName([userID, ...selectedIDs]);
    debugAlert(board);
    UserFunctions.addMessageBoard(userID, userID, board, () => {
            console.log("Successfully added message board to chat");
            addToUserAttribute("messageBoards", board);
            onClose();
        }, (error) => {
            err&&console.error(error);
        });
};

/**
 * Gets the create button for the friend for starting the Chat. Includes logic for toggling the selected IDs.
 *
 * @param {string} friendID The ID of the User to create the button for.
 * @param {[string]} selectedFriends The IDs of the friends who are currently selected.
 * @param {function([string])} setSelectedFriends Sets the selected friends state.
 * @return {*} The React JSX to display the create button.
 */
const createButton = (friendID, selectedFriends, setSelectedFriends) => {
    if (selectedFriends.includes(friendID)) {
        return(
            <Button negative onClick={() =>
                setSelectedFriends(p => {
                    p = [...p];
                    removeFromArray(p, friendID);
                    return p;
                })
            }> Remove </Button>
        );
    }
    else {
        return(
            <Button primary onClick={() =>
                setSelectedFriends(p => {
                    p = [...p];
                    addUniqueElementToArray(p, friendID);
                    return p;
                })
            }> Add </Button>
        );
    }
};

/**
 * Creates the list of Users with the buttons to select them for the chat.
 *
 * @param {[{id: string}]} friends The User objects for the friends.
 * @param {[string]} selectedFriends The IDs of the friends who are currently selected.
 * @param {function([string])} setSelectedFriends Sets the selected friends state.
 * @return {*} The React JSX to display the select chat ID buttons.
 */
const selectChatIDButtons = (friends, selectedFriends, setSelectedFriends) => {
    const cards = [];
    for (let i = 0; i < friends.length; i++) {
        cards.push(
            <Grid key={i} centered>
                <Grid.Column>
                    <UserCard user={friends[i]}/>
                </Grid.Column>
                <Grid.Column>
                    {createButton(friends[i].id, selectedFriends, setSelectedFriends)}
                </Grid.Column>
            </Grid>
        )
    }
    return cards;
};

/**
 * This component handles starting a chat with 1 or more other Users. Allows you to select the Users, then start the
 * chat, but only with Users that you are friends with.
 *
 * @param props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const StartChatModal = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        props.fetchUserAttributes(["friends"], (user) => {
            if (user && user.friends) {
                for (let i = 0; i < user.friends.length; i++) {
                    const itemType = getItemTypeFromID(user.friends[i]);
                    props.fetchItem(user.friends[i], itemType, UserCardInfo.fetchList, (friend) => {
                        if (friend) {
                            setFriends(p => [...p, friend]);
                        }
                    }, (error) => {
                        err&&console.error(error);
                    });
                }
            }
            setIsLoading(false);
        }, (error) => {
            err&&console.error(error);
            setIsLoading(false);
        });
    }, [props.user.id]);

    // To choose someone to chat with, get the
    if (isLoading) {
        return (
            <Spinner/>
        )
    }
    if (friends && friends.length > 0) {
        return (
            <Modal open={props.open} onClose={() => props.onClose()} closeIcon fluid>
                <Modal.Header> Choose friends to start the chat with! </Modal.Header>
                <Modal.Content fluid>
                    {selectChatIDButtons(friends, selectedFriends, setSelectedFriends)}
                    <Grid fluid centered width={3}>
                        <Grid.Column>
                            <Button primary fluid onClick={() => createChat(props.user.id, selectedFriends,
                                props.addToUserAttribute, props.onClose)}> Create </Button>
                        </Grid.Column>
                        <Grid.Column/>
                        <Grid.Column>
                            <Button inverted fluid onClick={() => props.onClose()}> Cancel </Button>
                        </Grid.Column>
                    </Grid>
                </Modal.Content>
            </Modal>
        );
    }
    else {
        return (<Message color='red'> Add a buddy to start a message board! </Message>);
    }
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserAttributes: (variableList, dataHandler) => {
            dispatch(fetchUserAttributes(variableList, dataHandler));
        },
        addToUserAttribute: (attributeName, attributeValue) => {
            dispatch(addToUserAttribute(attributeName, attributeValue));
        },
        fetchItem: (id, itemType, variableList, dataHandler, failureHandler) => {
            dispatch(fetchItem(id, itemType, variableList, dataHandler, failureHandler));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartChatModal);
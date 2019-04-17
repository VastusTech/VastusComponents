import React, { useState, useEffect } from "react";
import { Modal, Message, Button, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import ChallengeFunctions from "../../database_functions/ChallengeFunctions";
import {err} from "../../../Constants";
import UserCard, {UserCardInfo} from "../cards/UserCard";
import {fetchChallenge} from "../../redux/convenience/cacheItemTypeActions";
import {fetchItem} from "../../redux/actions/cacheActions";
import {getItemTypeFromID} from "../../logic/ItemType";

type Props = {
    challengeID: string
}

/**
 * Declares a winner for the given Challenge.
 *
 * @param {string} userID The ID of the User declaring the Challenge won.
 * @param {string} challengeID The ID of the Challenge to complete.
 * @param {string} winnerID The ID of the User that has won.
 * @param {function()} onClose Closes the modal.
 */
const declareWinnerButtonHandler = (userID, challengeID, winnerID, onClose) => {
    if (winnerID && challengeID && userID) {
        console.log(userID + " " + challengeID + " " + winnerID);
        ChallengeFunctions.updateWinner(userID, challengeID, winnerID, (data) => {
            // console.log("Successfully set the event winner!");
            onClose();
        }, (error) => {
            err&&console.error("Event winner setting failed");
        });
    }
};

/**
 * G
 * @param {[{id: string}]} members The list of members in the Challenge.
 * @param {string} userID The User viewing the list.
 * @param {string} challengeID The Challenge being completed.
 * @param {function()} onClose The function to close the modal.
 * @return {*} The React JSX to display the list of winner buttons.
 */
const winnerButtons = (members, userID, challengeID, onClose) => {
    const rowProps = [];
    for (let i = 0; i < members.length; i++) {
        rowProps.push(
            <Card raised key={members[i]}>
                <Card.Content>
                    <UserCard user={members[i]} />
                    <Button primary fluid onClick={() => declareWinnerButtonHandler(userID, challengeID, members[i].id, onClose)}>Select</Button>
                </Card.Content>
            </Card>
        );
    }
    return rowProps;
};

/**
 * Raises a modal for completing a Challenge by declaring a winner for it.
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const CompleteChallengeModal = (props: Props) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (props.challengeID) {
            props.fetchChallenge(props.challengeID, ["members"], (challenge) => {
                if (challenge.members) {
                    for (let i = 0; i < challenge.members.length; i++) {
                        const id = challenge.members[i];
                        const itemType = getItemTypeFromID(id);
                        props.fetchItem(itemType, id, UserCardInfo.fetchList, (user) => {
                            setMembers(p => [...p, user]);
                        });
                    }
                }
            })
        }
    }, [props.challengeID]);


    if (members.length > 0) {
        return(
            <Modal centered open={props.open} onClose={() => props.onClose()} closeIcon>
                <Modal.Header className="u-bg--bg">Select Winner</Modal.Header>
                <Modal.Content className="u-bg--bg">
                    <Card.Group itemsPerRow={2}>
                        {winnerButtons(members, props.user.id, props.challengeID, props.onClose)}
                    </Card.Group>
                </Modal.Content>
            </Modal>
        );
    }
    else {
        return (
            <Modal dimmer='blurring' open={props.open} onClose={() => props.onClose()} closeIcon>
                <Message>No members in the challenge yet!</Message>
            </Modal>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
    info: state.info,
    cache: state.cache
});

const mapDispatchToProps = dispatch => {
    return {
        fetchChallenge: (id, variableList, dataHandler, failureHandler) => {
            dispatch(fetchChallenge(id, variableList, dataHandler, failureHandler));
        },
        fetchItem: (itemType, id, variableList, dataHandler, failureHandler) => {
            dispatch(fetchItem(id, itemType, variableList, dataHandler, failureHandler));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteChallengeModal);
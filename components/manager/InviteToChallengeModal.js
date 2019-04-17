import React, { useState, useEffect, Fragment } from 'react'
import {Message, Button, Modal, Card} from 'semantic-ui-react';
import { connect } from "react-redux";
import {fetchUserAttributes} from "../../redux/actions/userActions";
import {fetchChallenges} from "../../redux/convenience/cacheItemTypeActions";
import InviteFunctions from "../../database_functions/InviteFunctions";
import ChallengeCard, {ChallengeCardInfo} from "../cards/ChallengeCard";
import {err} from "../../../Constants";
import {daysLeft, parseISOString} from "../../logic/TimeHelper";

type Props = {
    friendID: string,
    onClose: any,
    open: boolean
};

/**
 * Invites the friend to the Challenge.
 *
 * @param {string} userID The ID of the User sending the Invite.
 * @param {string} friendID The ID of the User to send the Invite to.
 * @param {string} challengeID The ID of the Challenge to invite the User to.
 * @param {function()} onClose The function to close the modal.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 * @param {function(boolean)} setIsDisabled Sets the disabled state.
 */
const handleInviteToChallenge = (userID, friendID, challengeID, onClose, setIsLoading, setIsDisabled, setError) => {
    setIsLoading(true);
    InviteFunctions.createChallengeInvite(userID, userID, friendID, challengeID, (data) => {
        onClose();
        setIsLoading(false);
        setIsDisabled(true);
    }, (error) => {
        err&&console.error(error);
        setIsLoading(false);
    });
};

/**
 * Creates the Button components for Inviting the User to a particular Challenge.
 *
 * @param {string} userID The ID of the User inviting their friend to a Challenge.
 * @param {string} friendID The ID of the User to invite.
 * @param {[{id: string}]} challenges The Challenge objects to display.
 * @param {boolean} isLoading State for loading.
 * @param {boolean} isDisabled State for if inviting is disabled.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 * @param {function(boolean)} setIsDisabled Sets the disabled state.
 * @param {function()} onClose Closes the modal.
 * @return {*} The React JSX to display the Challenge buttons.
 */
const challengeButtons = (userID, friendID, challenges, isLoading, isDisabled, setIsLoading, setIsDisabled, setError, onClose) => {
    const rowProps = [];
    for (let i = 0; i < challenges.length; i++) {
        rowProps.push(
            <Fragment key={i+1}>
                <Card fluid raised>
                    <Card.Content>
                        <ChallengeCard challenge={challenges[i]}/>
                        <Button disabled={isDisabled} loading={isLoading} primary fluid
                                onClick={() => handleInviteToChallenge(userID, friendID, challenges[i].id, onClose, setIsLoading, setIsDisabled, setError)}>
                            Invite to Challenge
                        </Button>
                    </Card.Content>
                </Card>
            </Fragment>
        );
    }
    return rowProps;
};

/**
 * TODO
 * @param error
 * @return {*}
 */
const errorHandler = (error) => {
    if (error) {
        return (
            <Message color='red'>
                <h1>Error!</h1>
                <p>{error.substr(102, 50)}</p>
            </Message>
        );
    }
};

const InviteToChallengeModalProp = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        props.fetchUserAttributes(["challenges"], (user) => {
            if (user.challenges && user.challenges.length > 0) {
                props.fetchChallenges(user.challenges, ChallengeCardInfo.fetchList, 0, user.challenges.length, (challenges) => {
                    for (let i = 0; i < challenges.length; i++) {
                        const challenge = challenges[i];
                        if (daysLeft(parseISOString(challenge.endTime)) >= 0) {
                            setChallenges(p => [...p, challenge]);
                        }
                    }
                    setIsLoading(false);
                }, (error) => {
                    err&&console.error(error);
                    setError(error);
                    setIsLoading(false);
                });
            }
            else {
                setIsLoading(false);
            }
        }, (error) => {
            err&&console.error(error);
            setError(error);
            setIsLoading(false);
        });
    }, [props.challengeID]);

    if (isLoading) {
        return(
            <Modal dimmer='blurring' open={props.open} onClose={() => props.onClose()}>
                <Message>Loading...</Message>
            </Modal>
        );
    }
    if (challenges && challenges.length > 0) {
        return(
            <Modal centered dimmer='blurring' size='large' open={props.open} onClose={() => props.onClose()} closeIcon>
                <Modal.Header className="u-bg--bg">Select Challenge</Modal.Header>
                <Modal.Content className="u-bg--bg">
                    {challengeButtons(props.user.id, props.friendID, challenges, isLoading, isDisabled, setIsLoading, setIsDisabled, setError, props.onClose)}
                </Modal.Content>
                {errorHandler(error)}
            </Modal>
        );
    }
    else {
        return(
            <Modal dimmer='blurring' open={props.open} onClose={() => props.onClose()}>
                <Message>No current challenges...</Message>
            </Modal>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
    info: state.info,
    cache: state.cache
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserAttributes: (variableList, dataHandler, failureHandler) => {
            dispatch(fetchUserAttributes(variableList, dataHandler, failureHandler));
        },
        fetchChallenges: (ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) => {
            dispatch(fetchChallenges(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteToChallengeModalProp);

import React, {useState, useEffect, Fragment} from 'react'
import {Message} from 'semantic-ui-react';
import ChallengeCard, {ChallengeCardInfo} from "../cards/ChallengeCard";
import { connect } from "react-redux";
import {fetchUserAttributes} from "../../redux/actions/userActions";
import {fetchChallenges} from "../../redux/convenience/cacheItemTypeActions";
import {parseISOString, timeLeft} from "../../logic/TimeHelper";
import Spinner from "../props/Spinner";

/**
 * Calculates the next challenge for the current User. Bases on which end time is the closest to now without being over.
 *
 * @param {{}} props  The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const NextChallengeProp = props => {
    const [nextChallenge, setNextChallenge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setNextChallenge(null);
        setIsLoading(true);
        if (props.user.challenges && props.user.challenges.length > 0) {
            props.fetchChallenges(props.user.challenges, ChallengeCardInfo.fetchList, 0, props.user.challenges.length, (challenges) => {
                for (let i = 0; i < challenges.length; i++) {
                    const challenge = challenges[i];
                    if (challenge && challenge.endTime) {
                        setNextChallenge(p => {
                            const challengeTimeLeft = timeLeft(parseISOString(challenge.endTime));
                            if (p) {
                                if (timeLeft(parseISOString(p.endTime)) < challengeTimeLeft && challengeTimeLeft > 0) {
                                    return challenge;
                                }
                                return p;
                            }
                            return challengeTimeLeft > 0 ? challenge : null;
                        });
                    }
                }
                setIsLoading(false);
            }, (error) => {

            });
        }
        else {
            setIsLoading(false);
        }
    }, [props.user.challenges]);

    if (isLoading) {
        return(
            <Spinner/>
        );
    }
    else if (nextChallenge) {
        return (
            <Fragment key={0}>
                <Message>
                    <ChallengeCard challenge={nextChallenge}/>
                </Message>
            </Fragment>
        );
    }
    else {
        // Then it's empty, no next scheduled event
        return(
            <Message>No scheduled challenges!</Message>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
    info: state.info,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserAttributes: (attributeList, dataHandler) => {
            dispatch(fetchUserAttributes(attributeList, dataHandler));
        },
        fetchChallenges: (ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) => {
            dispatch(fetchChallenges(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextChallengeProp);

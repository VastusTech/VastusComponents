import React, {useState, useEffect, Fragment} from 'react'
import _ from 'lodash'
import {Visibility, Header, Grid} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { fetchTrainerQuery } from "../../redux_convenience/cacheItemTypeActions";
import {log, err} from "../../../Constants";
import {debugAlert} from "../../logic/DebuggingHelper";
import TrainerCard, {TrainerCardInfo} from "../cards/TrainerCard";
import Spinner from "../props/Spinner";

const trainerFeedLength = 10;

type Props = {
    filter: any
};

const queryTrainers = (filter, nextToken, isFinished, friends, fetchTrainerQuery, setIsLoading, setIsFinished,
                       setNextToken, setTrainers) => {
    if (!isFinished) {
        setIsLoading(true);
        debugAlert("Fetching Trainer Feed Query");
        fetchTrainerQuery(TrainerCardInfo.fetchList, filter, trainerFeedLength, nextToken, (data) => {
            if (!data.nextToken) {
                setIsFinished(true);
            }
            if (data.items) {
                for (let i = 0; i < data.items.length; i++) {
                    const trainer = data.items[i];
                    // Filter the results based on if we are able to see it
                    setTrainers(p => [...p, trainer]);
                }
                setNextToken(data.nextToken);
            }
            else {
                // TODO Came up with no trainers
            }
            setIsLoading(false);
        }, (error) => {
            err&&console.error("Querying Groups failed!");
            err&&console.error(error);
            setIsLoading(false);
        });
    }
};

/**
 * Trainer Feed
 *
 * This is the main feed in the home page, it currently displays all public trainers inside of the database for
 * the user to see.
 */
const TrainerFeed = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [nextToken, setNextToken] = useState(null);
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        if (props.user.id) {
            setTrainers([]);
            queryTrainers(props.filter, nextToken, isFinished, props.user.friends, props.fetchTrainerQuery,
                setIsLoading, setIsFinished, setNextToken, setTrainers);
        }
    }, [props.user.id]);

    /**
     *
     * @param e
     * @param calculations
     */
    const handleUpdate = (e, { calculations }) => {
        log&&console.log(calculations.bottomVisible);
        if (calculations.bottomVisible && !isLoading) {
            log&&console.log("Next Token: " + nextToken);
            queryTrainers(props.filter, nextToken, isFinished, props.user.friends, props.fetchTrainerQuery,
                setIsLoading, setIsFinished, setNextToken, setTrainers);
        }
    };

    //This displays the rows in a grid format, with visibility enabled so that we know when the bottom of the page
    //is hit by the user.
    return (
        <Visibility onUpdate={_.debounce(handleUpdate, 250)}>
            {_.times(trainers.length, i => (
                <Fragment key={i + 1}>
                    <TrainerCard trainer={trainers[i]}/>
                </Fragment>
            ))}
            {!isFinished&&<Spinner/>}
        </Visibility>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrainerQuery: (variablesList, filter, limit, nextToken, dataHandler, failureHandler) => {
            dispatch(fetchTrainerQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainerFeed);

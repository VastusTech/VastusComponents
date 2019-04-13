import React, {useState, useEffect, Fragment} from 'react'
import _ from 'lodash'
import {Visibility, Header, Grid} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { fetchTrainerQuery } from "../../redux/convenience/cacheItemTypeActions";
import {log, err} from "../../../Constants";
import {debugAlert} from "../../logic/DebuggingHelper";
import TrainerCard, {TrainerCardInfo} from "../cards/TrainerCard";
import Spinner from "../props/Spinner";

const trainerFeedLength = 10;

type Props = {
    filter: any
};

/**
 * Fetches another set of Trainers with a query for the feed.
 *
 * @param {{}} filter The GraphQL filter to dictate how the query filters the objects.
 * @param {string|null} nextToken The next token from the previous query or null if it's the first query.
 * @param {boolean} isFinished If the querying has finished and there are no more objects to fetch.
 * @param {[string]} friends The friends list of the User viewing this Trainer Feed.
 * @param {function([string], {}, number, string, function({}), function(error))} fetchTrainerQuery The cache function
 * to fetch a Group query.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 * @param {function(boolean)} setIsFinished Sets the if finished state.
 * @param {function(string)} setNextToken Sets the next token state.
 * @param {function([{}])} setTrainers Sets the trainers state.
 */
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
 * Displays a feed of Trainers which are queried using the filter provided. Also uses the semantic ui react Visibility
 * module in order to delay fetching of Posts until directly requested.
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
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

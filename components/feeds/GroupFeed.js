import React, {useState, useEffect, Fragment} from 'react'
import _ from 'lodash'
import {Visibility, Header, Grid} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { fetchGroupQuery } from "../../redux/convenience/cacheItemTypeActions";
import {log, err} from "../../../Constants";
import {debugAlert} from "../../logic/DebuggingHelper";
import GroupCard, {GroupCardInfo} from "../cards/GroupCard";
import {arraysIntersect} from "../../logic/ArrayHelper";
import Spinner from "../props/Spinner";

const groupFeedLength = 50;

type Props = {
    filter: any
};

/**
 * Fetches another set of Groups with a query for the feed.
 *
 * @param {{}} filter The GraphQL filter to dictate how the query filters the objects.
 * @param {string|null} nextToken The next token from the previous query or null if it's the first query.
 * @param {boolean} isFinished If the querying has finished and there are no more objects to fetch.
 * @param {[string]} friends The friends list of the User viewing this Group Feed.
 * @param {function([string], {}, number, string, function({}), function(error))} fetchGroupQuery The redux function to
 * fetch a Group query.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 * @param {function(boolean)} setIsFinished Sets the if finished state.
 * @param {function(string)} setNextToken Sets the next token state.
 * @param {function([{}])} setGroups Sets the groups state.
 */
const queryGroups = (filter, nextToken, isFinished, friends, fetchGroupQuery, setIsLoading, setIsFinished, setNextToken,
                    setGroups) => {
    if (!isFinished) {
        setIsLoading(true);
        debugAlert("Fetching Group Feed Query");
        fetchGroupQuery(GroupCardInfo.fetchList, filter, groupFeedLength, nextToken, (data) => {
            if (!data.nextToken) {
                setIsFinished(true);
            }
            if (data.items) {
                for (let i = 0; i < data.items.length; i++) {
                    const group = data.items[i];
                    // Filter the results based on if we are able to see it
                    //TODO: Switch this back to public when the styling is done!!!!!!!!!!!!!!!
                    if (group.access === "private" || (friends && arraysIntersect(friends, group.owners))) {
                        // TODO Fetch any information about the groups!!!
                        setGroups(p => [...p, group]);
                    }
                    else {
                        debugAlert("NOT SHOWING: " + JSON.stringify(group));
                    }
                }
                setNextToken(data.nextToken);
            }
            else {
                // TODO Came up with no events
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
 * Displays a feed of Groups which are queried using the filter provided. Also uses the semantic ui react Visibility
 * module in order to delay fetching of Groups until directly requested.
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const GroupFeed = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [nextToken, setNextToken] = useState(null);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (props.user.id) {
            setGroups([]);
            queryGroups(props.filter, nextToken, isFinished, props.user.friends, props.fetchGroupQuery,
                setIsLoading, setIsFinished, setNextToken, setGroups);
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
            queryGroups(props.filter, nextToken, isFinished, props.user.friends, props.fetchGroupQuery,
                setIsLoading, setIsFinished, setNextToken, setGroups);
        }
    };

    //This displays the rows in a grid format, with visibility enabled so that we know when the bottom of the page
    //is hit by the user.
    return (
        <Visibility onUpdate={_.debounce(handleUpdate, 250)} style={{minWidth: '300px'}}>
            {_.times(groups.length, i => (
                <Fragment key={i + 1}>
                    <GroupCard group={groups[i]} />
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
        fetchGroupQuery: (variablesList, filter, limit, nextToken, dataHandler, failureHandler) => {
            dispatch(fetchGroupQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupFeed);

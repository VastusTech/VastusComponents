import React, {useState, useEffect, Fragment} from 'react'
import _ from 'lodash'
import {Visibility, Header, Grid} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { fetchGroupQuery, putGroupQuery } from "../../redux_actions/cacheActions";
import {log, err} from "../../../Constants";
import {debugAlert} from "../../logic/DebuggingHelper";
import GroupCard, {GroupCardInfo} from "../cards/GroupCard";
import {arraysIntersect} from "../../logic/ArrayHelper";
import Spinner from "../props/Spinner";

const groupFeedLength = 50;

type Props = {
    filter: any
};

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
                    if (group.access === "public" || (friends && arraysIntersect(friends, group.owners))) {
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
 * Event Feed
 *
 * This is the main feed in the home page, it currently displays all public events inside of the database for
 * the user to see.
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
        <Visibility onUpdate={_.debounce(handleUpdate, 250)}>
            {_.times(groups.length, i => (
                <Fragment key={i + 1}>
                    <GroupCard group={groups[i]}/>
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

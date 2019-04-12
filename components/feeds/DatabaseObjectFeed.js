import React, {useState, useEffect, Fragment} from 'react'
import _ from 'lodash'
import {Visibility} from 'semantic-ui-react'
import { connect } from 'react-redux';
import {fetchItemQuery} from "../../redux/actions/cacheActions";
import {log, err} from "../../../Constants";
import {debugAlert} from "../../logic/DebuggingHelper";
import GroupCard, {GroupCardInfo} from "../cards/GroupCard";
import {switchReturnItemType} from "../../logic/ItemType";
import ClientCard, {ClientCardInfo} from "../cards/ClientCard";
import {TrainerCardInfo} from "../cards/TrainerCard";
import {EventCardInfo} from "../cards/EventCard";
import {ChallengeCardInfo} from "../cards/ChallengeCard";
import {PostCardInfo} from "../cards/PostCard";
import TrainerCard from "../cards/TrainerCard";
import EventCard from "../cards/EventCard";
import ChallengeCard from "../cards/ChallengeCard";
import PostCard from "../cards/PostCard";
import Spinner from "../props/Spinner";

// TODO Don't use this for Posts or anything that needs to fetch with more depth.

const objectFeedLength = 50;

type Props = {
    itemType: string,
    filter?: any,
    filterFunction?: (any) => boolean
};

const queryObjects = (itemType, filter, filterFunction, nextToken, isFinished, fetchItemQuery, setIsLoading,
                      setIsFinished, setNextToken, setObjects, setComponents) => {
    if (!isFinished) {
        setIsLoading(true);
        debugAlert("Fetching Object Feed Query");
        const fetchList = switchReturnItemType(itemType,
            ClientCardInfo.fetchList,
            TrainerCardInfo.fetchList,
            null, null, null,
            EventCardInfo.fetchList,
            ChallengeCardInfo.fetchList,
            null,
            PostCardInfo.fetchList,
            GroupCardInfo.fetchList,
            null, null, null, null, "Could not retrieve for Database Object Feed");
        fetchItemQuery(itemType, fetchList, filter, objectFeedLength, nextToken, (data) => {
            if (!data.nextToken) {
                setIsFinished(true);
            }
            if (data.items) {
                for (let i = 0; i < data.items.length; i++) {
                    const object = data.items[i];
                    // Filter the results based on if we are able to see it
                    if (!filterFunction || filterFunction(object)) {
                        // TODO Fetch any information about the groups!!!
                        setObjects(p => [...p, object]);
                        setComponents(p => ({
                            ...p,
                            [object.id]: switchReturnItemType(itemType,
                                <ClientCard client={object}/>,
                                <TrainerCard trainer={object}/>,
                                null, null, null,
                                <EventCard event={object}/>,
                                <ChallengeCard challenge={object}/>,
                                null,
                                <PostCard post={object} by={null}/>,
                                <GroupCard group={object}/>,
                                null, null, null, null,
                                "Database Object Feed Item Type not implemented for type")
                        }));
                    }
                    else {
                        debugAlert("NOT SHOWING: " + JSON.stringify(object));
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
    const [objects, setObjects] = useState([]);
    const [components, setComponents] = useState({});

    useEffect(() => {
        if (props.user.id) {
            setObjects([]);
            queryObjects(props.itemType, props.filter, props.filterFunction, nextToken, isFinished,
                props.fetchItemQuery, setIsLoading, setIsFinished, setNextToken, setObjects, setComponents);
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
            queryObjects(props.itemType, props.filter, props.filterFunction, nextToken, isFinished,
                props.fetchItemQuery, setIsLoading, setIsFinished, setNextToken, setObjects, setComponents);
        }
    };

    //This displays the rows in a grid format, with visibility enabled so that we know when the bottom of the page
    //is hit by the user.
    return (
        <Visibility onUpdate={_.debounce(handleUpdate, 250)}>
            {_.times(objects.length, i => (
                <Fragment key={i + 1}>
                    {components[objects[i].id]}
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
        fetchItemQuery: (itemType, variablesList, filter, limit, nextToken, dataHandler, failureHandler) => {
            dispatch(fetchItemQuery(itemType, variablesList, filter, limit, nextToken, dataHandler, failureHandler));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupFeed);

import React, { useState, useEffect } from 'react'
import _ from "lodash";
import { List, Message, Visibility } from 'semantic-ui-react';
import ClientCard, {ClientCardInfo} from "../cards/ClientCard";
import { connect } from "react-redux";
import {fetchItems} from "../../redux/actions/cacheActions";
import Spinner from "../props/Spinner";
import {getItemTypeFromID, switchReturnItemType} from "../../logic/ItemType";
import TrainerCard, {TrainerCardInfo} from "../cards/TrainerCard";
import EventCard from "../cards/EventCard";
import ChallengeCard, {ChallengeCardInfo} from "../cards/ChallengeCard";
import PostCard from "../cards/PostCard";
import {shuffleArray} from "../../logic/ArrayHelper";

// TODO Test the new "visibility" fetch system!
// TODO USING VISIBILITY WITH A MODAL DOESN'T WORK?

const numFetch = 5;

type Props = {
    ids: [string],
    noObjectsMessage: string,
    acceptedItemTypes?: [string],
    randomized: boolean,
    sortFunction?: any
}

/**
 * Gets the components for the objects in the list.
 *
 * @param {[{id: string, item_type: string}]} objects The database objects to display in the list.
 * @return {[*]} The list of React JSX components to display in the list.
 */
export const objectComponents = (objects) => {
    const components = [];
    for (const key in objects) {
        if (objects.hasOwnProperty(key)) {
            components.push(
                <List.Item key={key}>
                    {getObjectComponent(parseInt(key) + 1, objects[key])}
                </List.Item>
            );
        }
    }
    return components;
};

/**
 * Gets a single database object component card for the list.
 *
 * @param {number} key The key of the object in the list (order / rank).
 * @param {{id: string, item_type: string}} object The object to display as the component.
 * @return {*} The React JSX to display the object component.
 */
export const getObjectComponent = (key, object) => (
    switchReturnItemType(object.item_type,
        <ClientCard rank={key} client={object}/>,
        <TrainerCard rank={key} trainer={object}/>,
        null,
        null,
        null,
        <EventCard event={object}/>,
        <ChallengeCard challenge={object}/>,
        null,
        <PostCard postID={object.id}/>,
        null,
        null,
        null,
        null,
        "Get database object list object not implemented for item type"
    )
);

/**
 * Uses the Batch Fetch system of GraphQL to fetch more objects of the same type together.
 *
 * @param {{}} typeIDs The map of item types to the ids for that type.
 * @param {{}} typeHiddenIDIndex The map of item types to the hidden id index for that type.
 * @param {boolean} randomized If the list should be randomized.
 * @param {function(*, *)} sortFunction Function to sort the list by, if applicable.
 * @param {function([{}])} setVisibleObjects Sets the visible objects state.
 * @param {function({})} setTypeHiddenIDIndex Sets the hidden id indexes for each type.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 * @param {function(string, string, [string], number, number, function([{}]), function(error))} fetchItems Cache redux
 * function to perform a batch fetch operation.
 */
export const batchFetchMoreObjects = (typeIDs, typeHiddenIDIndex, randomized, sortFunction, setVisibleObjects, setTypeHiddenIDIndex, setIsLoading, fetchItems) => {
    setIsLoading(true);
    for (const itemType in typeIDs) {
        if (typeIDs.hasOwnProperty(itemType)) {
            const ids = typeIDs[itemType];
            const hiddenIndex = typeHiddenIDIndex[itemType];
            const variableList = switchReturnItemType(itemType,
                ClientCardInfo.fetchList,
                TrainerCardInfo.fetchList,
                null, null, null,
                EventCard.fetchVariableList,
                ChallengeCardInfo.fetchList,
                null,
                PostCard.fetchVariableList,
                null, null, null, null, null,
                "Get variable list from item type not implemented!");
            // alert(ids.length + " vs " + hiddenIndex);
            if (ids.length > hiddenIndex) {
                fetchItems(ids, itemType, variableList, hiddenIndex, numFetch, (items) => {
                    for (let i = 0; i < items.length; i++) {
                        addObject(items[i], randomized, sortFunction, setVisibleObjects, setIsLoading);
                    }
                    setTypeHiddenIDIndex(p => ({
                        ...p,
                        [itemType]: p[itemType] + items.length
                    }));
                    setIsLoading(false);
                });
            }
            else {
                setIsLoading(false);
            }
        }
    }
};

/**
 * Adds a single object to the visible objects and randomizes or sorts the list.
 *
 * @param {{id: string, item_type: string}} object The object to add to the visible objects.
 * @param {boolean} randomized Whether the list should be randomized or not.
 * @param {function(*, *)} sortFunction Function to sort the list by, if applicable.
 * @param {function([{}])} setVisibleObjects Sets the visible objects state.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 */
export const addObject = (object, randomized, sortFunction, setVisibleObjects, setIsLoading) => {
    if (object && object.id) {
        setVisibleObjects(p => {
            const a = [...p, object];
            if (randomized) { shuffleArray(a) }
            if (sortFunction) { a.sort(sortFunction); }
            return a;
        });
        setIsLoading(false);
    }
};

/**
 * Displays a list of objects from the database, using the props
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const DatabaseObjectList = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ids, setIDs] = useState(null);
    const [typeIDs, setTypeIDs] = useState({});
    const [typeHiddenIDIndex, setTypeHiddenIDIndex] = useState({});
    const [visibleObjects, setVisibleObjects] = useState([]);
    // const [visibleComponents, setVisibleComponents] = useState({});
    // const [hiddenIDIndex, setHiddenIDIndex] = useState(0);

    // Component will receive new props
    useEffect(() => {
        if (props.ids && JSON.stringify(props.ids) !== JSON.stringify(ids)) {
            setIsLoading(true);
            const idsTemp = [...props.ids];
            if (props.randomized === true) {
                shuffleArray(idsTemp)
            }
            setIDs(idsTemp);
            // setHiddenIDIndex(0);
            setVisibleObjects([]);
            const typeIDsTemp = {};
            const typeHiddenIDIndexTemp = {};
            for (let i = 0; i < idsTemp.length; i++) {
                const id = idsTemp[i];
                const itemType = getItemTypeFromID(id);
                if (!props.acceptedItemTypes || props.acceptedItemTypes.includes(itemType)) {
                    if (typeIDsTemp[itemType]) {
                        typeIDsTemp[itemType].push(id);
                    }
                    else {
                        typeIDsTemp[itemType] = [id];
                        typeHiddenIDIndexTemp[itemType] = 0;
                    }
                }
            }
            setTypeIDs(typeIDsTemp);
            setTypeHiddenIDIndex(typeHiddenIDIndexTemp);
            batchFetchMoreObjects(typeIDsTemp, typeHiddenIDIndexTemp, props.randomized === true, props.sortFunction,
                setVisibleObjects, setTypeHiddenIDIndex, setIsLoading, props.fetchItems);
        }
    }, [props.ids]);

    const handleVisibilityUpdate = (e, {calculations}) => {
        // alert("hey");
        // alert(JSON.stringify(calculations));
        console.log(calculations);
        if (calculations.bottomVisible) {
            // alert("Bottom visible");
            // alert(JSON.stringify(typeHiddenIDIndex));
            batchFetchMoreObjects(typeIDs, typeHiddenIDIndex, props.randomized === true, props.sortFunction,
                setVisibleObjects, setTypeHiddenIDIndex, setIsLoading, props.fetchItems);
        }
    };

    if (isLoading) {
        return(
            <Spinner/>
        )
    }
    if (ids && ids.length > 0) {
        return(
            <div>
                <Visibility onUpdate={_.debounce(handleVisibilityUpdate, 250)}>
                    <List relaxed verticalAlign="middle">
                        {objectComponents(visibleObjects)}
                        <Spinner loading={
                            (() => {
                                for (const itemType in typeIDs) {
                                    if (typeIDs.hasOwnProperty(itemType)) {
                                        if (typeIDs[itemType].length !== typeHiddenIDIndex[itemType]) {
                                            return true
                                        }
                                    }
                                }
                                return false;
                            })()
                        }/>
                    </List>
                </Visibility>
            </div>
        );
    }
    else {
        return(
            <Message>{props.noObjectsMessage}</Message>
        );
    }
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItems: (ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler) => {
            dispatch(fetchItems(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler));
        }
    };
};

DatabaseObjectList.defaultProps = {
    randomized: false
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseObjectList);

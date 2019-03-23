import React, { useState, useEffect } from 'react'
import { List, Message, Visibility } from 'semantic-ui-react';
import ClientCard from "../cards/ClientCard";
import { connect } from "react-redux";
import {fetchItem} from "../../redux_actions/cacheActions";
import Spinner from "../props/Spinner";
import {getItemTypeFromID, switchReturnItemType} from "../../logic/ItemType";
import TrainerCard from "../cards/TrainerCard";
import EventCard from "../cards/EventCard";
import ChallengeCard from "../cards/ChallengeCard";
import PostCard from "../cards/PostCard";
import _ from "lodash";

// TODO Test the new "visibility" fetch system!
// TODO USING VISIBILITY WITH A MODAL DOESN'T WORK?
// TODO ALSO OFTEN ONE PERSON IS MISSING for some reason?

const numFetch = 10000000;

type Props = {
    ids: [string],
    noObjectsMessage: string,
    acceptedItemTypes?: [string],
    sortFunction?: any
}

function objectComponents(objects, sortFunction) {
    const objectList = [...objects];
    const components = [];
    if (sortFunction) {
        objectList.sort(sortFunction);
    }
    for (const key in objectList) {
        if (objectList.hasOwnProperty(key)) {
            const id = objectList[key].id;
            const itemType = objectList[key].item_type;
            const rank = parseInt(key) + 1;
            components.push(
                <List.Item key={key}>
                    {switchReturnItemType(itemType,
                        <ClientCard rank={rank} clientID={id}/>,
                        <TrainerCard rank={rank} trainer={objectList[key]}/>,
                        null,
                        null,
                        null,
                        <EventCard eventID={id}/>,
                        <ChallengeCard challengeID={id}/>,
                        null,
                        <PostCard postID={id}/>,
                        null,
                        null,
                        null,
                        null,
                        "Get database object list object not implemented for item type"
                    )}
                </List.Item>
            );
            // components.push()
        }
    }
    return components;
}

const fetchMoreObjects = (ids, acceptedItemTypes, hiddenIDIndex, setHiddenIDIndex, setVisibleObjects, setIsLoading, fetchItem) => {
    setIsLoading(true);
    const endIndex = Math.min(ids.length, hiddenIDIndex + numFetch);
    for (let i = hiddenIDIndex; i < endIndex; i++) {
        const id = ids[i];
        const itemType = getItemTypeFromID(id);
        if (!acceptedItemTypes || acceptedItemTypes.includes(itemType)) {
            const variableList = switchReturnItemType(itemType,
                ClientCard.fetchVariableList,
                TrainerCard.fetchVariableList,
                null, null, null,
                EventCard.fetchVariableList,
                ChallengeCard.fetchVariableList,
                null,
                PostCard.fetchVariableList,
                null, null, null, null, null,
                "Get variable list from item type not implemented!");
            fetchItem(itemType, id, variableList, (o) => addObject(o, setVisibleObjects, setIsLoading));
        }
    }
    if (hiddenIDIndex === endIndex) {
        setIsLoading(false);
    }
    setHiddenIDIndex(endIndex);
};

const addObject = (object, setVisibleObjects, setIsLoading) => {
    if (object) {
        setVisibleObjects(p => [...p, object]);
        setIsLoading(false);
    }
};


const DatabaseObjectList = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ids, setIDs] = useState(null);
    const [visibleObjects, setVisibleObjects] = useState([]);
    const [hiddenIDIndex, setHiddenIDIndex] = useState(0);

    // Callback for visible objects updated
    useEffect(() => {
        if (ids) {
            fetchMoreObjects(ids, props.acceptedItemTypes, hiddenIDIndex, setHiddenIDIndex, setVisibleObjects, setIsLoading, props.fetchItem);
        }
    }, [visibleObjects]);

    // Component will receive new props
    useEffect(() => {
        if (props.ids && JSON.stringify(props.ids) !== JSON.stringify(ids)) {
            setIDs(props.ids);
            setHiddenIDIndex(0);
            setVisibleObjects([]);
        }
    }, [props]);

    // alert("defining a function here");


    // const handleVisibilityUpdate = (e, {calculations}) => {
    //     // alert("hey");
    //     // alert(JSON.stringify(calculations));
    //     console.log(calculations);
    //     if (calculations.bottomVisible) {
    //         fetchMoreObjects();
    //     }
    // };

    if (isLoading) {
        return(
            <Spinner/>
        )
    }
    if (ids && ids.length > 0) {
        return(
            <div>
                <List relaxed verticalAlign="middle">
                    {objectComponents(visibleObjects, props.sortFunction)}
                </List>
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
        fetchItem: (itemType, id, variableList, dataHandler, failureHandler) => {
            dispatch(fetchItem(itemType, id, variableList, dataHandler, failureHandler));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseObjectList);

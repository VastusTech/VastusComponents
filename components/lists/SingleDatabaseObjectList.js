// TODO This will be for a database object list that only has a single item type

// import React, { useState, useEffect } from 'react'
// import { List, Message, Visibility } from 'semantic-ui-react';
// import ClientCard, {ClientCardInfo} from "../cards/ClientCard";
// import { connect } from "react-redux";
// import {fetchItem, fetchItems} from "../../redux_actions/cacheActions";
// import Spinner from "../props/Spinner";
// import {getItemTypeFromID, switchReturnItemType} from "../../logic/ItemType";
// import TrainerCard, {TrainerCardInfo} from "../cards/TrainerCard";
// import EventCard from "../cards/EventCard";
// import ChallengeCard, {ChallengeCardInfo} from "../cards/ChallengeCard";
// import PostCard from "../cards/PostCard";
// import {shuffleArray} from "../../logic/ArrayHelper";
//
// // TODO Test the new "visibility" fetch system!
// // TODO USING VISIBILITY WITH A MODAL DOESN'T WORK?
// // TODO ALSO OFTEN ONE PERSON IS MISSING for some reason?
//
// const numFetch = 10000000;
//
// type Props = {
//     ids: [string],
//     itemType: string,
//     noObjectsMessage: string,
//     randomized: boolean,
//     sortFunction?: any
// }
//
// function objectComponents(objects, visibleComponents) {
//     const components = [];
//     for (const key in objects) {
//         if (objects.hasOwnProperty(key)) {
//             const id = objects[key].id;
//             components.push(
//                 <List.Item key={key}>
//                     {visibleComponents[id]}
//                 </List.Item>
//             );
//         }
//     }
//     return components;
// }
// const getObjectComponent = (key, object: {id: string, item_type: string}) => (
//     switchReturnItemType(object.item_type,
//         <ClientCard rank={key} client={object}/>,
//         <TrainerCard rank={key} trainer={object}/>,
//         null,
//         null,
//         null,
//         <EventCard event={object}/>,
//         <ChallengeCard challenge={object}/>,
//         null,
//         <PostCard postID={object.id}/>,
//         null,
//         null,
//         null,
//         null,
//         "Get database object list object not implemented for item type"
//     )
// );
// const fetchMoreObjects = (ids, acceptedItemTypes, randomized, sortFunction, hiddenIDIndex, setHiddenIDIndex, setVisibleObjects, setVisibleComponents, setIsLoading, fetchItem) => {
//     setIsLoading(true);
//     const endIndex = Math.min(ids.length, hiddenIDIndex + numFetch);
//     for (let i = hiddenIDIndex; i < endIndex; i++) {
//         const id = ids[i];
//         const itemType = getItemTypeFromID(id);
//         if (!acceptedItemTypes || acceptedItemTypes.includes(itemType)) {
//             const variableList = switchReturnItemType(itemType,
//                 ClientCardInfo.fetchList,
//                 TrainerCardInfo.fetchList,
//                 null, null, null,
//                 EventCard.fetchVariableList,
//                 ChallengeCardInfo.fetchList,
//                 null,
//                 PostCard.fetchVariableList,
//                 null, null, null, null, null,
//                 "Get variable list from item type not implemented!");
//             fetchItem(itemType, id, variableList, (o) => addObject(o, sortFunction, randomized, setVisibleObjects, setVisibleComponents, setIsLoading));
//         }
//     }
//     if (hiddenIDIndex === endIndex) {
//         setIsLoading(false);
//     }
//     setHiddenIDIndex(endIndex);
// };
//
// const addObject = (object, sortFunction, randomized, setVisibleObjects, setVisibleComponents, setIsLoading) => {
//     if (object && object.id) {
//         setVisibleObjects(p => {
//             const a = [...p, object];
//             const key = a.length;
//             if (randomized) { shuffleArray(a) }
//             if (sortFunction) { a.sort(sortFunction); }
//             setVisibleComponents(p => {
//                 const newComps = {
//                     ...p,
//                     [object.id]: getObjectComponent(key, object)
//                 };
//                 if (sortFunction) {
//                     for (const i in a) {
//                         if (a.hasOwnProperty(i)) {
//                             if (newComps[a[i].id].props.rank !== parseInt(i) + 1) {
//                                 newComps[a[i].id] = getObjectComponent(parseInt(i) + 1, a[i]);
//                             }
//                         }
//                     }
//                 }
//                 return newComps;
//             });
//             return a;
//         });
//         setIsLoading(false);
//     }
// };
//
// const DatabaseObjectList = (props: Props) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [ids, setIDs] = useState(null);
//     const [typeIDs, setTypeIDs] = useState({});
//     const [visibleObjects, setVisibleObjects] = useState([]);
//     const [visibleComponents, setVisibleComponents] = useState({});
//     const [hiddenIDIndex, setHiddenIDIndex] = useState(0);
//
//     // Callback for visible objects updated
//     useEffect(() => {
//         if (ids) {
//             const randomized = props.randomized === "true";
//
//             for (sh)
//                 // TODO Do some extra processing here and compile a list of different item types to use "batch fetch" on
//
//                 fetchMoreObjects(ids, props.acceptedItemTypes, randomized, props.sortFunction, hiddenIDIndex, setHiddenIDIndex,
//                     setVisibleObjects, setVisibleComponents, setIsLoading, props.fetchItem);
//         }
//     }, [visibleObjects]);
//
//     // Component will receive new props
//     useEffect(() => {
//         if (props.ids && JSON.stringify(props.ids) !== JSON.stringify(ids)) {
//             const ids = [...props.ids];
//             if (props.randomized === true) {
//                 shuffleArray()
//             }
//             setIDs(props.ids);
//             setHiddenIDIndex(0);
//             setVisibleObjects([]);
//         }
//     }, [props]);
//
//     // alert("defining a function here");
//
//
//     // const handleVisibilityUpdate = (e, {calculations}) => {
//     //     // alert("hey");
//     //     // alert(JSON.stringify(calculations));
//     //     console.log(calculations);
//     //     if (calculations.bottomVisible) {
//     //         fetchMoreObjects();
//     //     }
//     // };
//
//     if (isLoading) {
//         return(
//             <Spinner/>
//         )
//     }
//     if (ids && ids.length > 0) {
//         return(
//             <div>
//                 <List relaxed verticalAlign="middle">
//                     {objectComponents(visibleObjects, visibleComponents)}
//                 </List>
//             </div>
//         );
//     }
//     else {
//         return(
//             <Message>{props.noObjectsMessage}</Message>
//         );
//     }
// };
//
// const mapStateToProps = () => ({});
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchItem: (itemType, id, variableList, dataHandler, failureHandler) => {
//             dispatch(fetchItem(itemType, id, variableList, dataHandler, failureHandler));
//         },
//     };
// };
//
// DatabaseObjectList.defaultProps = {
//     randomized: false
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(DatabaseObjectList);
//

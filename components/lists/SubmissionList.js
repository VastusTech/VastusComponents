import React, { useState, useEffect } from 'react'
import { List, Message, Visibility } from 'semantic-ui-react';
import { connect } from "react-redux";
import {fetchSubmission} from "../../redux_actions/cacheActions";
import Spinner from "../props/Spinner";
import SubmissionCard, {SubmissionCardInfo} from "../cards/SubmissionCard";
import {getItemTypeFromID} from "../../logic/ItemType";
import {err} from "../../../Constants";

// TODO Test the new "visibility" fetch system!
// TODO USING VISIBILITY WITH A MODAL DOESN'T WORK?
// TODO ALSO OFTEN ONE PERSON IS MISSING for some reason?

const numFetch = 10000000;

type Props = {
    ids: [string],
    noSubmissionsMessage: string,
    sortFunction?: any
}

function submissionComponents(submissions, visibleComponents) {
    const components = [];
    for (const key in submissions) {
        if (submissions.hasOwnProperty(key)) {
            const id = submissions[key].id;
            components.push(
                <List.Item key={key}>
                    {visibleComponents[id]}
                </List.Item>
            );
        }
    }
    return components;
}
const getObjectComponent = (key, object: {id: string, item_type: string}) => (
    <SubmissionCard submission={object}/>
);
const fetchMoreObjects = (ids, sortFunction, hiddenIDIndex, setHiddenIDIndex, setVisibleSubmissions, setVisibleComponents, setIsLoading, fetchSubmission) => {
    const endIndex = Math.min(ids.length, hiddenIDIndex + numFetch);
    for (let i = hiddenIDIndex; i < endIndex; i++) {
        if (getItemTypeFromID(ids[i]) !== "Submission") {
            err&&console.error("Found non-submission: " + ids[i] + " in the submission list!");
        }
        else {
            setIsLoading(true);
            fetchSubmission(ids[i], SubmissionCardInfo.fetchList, (o) => addObject(o, sortFunction, setVisibleSubmissions, setVisibleComponents, setIsLoading));
        }
    }
    if (hiddenIDIndex === endIndex) {
        setIsLoading(false);
    }
    setHiddenIDIndex(endIndex);
};

const addObject = (object, sortFunction, setVisibleSubmissions, setVisibleComponents, setIsLoading) => {
    if (object && object.id) {
        setVisibleSubmissions(p => {
            const a = [...p, object];
            const key = a.length;
            if (sortFunction) { a.sort(sortFunction); }
            setVisibleComponents(p => {
                const newComps = {
                    ...p,
                    [object.id]: getObjectComponent(key, object)
                };
                if (sortFunction) {
                    for (const i in a) {
                        if (a.hasOwnProperty(i)) {
                            if (newComps[a[i].id].props.rank !== parseInt(i) + 1) {
                                newComps[a[i].id] = getObjectComponent(parseInt(i) + 1, a[i]);
                            }
                        }
                    }
                }
                return newComps;
            });
            return a;
        });
        setIsLoading(false);
    }
};

const SubmissionList = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ids, setIDs] = useState(null);
    const [visibleSubmissions, setVisibleSubmissions] = useState([]);
    const [visibleComponents, setVisibleComponents] = useState({});
    const [hiddenIDIndex, setHiddenIDIndex] = useState(0);

    // Callback for visible objects updated
    useEffect(() => {
        if (ids) {
            fetchMoreObjects(ids, props.sortFunction, hiddenIDIndex, setHiddenIDIndex,
                setVisibleSubmissions, setVisibleComponents, setIsLoading, props.fetchSubmission);
        }
    }, [visibleSubmissions]);

    // Component will receive new props
    useEffect(() => {
        if (props.ids && JSON.stringify(props.ids) !== JSON.stringify(ids)) {
            setIDs(props.ids);
            setHiddenIDIndex(0);
            setVisibleSubmissions([]);
        }
    }, [props.ids]);

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
    if (visibleSubmissions && visibleSubmissions.length > 0) {
        return(
            <div>
                <List relaxed verticalAlign="middle">
                    {submissionComponents(visibleSubmissions, visibleComponents)}
                </List>
            </div>
        );
    }
    else {
        return(
            <Message>{props.noSubmissionsMessage}</Message>
        );
    }
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSubmission: (id, variableList, dataHandler, failureHandler) => {
            dispatch(fetchSubmission(id, variableList, dataHandler, failureHandler));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionList);

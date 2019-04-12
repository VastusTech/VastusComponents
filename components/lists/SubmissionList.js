import React, { useState, useEffect } from 'react'
import { List, Message, Visibility } from 'semantic-ui-react';
import { connect } from "react-redux";
import {fetchSubmission} from "../../redux/convenience/cacheItemTypeActions";
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

function submissionComponents(submissions) {
    const components = [];
    for (const key in submissions) {
        if (submissions.hasOwnProperty(key)) {
            components.push(
                <List.Item key={key}>
                    <SubmissionCard submission={submissions[key]}/>
                </List.Item>
            );
        }
    }
    return components;
}
const fetchMoreObjects = (ids, sortFunction, hiddenIDIndex, setHiddenIDIndex, setVisibleSubmissions, setIsLoading, fetchSubmission) => {
    const endIndex = Math.min(ids.length, hiddenIDIndex + numFetch);
    for (let i = hiddenIDIndex; i < endIndex; i++) {
        if (getItemTypeFromID(ids[i]) !== "Submission") {
            err&&console.error("Found non-submission: " + ids[i] + " in the submission list!");
        }
        else {
            setIsLoading(true);
            fetchSubmission(ids[i], SubmissionCardInfo.fetchList, (o) => addObject(o, sortFunction, setVisibleSubmissions, setIsLoading));
        }
    }
    if (hiddenIDIndex === endIndex) {
        setIsLoading(false);
    }
    setHiddenIDIndex(endIndex);
};

const addObject = (object, sortFunction, setVisibleSubmissions, setIsLoading) => {
    if (object && object.id) {
        setVisibleSubmissions(p => {
            const a = [...p, object];
            if (sortFunction) { a.sort(sortFunction); }
            return a;
        });
        setIsLoading(false);
    }
};

const SubmissionList = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ids, setIDs] = useState(null);
    const [visibleSubmissions, setVisibleSubmissions] = useState([]);
    const [hiddenIDIndex, setHiddenIDIndex] = useState(0);

    // Callback for visible objects updated
    useEffect(() => {
        if (ids) {
            fetchMoreObjects(ids, props.sortFunction, hiddenIDIndex, setHiddenIDIndex,
                setVisibleSubmissions, setIsLoading, props.fetchSubmission);
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
                    {submissionComponents(visibleSubmissions)}
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

import React, {useState, useEffect} from 'react';
import {Card, Dimmer, Loader, Grid, Icon, Image, Divider, Button, Feed} from 'semantic-ui-react';
import {getAttributeFromObject, getObjectAttribute} from "../../logic/CacheRetrievalHelper";
import {convertFromISO} from "../../logic/TimeHelper";
import {Player} from "video-react";
import { connect } from 'react-redux';

export const SubmissionCardInfo = {
    fetchList: ["id", "time_created", "by", "item_type", "about", "description", "videoPaths", "picturePaths"],
    ifSubscribe: false
};


type Props = {
    rank?: number,
    submission: {
        id: string,
        time_created: string,
        by: string,
        item_type: string,
        about: string,
        description: string,
        picturePaths: [string],
        pictures: [string],
        videoPaths: [string],
        videos: [string]
    }
}

// TODO Make this look better?

/**
 * Displays the image and video media for the submissions.
 *
 * @param {[]} pictures A list of all the pictures in the submission
 * @param {[]} videos A list of all the videos in the submission
 * @returns {*} The React JSX used to display the video or image in a post.
 */
const getDisplayMedia = (pictures, videos, props) => {
    // TODO How to properly display videos and pictures?
    if (videos && videos.length > 0) {
        //console.log("Video URL:" + this.state.videoURL);
        return (
            <Player inline={true}>
                <source src={videos[0]} type="video/mp4"/>
            </Player>
        );
    }
    return getAttributeFromObject(props.submission, "description");
};

// function createCorrectButton(isOwned, deleteHandler, isDeleteLoading) {
//     //log&&console.log("Owned: " + isOwned + " Joined: " + isJoined);
//     // log&&console.log(ifCompleted);
//     if(isOwned) {
//         // TODO This should also link the choose winner button
//         return(
//             <div>
//                 <Button loading={isDeleteLoading} fluid negative size="large" disabled={isDeleteLoading} onClick={deleteHandler}>Delete</Button>
//             </div>
//         );
//     }
//     else {
//         //log&&console.log(isJoinLoading);
//         return null;
//     }
// }

/**
 * This is the generic view for how a trainer shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param {Props} props The given props to the component.
 * @returns {*} The React JSX used to display the component.
 * @constructor
 */
const SubmissionCard = (props: Props) => (
    <Card>
        <Card.Header>{getObjectAttribute(getAttributeFromObject(props.submission, "by"), "name", props.cache)}</Card.Header>
        <Card.Content>
            {getDisplayMedia(getAttributeFromObject(props.submission, "pictures"), getAttributeFromObject(props.submission, "videos"), props)}
        </Card.Content>
        {convertFromISO(getAttributeFromObject(props.submission, "time_created"))}
    </Card>
);

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
    info: state.info
});

export default connect(mapStateToProps)(SubmissionCard);

import React, {useState, useEffect} from 'react';
import {Card, Dimmer, Loader, Grid, Icon, Image, Divider, Button, Feed} from 'semantic-ui-react';
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import {convertFromISO} from "../../logic/TimeHelper";
import {Player} from "video-react";

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
const getDisplayMedia = (pictures, videos) => {
    // TODO How to properly display videos and pictures?
    if (videos && videos.length > 0) {
        //console.log("Video URL:" + this.state.videoURL);
        return (
            <Player inline={true}>
                <source src={videos[0]} type="video/mp4"/>
            </Player>
        );
    }
    return null;
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
 * Trainer Card
 *
 * This is the generic view for how a trainer shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 */
const SubmissionCard = (props: Props) => (
    <Card>
        <Card.Header>{convertFromISO(getAttributeFromObject(props.submission, "time_created"))}</Card.Header>
        <Card.Content>
            {getDisplayMedia(getAttributeFromObject(props.submission, "pictures"), getAttributeFromObject(props.submission, "videos"))}
        </Card.Content>
    </Card>
);

export default SubmissionCard;

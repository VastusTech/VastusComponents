import React, { useState } from 'react';
import {Button, Card, Dimmer, Grid, Loader} from 'semantic-ui-react';
import {connect} from "react-redux";
import PostDescriptionModal from '../modals/PostDescriptionModal';
import {Player} from "video-react";
import ItemType, {getItemTypeFromID} from "../../logic/ItemType";
import SubmissionDetailCard from "./post_detail_cards/SubmissionDetailCard";
import ChallengeDetailCard, {ChallengeDetailCardInfo} from "./post_detail_cards/ChallengeDetailCard";
import PostDetailCard from "./post_detail_cards/PostDetailCard";
import ClientDetailCard from "./post_detail_cards/ClientDetailCard";
import TrainerDetailCard from "./post_detail_cards/TrainerDetailCard";
import {convertFromISO} from "../../logic/TimeHelper";
import ClientModal from "../modals/ClientModal";
import TrainerModal from "../modals/TrainerModal";
// import {err, log} from "../../../Constants";
import {GroupDetailCardInfo} from "./post_detail_cards/GroupDetailCard";
import {EventDetailCardInfo} from "./post_detail_cards/EventDetailCard";
import Spinner from "../props/Spinner";
import {getAttributeFromObject, getObjectAttribute, getObjectFromCache} from "../../logic/CacheRetrievalHelper";

export const PostCardInfo = {
    fetchList: ["id", "time_created", "by", "item_type", "postType", "about", "access", "description", "videoPaths", "picturePaths"],
    byInfo: {
        clientFetchList: ["id", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath"],
        trainerFetchList: ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"],
    },
    aboutInfo: {
        clientFetchList: ["id", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath"],
        trainerFetchList: ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"],
        eventFetchList: EventDetailCardInfo.fetchList,
        challengeFetchList: ChallengeDetailCardInfo.fetchList,
        postFetchList: ["id", "time_created", "by", "item_type", "postType", "about", "access", "description", "videoPaths", "picturePaths"],
        groupFetchList: GroupDetailCardInfo.fetchList,
    },
    ifSubscribe: false,
};

type Props = {
    post: {
        id: string,
        time_created: string,
        by: string,
        postType: string,
        about: string,
        access: string,
        description: string,
        videoPaths: [string],
        videos: [string],
        picturePaths: [string],
        pictures: [string],
    },
    // by: {
    //     id: string,
    //     item_type: string,
    //     name: string,
    //     profileImagePath: string,
    //     profileImage: string,
    // },
    // about?: {
    //     id: string,
    //     item_type: string,
    //     title: string,
    //     owner: string
    // }
};

const profilePicture = (profileImage) => {
    if (profileImage) {
        return(
            <div align="center" className="ui u-avatar tiny" style={{backgroundImage: `url(${profileImage})`, width: '50px', height: '50px'}}/>
        );
    }
    else {
        return(
            <Dimmer inverted>
                <Spinner />
            </Dimmer>
        );
    }
};

const getPostMedia = (pictures, videos) => {
    // TODO FIX THIS UP SO THAT IT CAN HANDLE A LOT MORE POSTS
    if (videos && videos.length > 0) {
        return (
            <Player inline={true}>
                <source src={videos[0]} type="video/mp4"/>
            </Player>
        );
    }
    return null;
};

const getCorrectDetailCard = (postType, about) => {
    if (postType && postType.length) {
        //alert("Item Type: " + itemType);
        if (postType.substr(0, 3) === "new") {
            // TODO This indicates that this is for a newly created Item
            postType = ItemType[postType.substring(3, postType.length)];
        }
        //alert(itemType);
        if (postType) {
            //alert("Post Type: " + postType);
            // TODO Switch the post types
            if (postType === "Client") {
                //alert("Client Share Post Spotted!");
                // if(!this.state.postMessageSet) {
                //     this.setState({postMessage: "shared a user profile", postMessageSet: true});
                // }
                return (<ClientDetailCard client={about}/>);
            }
            else if (postType === "Trainer") {
                // if(!this.state.postMessageSet) {
                //     this.setState({postMessage: "shared a trainer profile", postMessageSet: true});
                // }
                return (<TrainerDetailCard trainer={about}/>);
            }
            else if (postType === "Gym") {
                //return (<GymDetailCard displayMedia = {this.getDisplayMedia}/>);
            }
            else if (postType === "Workout") {
                //return (<WorkoutDetailCard displayMedia = {this.getDisplayMedia}/>);
            }
            else if (postType === "Review") {
                //return (<ReviewDetailCard displayMedia = {this.getDisplayMedia}/>);
            }
            else if (postType === "Event") {
                //return (<EventDetailCard displayMedia = {this.getDisplayMedia}/>);
            }
            else if (postType === "Challenge") {
                // if(!this.state.postMessageSet) {
                //     this.setState({postMessage: "shared a challenge", postMessageSet: true});
                // }
                return (<ChallengeDetailCard challenge={about}/>);
            }
            else if (postType === "Invite") {
                //return (<InviteDetailCard displayMedia = {this.getDisplayMedia}/>);
            }
            else if (postType === "Post") {
                // if(!this.state.postMessageSet) {
                //     this.setState({postMessage: "posted", postMessageSet: true});
                // }
                return (<PostDetailCard postID={about.id}/>);
            }
            else if (postType === "submission") {
                return (<SubmissionDetailCard postID={about.id}/>);
            }
        }
    }
    return (<div/>);
};


const byModal = (id, itemType, byModalOpen, setByModalOpen) => {
    if (itemType === "Client") {
        return (
            <ClientModal open={byModalOpen} onClose={() => setByModalOpen(false)} clientID={id}/>
        );
    }
    else if (itemType === "Trainer") {
        return (
            <TrainerModal open={byModalOpen} onClose={() => setByModalOpen(false)} trainerID={id}/>
        );
    }
    return null;
};

/*
* Post Card
*
* This is the generic view for how a post shows up in any feeds or lists.
* It is used as a modal trigger in the feed.
 */
const PostCard = (props: Props) => {
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [byModalOpen, setByModalOpen] = useState(false);

    const getPostAttribute = (attributeName) => {
        return getAttributeFromObject(props.post, attributeName);
    };
    const getByAttribute = (attributeName) => {
        return getObjectAttribute(getPostAttribute("by"), attributeName, props.cache);
    };
    // const getAboutAttribute = (attributeName) => {
    //     return getAttributeFromObject(props.about, attributeName, props.cache);
    // };
    // const getBy = () => {
    //     return getObjectFromCache(props.by, props.cache);
    // };
    const getAbout = () => {
        return getObjectFromCache(getPostAttribute("about"), props.cache);
    };

    if (!props.post || !getByAttribute("name")) {
        return (
            <Card color='purple' fluid raised>
                <Spinner loading={true}/>
            </Card>
        );
    }
    //alert(JSON.stringify(this.props.cache.clients));
    return (
        // This is displays a few important pieces of information about the challenge for the feed view.
        <Card color='purple' fluid raised>
            {/*this.getPostAttribute("about")*/}
            <Grid style={{marginLeft: '10px', marginTop: '2px', marginBottom: '2px'}}>
                <Button className="u-button--flat" onClick={() => byModalOpen||setByModalOpen(true)}>
                    <Grid style={{marginLeft: '10px', marginTop: '10px'}}>
                        <Grid.Column width={6}>
                            {profilePicture(getByAttribute("profileImage"))}
                        </Grid.Column>
                        <Grid.Column width={18} style={{marginLeft: '-15px', marginTop: '15px'}}>
                            {getByAttribute("name") + " "} {/*this.state.postMessage*/}
                        </Grid.Column>
                        {byModal(getByAttribute("id"), getByAttribute("item_type"), byModalOpen, setByModalOpen)}
                    </Grid>
                </Button>
            </Grid>
            {/*{openOnce()}*/}
            <Card.Content>
                <div align='center'>
                    {getCorrectDetailCard(getPostAttribute("postType"), getAbout())}
                </div>
                {/*this.getDisplayMedia()*/}
            </Card.Content>
            <Card.Content extra onClick={() => postModalOpen||setPostModalOpen(true)}>
                {/*<Card.Meta textAlign = 'center'>{this.getPostAttribute("description")}</Card.Meta>*/}
                <div align="center">
                    {convertFromISO(getPostAttribute("time_created")).substr(5, 12)}
                </div>
                <PostDescriptionModal open={postModalOpen} onClose={() => setPostModalOpen(false)} postID={props.post.id}/>
            </Card.Content>
            <Card.Content extra>
                <Card.Meta textAlign = 'center'>
                    {getPostAttribute("access")}
                </Card.Meta>
            </Card.Content>
        </Card>
    );
};

const mapStateToProps = state => ({
    cache: state.cache
});

export default connect(mapStateToProps)(PostCard);


import React, {useState} from 'react';
import {Button, Card, Dimmer, Grid} from 'semantic-ui-react';
import {connect} from "react-redux";
import PostDescriptionModal from '../modals/PostDescriptionModal';
import {Player} from "video-react";
import ItemType from "../../logic/ItemType";
import ChallengeDetailCard, {ChallengeDetailCardInfo} from "./post_detail_cards/ChallengeDetailCard";
import PostDetailCard from "./post_detail_cards/PostDetailCard";
import ClientDetailCard from "./post_detail_cards/ClientDetailCard";
import TrainerDetailCard from "./post_detail_cards/TrainerDetailCard";
import {convertFromISO} from "../../logic/TimeHelper";
import ClientModal from "../modals/ClientModal";
import TrainerModal from "../modals/TrainerModal";
import {GroupDetailCardInfo} from "./post_detail_cards/GroupDetailCard";
import {EventDetailCardInfo} from "./post_detail_cards/EventDetailCard";
import Spinner from "../props/Spinner";
import {getAttributeFromObject, getObjectAttribute, getObjectFromCache} from "../../logic/CacheRetrievalHelper";
import StyledProfileImage from "../props/StyledProfileImage";
import type Post from "../../types/Post";

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
  post: Post
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

/**
 * Displays the profile image.
 *
 * @param {string} profileImage The url string for the profile image.
 * @returns {*} Displays the JSX of the profile image given.
 */
export const profilePicture = (profileImage) => {
  if (profileImage) {
    return (
      <StyledProfileImage profileImage={profileImage} type="Small"/>
      //<div align="center" className="ui u-avatar tiny" style={{backgroundImage: `url(${profileImage})`, width: '50px', height: '50px'}}/>
    );
  } else {
    return (
      <Dimmer inverted>
        <Spinner className="spinner1"/>
      </Dimmer>
    );
  }
};

/**
 * Displays the video or image media in the post.
 *
 * @param {[]} pictures A list of all the pictures in the post.
 * @param {[]} videos A list of all the videos in the post.
 * @returns {*} The React JSX used to display the video or image in a post.
 */
export const getPostMedia = (pictures, videos) => {
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

/**
 * Displays the correct detail card based on the type of post that it is.
 *
 * @param {string} postType The type of post that is being displayed.
 * @param {string} about The id of the content that the post is about.
 * @returns {*}
 */
export const getCorrectDetailCard = (postType, about) => {
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
      } else if (postType === "Trainer") {
        // if(!this.state.postMessageSet) {
        //     this.setState({postMessage: "shared a trainer profile", postMessageSet: true});
        // }
        return (<TrainerDetailCard trainer={about}/>);
      } else if (postType === "Gym") {
        //return (<GymDetailCard displayMedia = {this.getDisplayMedia}/>);
      } else if (postType === "Workout") {
        //return (<WorkoutDetailCard displayMedia = {this.getDisplayMedia}/>);
      } else if (postType === "Review") {
        //return (<ReviewDetailCard displayMedia = {this.getDisplayMedia}/>);
      } else if (postType === "Event") {
        //return (<EventDetailCard displayMedia = {this.getDisplayMedia}/>);
      } else if (postType === "Challenge") {
        // if(!this.state.postMessageSet) {
        //     this.setState({postMessage: "shared a challenge", postMessageSet: true});
        // }
        return (<ChallengeDetailCard challenge={about}/>);
      } else if (postType === "Invite") {
        //return (<InviteDetailCard displayMedia = {this.getDisplayMedia}/>);
      } else if (postType === "Post") {
        // if(!this.state.postMessageSet) {
        //     this.setState({postMessage: "posted", postMessageSet: true});
        // }
        return (<PostDetailCard postID={about.id}/>);
      }
    }
  }
  return (<div/>);
};

/**
 * The modal of the user that the post is authored by.
 *
 * @param {string} id The id of the user that created the modal.
 * @param {string} itemType
 * @param {function()} byModalOpen Opens the modal relating to the user who authored the post.
 * @param {function(boolean)} setByModalOpen Sets the by modal open attribute to true.
 * @returns {*} The React JSX user to display the proper client modal state.
 */
export const byModal = (id, itemType, byModalOpen, setByModalOpen) => {
  if (itemType === "Client") {
    return (
      <ClientModal open={byModalOpen} onClose={() => setByModalOpen(false)} clientID={id}/>
    );
  } else if (itemType === "Trainer") {
    return (
      <TrainerModal open={byModalOpen} onClose={() => setByModalOpen(false)} trainerID={id}/>
    );
  }
  return null;
};

/**
 * This is the generic view for how a post shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param {Props} props The given props to the component.
 * @returns {*} The React JSX used to display the component.
 * @constructor
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
  } else {
    return (
      <Card color='purple' fluid raised>
        {/*this.getPostAttribute("about")*/}
        {/*{openOnce()}*/}
        <Card.Content>
          <div align='center'>
            {getCorrectDetailCard(getPostAttribute("postType"), getAbout())}
          </div>
          {/*this.getDisplayMedia()*/}
        </Card.Content>
        <Card.Content extra onClick={() => postModalOpen || setPostModalOpen(true)}>
          {/*<Card.Meta textAlign = 'center'>{this.getPostAttribute("description")}</Card.Meta>*/}
          <div align="center">
            {convertFromISO(getPostAttribute("time_created")).substr(5, 12)}
          </div>
          <PostDescriptionModal open={postModalOpen} onClose={() => setPostModalOpen(false)}
                                postID={props.post.id}/>
        </Card.Content>
      </Card>
    );
  }
};

const mapStateToProps = state => ({
  cache: state.cache
});

// const connector: Connector<Props, any> = connect(mapStateToProps);
// export default connector(PostCard);
export default connect(mapStateToProps)(PostCard);

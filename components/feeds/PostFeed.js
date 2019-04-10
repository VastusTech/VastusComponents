import React, {useState, useEffect, Fragment} from 'react'
import _ from 'lodash'
import {Visibility, Header, Grid} from 'semantic-ui-react'
import PostCard, {PostCardInfo} from "../cards/PostCard";
import { connect } from 'react-redux';
import {
    fetchPost,
    fetchChallenge,
    fetchClient,
    fetchTrainer,
    fetchPostQuery, fetchGroup
} from "../../redux_convenience/cacheItemTypeActions";
import {fetchUserAttributes} from "../../../redux_helpers/actions/userActions";
import {getItemTypeFromID} from "../../logic/ItemType";
import {log, err} from "../../../Constants";
import {debugAlert} from "../../logic/DebuggingHelper";
import ChallengeCard from "../cards/ChallengeCard";
import ClientDetailCard from "../cards/post_detail_cards/ClientDetailCard";
import TrainerDetailCard from "../cards/post_detail_cards/TrainerDetailCard";
import PostDetailCard from "../cards/post_detail_cards/PostDetailCard";
import {GroupDetailCardInfo} from "../cards/post_detail_cards/GroupDetailCard";
import {EventDetailCardInfo} from "../cards/post_detail_cards/EventDetailCard";
import {ChallengeDetailCardInfo} from "../cards/post_detail_cards/ChallengeDetailCard";
import Spinner from "../props/Spinner";

const postFeedLength = 50;

type Props = {
    filter: any
};

const queryPosts = (filter, nextToken, isFinished, friends, fetchPostQuery, fetchClient, fetchTrainer, fetchEvent,
                    fetchChallenge, fetchPost, fetchGroup, setIsLoading, setIsFinished, setNextToken, setPosts,
                    postQueries, putPostQuery) => {
    if (!isFinished) {
        setIsLoading(true);
        debugAlert("Fetching Post Feed Query");
        fetchPostQuery(PostCardInfo.fetchList, filter, postFeedLength, nextToken, (data) => {
            if (!data.nextToken) {
                setIsFinished(true);
            }
            if (data.items) {
                for (let i = 0; i < data.items.length; i++) {
                    const post = data.items[i];
                    // Filter the results based on if we are able to see it
                    if (post.access === "public" || (friends && friends.includes(post.by))) {
                        // Fetch the "by" information
                        const by = post.by;
                        const byItemType = getItemTypeFromID(by);
                        if (byItemType === "Client") {
                            debugAlert("Fetching Client for BY in post for Post Feed");
                            fetchClient(by, ["name", "profileImagePath"]);
                        }
                        else if (byItemType === "Trainer") {
                            debugAlert("Fetching Trainer for BY in post for Post Feed");
                            fetchTrainer(by, ["name", "profileImagePath"]);
                        }
                        // Fetch the "about" information
                        const about = post.about;
                        const aboutItemType = getItemTypeFromID(about);
                        if (aboutItemType === "Client") {
                            debugAlert("Fetching Client for ABOUT in post for Post Feed");
                            fetchClient(about, ClientDetailCard.fetchVariableList);
                        } else if (aboutItemType === "Trainer") {
                            debugAlert("Fetching Trainer for ABOUT in post for Post Feed");
                            fetchTrainer(about, TrainerDetailCard.fetchVariableList);
                        } else if (aboutItemType === "Event") {
                            fetchEvent(about, EventDetailCardInfo.fetchList);
                        } else if (aboutItemType === "Challenge") {
                            // console.log("Fetching challenge for post in post feed");
                            debugAlert("Fetching Challenge for ABOUT in post for Post Feed");
                            fetchChallenge(about, ChallengeDetailCardInfo.fetchList);
                        } else if (aboutItemType === "Post") {
                            debugAlert("Fetching Post for ABOUT in post for Post Feed");
                            fetchPost(about, PostDetailCard.fetchVariableList);
                        } else if (aboutItemType === "Group") {
                            debugAlert("Fetching Group for ABOUT in post for Post Feed");
                            fetchGroup(about, GroupDetailCardInfo.fetchList);
                        }
                        setPosts(p => [...p, post]);
                    }
                    else {
                        debugAlert("NOT SHOWING: " + JSON.stringify(post));
                    }
                }
                setNextToken(data.nextToken);
            }
            else {
                // TODO Came up with no events
            }
            setIsLoading(false);
        }, (error) => {
            err&&console.error("Querying Posts failed!");
            err&&console.error(error);
            setIsLoading(false);
        });
    }
};

// const getObject = (id, cacheReducer) => {
//     const itemType = getItemTypeFromID(id);
//     if (id && itemType) {
//         return cacheReducer[getCacheName(itemType)][id];
//     }
//     return null;
// };

/**
 * Event Feed
 *
 * This is the main feed in the home page, it currently displays all public events inside of the database for
 * the user to see.
 */
const PostFeed = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [nextToken, setNextToken] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.user.id) {
            setPosts([]);
            queryPosts(props.filter, nextToken, isFinished, props.user.friends, props.fetchPostQuery, props.fetchClient, props.fetchTrainer, props.fetchEvent, props.fetchChallenge,
                props.fetchPost, props.fetchGroup, setIsLoading, setIsFinished, setNextToken, setPosts);
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
            queryPosts(props.filter, nextToken, isFinished, props.user.friends, props.fetchPostQuery, props.fetchClient, props.fetchTrainer, props.fetchEvent, props.fetchChallenge,
                props.fetchPost, props.fetchGroup, setIsLoading, setIsFinished, setNextToken, setPosts);
        }
    };

    //This displays the rows in a grid format, with visibility enabled so that we know when the bottom of the page
    //is hit by the user.
    return (
        <Visibility onUpdate={_.debounce(handleUpdate, 250)}>
            {_.times(posts.length, i => (
                <Fragment key={i + 1}>
                    <PostCard post={posts[i]} /*by={getObject(posts[i].by, props.cache)} about={getObject(posts[i].about, props.cache)}*//>
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
        fetchUserAttributes: (variablesList, dataHandler) => {
            dispatch(fetchUserAttributes(variablesList, dataHandler));
        },
        fetchClient: (variablesList, dataHandler) => {
            dispatch(fetchClient(variablesList, dataHandler));
        },
        fetchTrainer: (variablesList, dataHandler) => {
            dispatch(fetchTrainer(variablesList, dataHandler));
        },
        fetchPost: (id, variablesList) => {
            dispatch(fetchPost(id, variablesList));
        },
        fetchGroup: (id, variablesList) => {
            dispatch(fetchGroup(id, variablesList));
        },
        fetchPostQuery: (variablesList, filter, limit, nextToken, dataHandler, failureHandler) => {
            dispatch(fetchPostQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler));
        },
        fetchChallenge: (id, variablesList) => {
            dispatch(fetchChallenge(id, variablesList));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed);

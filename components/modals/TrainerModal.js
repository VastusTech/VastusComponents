import React, {useState, useEffect} from 'react'
import {Button, Card, Modal, Dimmer, Loader, List, Icon } from 'semantic-ui-react'
import ChallengeList from "../lists/ChallengeList";
import { connect } from "react-redux";
import TrainerPostFeed from "../lists/TrainerPostFeed";
import EventList from "../lists/EventList";
import MessageBoard from "../messaging/MessageBoard";
import MessageHandler from "../../api/MessageHandler";
import {getTrainerAttribute} from "../../logic/CacheRetrievalHelper";
import ProfileImage from "../props/ProfileImage";
import {fetchPost, fetchTrainer} from "../../redux_convenience/cacheItemTypeActions";
import {PostCardInfo} from "../cards/PostCard";

const TrainerModalInfo = {
    fetchList: [],
};

type Props = {
    trainerID: string,
    open: boolean,
    onClose: () => void
};

// const profilePicture = (profileImage) => {
//     if (profileImage) {
//         return (
//             <div className="u-avatar u-avatar--large u-margin-x--auto u-margin-top--neg4" style={{backgroundImage: `url(${profileImage})`}}/>
//         );
//     }
//     else {
//         return(
//             <Dimmer inverted>
//                 <Loader />
//             </Dimmer>
//         );
//     }
// };

/**
 * Profile
 *
 * This is the profile page which displays information about the current user.
 */
const TrainerModal = (props: Props) => {
    const [ownedModalOpen, setOwnedModalOpen] = useState(false);
    const [scheduledModalOpen, setScheduledModalOpen] = useState(false);

    const getAttribute = (attribute) => getTrainerAttribute(props.trainerID, attribute, props.cache);

    useEffect(() => {
        if (props.open && props.trainerID) {
            props.fetchTrainer(props.trainerID, ["posts", "profileImagePath", "profileImagePaths"], (trainer) => {
                if (trainer.posts) {
                    for (let i = 0; i < trainer.posts.length; i++) {
                        props.fetchPost(trainer.posts[i], PostCardInfo.fetchList);
                    }
                }
            });
        }
    }, [props.open]);

    //This displays some basic user information, a profile picture, buttons to modify some user related attributes,
    //and a switch to set the privacy for the user.
    /*
    For a trainer's portal, we want to display their name / basic info, then links to their challenges/events stuff,
    then finally a feed of their posts.
     */
    return(
        <Modal open={props.open} onClose={props.onClose}>
            <Icon className='close' onClick={props.onClose}/>
            <Card color='purple' fluid raised className="u-margin-top--2">
                <Card.Content textAlign="center">
                    <ProfileImage userID={props.trainerID}
                                  profileImage={getAttribute("profileImage")}
                                  profileImages={getAttribute("profileImages")}
                                  editable={false}/>
                    {/*{profilePicture(getAttribute("profileImage"))}*/}
                    <Card.Header as="h2" style={{"margin": "12px 0 0"}}>{getAttribute("name")}</Card.Header>
                    <List id = "profile buttons">
                        <List.Item>
                            <Button primary fluid size="large" onClick={() => setOwnedModalOpen(true)}><Icon name="trophy" /> Current Challenges</Button>
                            <Modal basic size='mini' open={ownedModalOpen} onClose={() => setOwnedModalOpen(false)} closeIcon>
                                <Modal.Content>
                                    <ChallengeList challengeIDs={getAttribute("ownedChallenges")} noChallengesMessage="No owned challenges yet!"/>
                                </Modal.Content>
                            </Modal>
                        </List.Item>
                        <List.Item>
                            <Button primary fluid size="large" onClick={() => setScheduledModalOpen(true)}><Icon name="checked calendar" /> Scheduled Events</Button>
                            <Modal basic size='mini' open={scheduledModalOpen} onClose={() => setScheduledModalOpen(false)} closeIcon>
                                <Modal.Content>
                                    <EventList eventIDs={getAttribute("scheduledEvents")} noEventsMessage="No scheduled events yet!"/>
                                </Modal.Content>
                            </Modal>
                        </List.Item>
                        <List.Item>
                            <Modal trigger={<Button primary fluid><Icon name="wechat" /> Trainer Chat</Button>}>
                                <MessageBoard board={MessageHandler.getBoard([getAttribute("id"), props.user.id])}/>
                            </Modal>
                        </List.Item>
                    </List>
                    {/*<TrainerPostFeed trainerID={getAttribute("id")}/>*/}
                </Card.Content>
            </Card>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
});

const mapDispatchToProps = dispatch => {
    return {
        fetchTrainer: (id, variableList, dataHandler) => {
            dispatch(fetchTrainer(id, variableList, dataHandler));
        },
        fetchPost: (id, variableList, dataHandler) => {
            dispatch(fetchPost(id, variableList, dataHandler));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainerModal);

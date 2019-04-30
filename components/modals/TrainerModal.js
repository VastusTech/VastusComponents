import React, {useState, useEffect} from 'react'
import {Button, Card, Modal, Divider, Icon, Grid} from 'semantic-ui-react'
import ChallengeList from "../lists/ChallengeList";
import { connect } from "react-redux";
import EventList from "../lists/EventList";
import MessageBoard from "../messaging/MessageBoard";
import {getTrainerAttribute} from "../../logic/CacheRetrievalHelper";
import ProfileImage from "../props/ProfileImage";
import {fetchPost, fetchTrainer} from "../../redux/convenience/cacheItemTypeActions";
import {PostCardInfo} from "../cards/PostCard";
import {getMessageBoardName} from "../../logic/MessageHelper";

// TODO Rewrite for the new design

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
 * TODO
 *
 * @param props
 * @return {*}
 * @constructor
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
            <Modal.Header style={{marginTop: '20px', marginBottom: '20px'}}>
                <Grid centered>{getAttribute("name")}</Grid></Modal.Header>
            <Modal.Content>
                <ProfileImage userID={props.trainerID}
                              profileImage={getAttribute("profileImage")}
                              profileImages={getAttribute("profileImages")}
                              editable={false}
                              style={{marginTop: '20px'}}/>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Grid centered>
                            <Grid.Row>
                                <Button floated='left' primary circular icon size="massive" onClick={() => setOwnedModalOpen(true)}><Icon name="trophy"/></Button>
                            </Grid.Row>
                            <Grid.Row style={{marginTop: '-20px', marginBottom: '20px'}}>
                                <Button floated='left' className="u-button--flat u-padding-left--1">Current Challenges</Button>
                            </Grid.Row>
                            <Modal basic size='mini' open={ownedModalOpen} onClose={() => setOwnedModalOpen(false)} closeIcon>
                                <Modal.Content>
                                    <ChallengeList challengeIDs={getAttribute("ownedChallenges")} noChallengesMessage="No owned challenges yet!"/>
                                </Modal.Content>
                            </Modal>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid centered>
                            <Grid.Row>
                                <Button primary circular icon size="massive" onClick={() => setScheduledModalOpen(true)}><Icon name="checked calendar"/></Button>
                            </Grid.Row>
                            <Grid.Row style={{marginTop: '-20px', marginBottom: '20px'}}>
                                <Button className="u-button--flat u-padding-left--1">Scheduled Events</Button>
                            </Grid.Row>
                            <Modal basic size='mini' open={scheduledModalOpen} onClose={() => setScheduledModalOpen(false)} closeIcon>
                                <Modal.Content>
                                    <EventList eventIDs={getAttribute("scheduledEvents")} noEventsMessage="No scheduled events yet!"/>
                                </Modal.Content>
                            </Modal>
                        </Grid>
                    </Grid.Column>
                </Grid>

                <Modal trigger={<Button primary fluid><Icon name="wechat"/> Trainer Chat</Button>}>
                    <MessageBoard board={getMessageBoardName([getAttribute("id"), props.user.id])}/>
                </Modal>
            </Modal.Content>
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

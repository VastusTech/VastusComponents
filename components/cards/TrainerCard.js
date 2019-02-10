import React, { Component, Fragment } from 'react';
import {Card, Dimmer, Loader, Grid, Icon, Image, Divider, Button, Feed} from 'semantic-ui-react';
import TrainerPortalModal from '../modals/TrainerModal';
import { connect } from 'react-redux';
import { fetchTrainer } from "../../redux_actions/cacheActions";
import ChallengeDescriptionModal from "../modals/ChallengeDescriptionModal";

/*
* Trainer Card
*
* This is the generic view for how a challenge shows up in any feeds or lists.
* It is used as a modal trigger in the feed.
 */

type Props = {
    rank: number,
    trainerID: string
}

class TrainerCard extends Component<Props> {
    static fetchVariableList = ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"];

    constructor(props) {
        super(props);
        this.openTrainerModal = this.openTrainerModal.bind(this);
        this.closeTrainerModal = this.closeTrainerModal.bind(this);
        this.profilePicture = this.profilePicture.bind(this);
        this.getTrainerAttribute = this.getTrainerAttribute.bind(this);
    }

    state = {
        error: null,
        // isLoading: true,
        trainerID: null,
        // event: null,
        // members: {},
        // owner: null,
        // ifOwned: false,
        // ifJoined: false,
        // capacity: null,
        trainerModalOpen: false
    };

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps, nextContext) {
        if (newProps.trainerID && !this.state.trainerID) {
            this.setState({trainerID: newProps.trainerID});
        }
        this.setState({});
    }

    getTrainerAttribute(attribute) {
        if (this.state.trainerID) {
            const trainer = this.props.cache.trainers[this.state.trainerID];
            if (trainer) {
                if (attribute.substr(attribute.length - 6) === "Length") {
                    attribute = attribute.substr(0, attribute.length - 6);
                    if (trainer[attribute] && trainer[attribute].length) {
                        return trainer[attribute].length;
                    }
                    else {
                        return 0;
                    }
                }
                return trainer[attribute];
            }
        }
        return null;
    }

    openTrainerModal = () => {this.setState({trainerModalOpen: true})};
    closeTrainerModal = () => {this.setState({trainerModalOpen: false})};

    profilePicture() {
        if (this.getTrainerAttribute("profileImage")) {
            return(
                <div className="u-avatar u-avatar--small" style={{backgroundImage: `url(${this.getTrainerAttribute("profileImage")})`}}></div>
            );
        }
        else {
            return(
                <Dimmer inverted>
                    <Loader />
                </Dimmer>
            );
        }
    }

    render() {
        const { rank } = this.props;
        if (!this.getTrainerAttribute("id")) {
            return(
                null
            );
        }
        // return(
        //     // This is displays a few important pieces of information about the challenge for the feed view.
        //     <Card color='purple' fluid raised onClick={this.openTrainerModal}>
        //         <Card.Content>
        //             {/* If no rank */}
        //             {!rank && (
        //                 <Fragment>
        //                     <Card.Header>
        //                         <div className="u-flex u-flex-justify--center u-margin-bottom--2">
        //                             {this.profilePicture()}
        //                         </div>
        //                     </Card.Header>
        //                     <Card.Header textAlign = 'center'>
        //                         {this.getTrainerAttribute("name")}
        //                     </Card.Header>
        //                 </Fragment>
        //             )}
        //             {/* If has rank */}
        //             {rank && (
        //                 <Grid divided verticalAlign='middle'>
        //                     <Grid.Row>
        //                         <Grid.Column width={4}>
        //                             <Header size='large' textAlign='center'>{rank}</Header>
        //                         </Grid.Column>
        //                         <Grid.Column width={12}>
        //                             <div className="u-flex u-flex-align--center">
        //                                 {this.profilePicture()} <Header size='small' className='u-margin-top--0 u-margin-left--2'>{this.getTrainerAttribute("name")}</Header>
        //                             </div>
        //                         </Grid.Column>
        //                     </Grid.Row>
        //                 </Grid>
        //             )}
        //             <TrainerPortalModal open={this.state.trainerModalOpen} onClose={this.closeTrainerModal} trainerID={this.state.trainerID}/>
        //         </Card.Content>
        //         <Card.Content extra>
        //             <Card.Meta>
        //                 {this.getTrainerAttribute("challengesWonLength")} challenges won
        //             </Card.Meta>
        //         </Card.Content>
        //     </Card>
        // );
        {/*return (
            <Card fluid raised onClick={this.openTrainerModal}>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label>
                                <Image src={this.getTrainerAttribute("profileImage")} circular size="large"/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Feed.User>
                                        {this.getTrainerAttribute("name")}
                                    </Feed.User>
                                    <Feed.User>
                                        {this.getTrainerAttribute("title")}
                                    </Feed.User>
                                    <TrainerPortalModal open={this.state.trainerModalOpen} onClose={this.closeTrainerModal} trainerID={this.state.trainerID}/>
                                </Feed.Summary>
                                <Divider/>
                                <Feed.Extra>
                                    <Button primary loading={this.state.isAcceptInviteLoading} disabled={this.state.isAcceptInviteLoading} floated="right" size="small">
                                        Vastus Certified</Button>
                                    <Button inverted loading={this.state.isDenyInviteLoading} disabled={this.state.isDenyInviteLoading} floated="right" size="small">
                                        <Icon name='globe'/> Boston, MA</Button>
                                </Feed.Extra>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        );*/}
        return (
            <Card fluid raised centered onClick={this.openTrainerModal}>
                <div className="u-container">
                    <div className="u-avatar u-avatar--large u-margin-bottom--neg2 u-margin-x--auto" style={{backgroundImage: `url(${this.getTrainerAttribute("profileImage")})`}}></div>
                </div>
                <Card.Content textAlign='center'>
                    <Card.Header>
                        {this.getTrainerAttribute("name")}
                    </Card.Header>
                    <Card.Description>
                        {/*this.getTrainerAttribute("title")*/} Personal Trainer
                    </Card.Description>
                </Card.Content>
                <Card.Content extra textAlign='center'>
                    <Button.Group fluid>
                        <Button>
                            <Icon name='globe'/> Boston, MA</Button>
                        <Button primary>
                            Vastus Certified</Button>
                    </Button.Group>
                </Card.Content>
                <TrainerPortalModal open={this.state.trainerModalOpen} onClose={this.closeTrainerModal} trainerID={this.state.trainerID}/>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
    info: state.info
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrainer: (id, variablesList, dataHandler) => {
            dispatch(fetchTrainer(id, variablesList, dataHandler));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainerCard);

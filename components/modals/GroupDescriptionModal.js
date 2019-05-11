import {connect} from "react-redux";
import React, { Component, Fragment } from 'react';
import {fetchGroup, fetchClient, forceFetchGroup} from "../../redux/convenience/cacheItemTypeActions";
import {forceFetchUserAttributes} from "../../redux/actions/userActions";
import {Button, Divider, Icon, Modal, Card, Grid, Image, Message, Tab, Popup} from "semantic-ui-react";
import {getItemTypeFromID} from "../../logic/ItemType";
import CommentScreen from "../messaging/MessageBoard";
import GroupFunctions from "../../database_functions/GroupFunctions";
import UserFunctions from "../../database_functions/UserFunctions";
import InviteFunctions from "../../database_functions/InviteFunctions";
// import Logo from "../../img/vt_new.svg";
import DatabaseObjectList from "../lists/DatabaseObjectList";
// import {getObjectAttribute} from "../../logic/CacheRetrievalHelper";
import CreatePostProp from "../manager/CreatePost";
// import CreateChallengeProp from "../manager/CreateChallenge";
// import GroupFeed from "../feeds/DatabaseObjectFeed";
// import ChallengeList from "../lists/ChallengeList";
import CreateGroupChallengeProp from "../manager/CreateGroupChallenge";

// TODO PLEASE REFACTOR THIS IS CRINGY
// TODO Rewrite for the new design
// TODO Refactor

type Props = {
    open: boolean,
    onClose: any,
    groupID: string
}

/*
* Group Description Modal
*
* This is the group description which gives access to the group chat and private group posts
 */
class GroupDescriptionModal extends Component<Props> {
    state = {
        isLoading: false,
        isOwned: false,
        isJoined: false,
        isCompleted: false,
        isRequesting: false,
        isRestricted: false,
        groupID: null,
        clientModalOpen: false,
        completeModalOpen: false,
        submitModalOpen: false,
        isLeaveLoading: false,
        isDeleteLoading: false,
        isJoinLoading: false,
        isRequestLoading: false,
        joinRequestSent: false,
        canCallChecks: true,
        deleted: false,
        fetchedTrainer: false,
        isEditing: false
    };

    resetState(groupID) {
        this.setState({
            isLoading: false,
            isOwned: false,
            isJoined: false,
            isCompleted: false,
            isRequesting: false,
            isRestricted: false,
            groupID: groupID,
            clientModalOpen: false,
            completeModalOpen: false,
            submitModalOpen: false,
            isLeaveLoading: false,
            isDeleteLoading: false,
            isJoinLoading: false,
            isRequestLoading: false,
            joinRequestSent: false,
            canCallChecks: true,
        });
    }

    constructor(props) {
        super(props);
        this.handleDeleteGroupButton = this.handleDeleteGroupButton.bind(this);
        this.handleLeaveGroupButton = this.handleLeaveGroupButton.bind(this);
        this.handleJoinGroupButton = this.handleJoinGroupButton.bind(this);
        this.handleRequestGroupButton = this.handleRequestGroupButton.bind(this);
        this.isJoined = this.isJoined.bind(this);
        this.isRequesting = this.isRequesting.bind(this);
        this.isRestricted = this.isRestricted.bind(this);
        this.isOwned = this.isOwned.bind(this);
        this.isCompleted = this.isCompleted.bind(this);
        this.createCorrectButton = this.createCorrectButton.bind(this);
        this.getGroupAttribute = this.getGroupAttribute.bind(this);
    }

    componentWillReceiveProps(newProps) {

        const members = this.getGroupAttribute("members");
        const owners = this.getGroupAttribute("owners");
        if (!this.props.open && newProps.open && members && members.length > 0) {
            for (let i = 0; i < members.length; i++) {
                const itemType = getItemTypeFromID(members[i]);
                if (itemType === "Client") {
                    this.props.fetchClient(members[i], ["id", "name", "gender", "birthday", "profileImagePath"], () => {
                        this.setState({});
                    });
                }
                else if (itemType === "Trainer") {
                    this.props.fetchTrainer(members[i], ["id", "name", "gender", "birthday", "profileImagePath"], () => {
                        this.setState({});
                    });
                }
                for(let i = 0; i < owners.length; i++) {
                    if (owners[i]) {
                        if (owners[i].substr(0, 2) === "TR") {
                            if (!this.state.fetchedTrainer) {
                                this.props.fetchTrainer(owners[i], ["id", "name", "gender", "birthday", "profileImagePath", "profileImagePaths"]);
                                this.setState({fetchedTrainer: true});
                            }
                        }
                    }
                }
            }

            if (this.state.canCallChecks) {
                this.isJoined();
                this.isOwned();
                this.isRequesting();
                this.isCompleted();
                this.isRestricted();
                this.setState({canCallChecks: false});
            }
        }
    }

    handleDeleteGroupButton() {
        //console.log("Handling deleting the event");
        this.setState({isDeleteLoading: true, isLoading: true});
        GroupFunctions.delete(this.props.user.id, this.getGroupAttribute("id"), (data) => {
            this.forceUpdate(data.id);
            // console.log(JSON.stringify(data));
            this.setState({isLoading: false, isDeleteLoading: false, event: null, isOwned: false, isJoined: false, deleted: true});
            this.props.onClose();
        }, (error) => {
            // console.log(JSON.stringify(error));
            this.setState({isLoading: false, isDeleteLoading: false, error: error, deleted: false});
        })
    }

    handleLeaveGroupButton() {
        //console.log("Handling leaving the event");
        this.setState({isLeaveLoading: true, isLoading: true});
        UserFunctions.removeGroup(this.props.user.id, this.props.user.id, this.getGroupAttribute("id"), (data) => {
            this.forceUpdate(data.id);
            //console.log(JSON.stringify(data));
            this.setState({isLoading: false, isLeaveLoading: false, isJoined: false});
        }, (error) => {
            //console.log(JSON.stringify(error));
            this.setState({isLoading: false, isLeaveLoading: false, error: error});
        })
    }

    handleJoinGroupButton() {
        //console.log("Handling joining the event");
        this.setState({isJoinLoading: true, isLoading: true});
        UserFunctions.addGroup(this.props.user.id, this.props.user.id, this.getGroupAttribute("id"), null,
            () => {
                this.forceUpdate();
                //console.log(JSON.stringify(data));
                this.setState({isLoading: false, isJoinLoading: false, isJoined: true});
            }, (error) => {
                this.setState({isLoading: false, isJoinLoading: false, error: error});
            })
    }

    handleRequestGroupButton() {
        this.setState({isRequestLoading: true, isLoading: true});
        InviteFunctions.createGroupRequest(this.props.user.id, this.props.user.id, this.getGroupAttribute("id"),
            () => {
                this.forceUpdate();
                this.setState({isLoading: false, isRequestLoading: false, isRequesting: true});
            }, (error) => {
                this.setState({isLoading: false, isRequestLoading: false, error: error})
            });
    }

    isJoined() {
        const members = this.getGroupAttribute("members");
        if (members) {
            const isMembers = members.includes(this.props.user.id);
            //console.log("Is Members?: " + isMembers);
            this.setState({isJoined: isMembers});
            //console.log("am I in members?: " + members.includes(this.props.user.id));
        }
        else {
            this.setState({isJoined: false});
        }
    }

    isRequesting() {
        const memberRequests = this.getGroupAttribute("memberRequests");
        if (memberRequests) {
            this.setState({isRequesting: memberRequests.includes(this.props.user.id)});
        }
    }

    isRestricted() {
        this.setState({isRestricted: this.getGroupAttribute("restriction") === "invite"});
    }

    isOwned() {
        this.setState({isOwned: this.getGroupAttribute("owners").includes(this.props.user.id)});
    }

    isCompleted() {
        this.setState({ifCompleted: this.getGroupAttribute("ifCompleted") === "true"});
    }

    /**
     * This function controls the state of the edit button depending on whether the page is currently being edited or not.
     *
     * @param {boolean} isEditing If the profile is being edited or not.
     * @param {function(boolean)} setIsEditing {boolean} Function for setting the edit boolean.
     * @returns {*} The React JSX used to display the component.
     */
    editButton(isEditing) {
        if(!isEditing) {
            return (
                <Button onClick = { () => {this.setState({isEditing: true})}} floated='left' circular icon color={'purple'}>
                    <Icon name='edit outline'/>
                </Button>
            );
        }
        else {
            return (
                <div>
                    <Button onClick = { () => {this.setState({isEditing: false})}} floated='left' circular icon color={'purple'}>
                        <Icon name='save'/>
                    </Button>
                    <Button onClick = { () => {this.setState({isEditing: false})}} floated='left' circular icon>
                        <Icon name='cancel'/>
                    </Button>
                </div>
            );
        }
    }

    /**
     * This function controls the state of the settings button depending on whether the user owns or is joined to the
     * challenge.
     *
     * @param {boolean} isOwned If the user owns the challenge or not.
     * @param {boolean} isJoined If the user has joined the challenge or not.
     * @returns {*} The React JSX used to display the component.
     */
    createCorrectSettingsButton(isOwned, isJoined, isLoading) {
        if(isOwned) {
            return (<Popup
                trigger={<Button floated='right' circular icon color={'purple'}>
                    <Icon name='cog'/>
                </Button>}
                content={<Button loading={isLoading} fluid negative size="large" disabled={isLoading}
                                 onClick={() => this.handleDeleteGroupButton()}>
                    Delete</Button>}
                on='click'
                position='bottom right'
            />);
        }
        else if(isJoined) {
            return (<Popup
                trigger={<Button floated='right' circular icon color={'purple'}>
                    <Icon name='cog'/>
                </Button>}
                content={<Button loading={isLoading} fluid inverted size="large" disabled={isLoading}
                                 onClick={() => this.handleLeaveGroupButton()}>
                    Leave
                </Button>}
                on='click'
                position='bottom right'
            />);
        }
    }

    createCorrectButton(panes) {
        if (this.state.isCompleted) {
            return(
                <Button disabled fluid inverted size="large">This Event is completed</Button>
            );
        }
        else if (this.state.isOwned) {
            return (
                <Fragment>
                    <Divider className='u-margin-top--4' />
                    <Card fluid>
                        <Tab menu={{ widths: 3, inverted: true }} panes={panes} className='u-challenge u-margin-top--2' />
                    </Card>
                </Fragment>
            )
        }
        else if (this.state.isJoined) {
            return (
                <Fragment>
                    <Divider className='u-margin-top--4' />
                    <Card fluid>
                        {/*{alert(this.state.groupID)}*/}
                        <Tab menu={{ widths: 3, inverted: true }} panes={panes} className='u-challenge u-margin-top--2' />
                    </Card>
                </Fragment>
            )
        }
        else if (this.state.isRestricted) {
            if (this.state.isRequesting) {
                return (
                    <div>
                        <Button inverted fluid size="large" disabled={true}>Request Sent!</Button>
                    </div>
                )
            }
            else {
                return (<div><Button loading={this.state.isRequestLoading} fluid size="large" disabled={this.state.isRequestLoading}
                                     onClick={this.handleRequestGroupButton}>Send Join Request</Button></div>)
            }
        }
        else {
            //console.log(isJoinLoading);
            return (<Button loading={this.state.isJoinLoading} fluid size="large" disabled={this.state.isJoinLoading}
                            onClick={this.handleJoinGroupButton}>Join</Button>)
        }
    }


    getGroupAttribute(attribute) {
        if (this.props.groupID) {
            let group = this.props.cache.groups[this.props.groupID];
            if (group) {
                if (attribute.substr(attribute.length - 6) === "Length") {
                    attribute = attribute.substr(0, attribute.length - 6);
                    if (group[attribute] && group[attribute].length) {
                        return group[attribute].length;
                    }
                    else {
                        return 0;
                    }
                }
                return group[attribute];
            }
        }
        return null;
    }

    createGroupChallenge(isOwned) {
        if(isOwned) {
            return (
                <Modal closeIcon trigger={<Button fluid primary>Create Challenge {" "}<Icon name="trophy"/></Button>}>
                    <Modal.Content>
                        <CreateGroupChallengeProp associatedGroup={this.props.groupID}/>
                    </Modal.Content>
                </Modal>
            );
        }
    }

    render() {

        const panes = [
            { menuItem: 'Group Posts', render: () => (
                    <Tab.Pane basic className='u-border--0 u-padding--0 u-margin-top--3'>
                        <Modal trigger={<Button fluid primary>Create Post</Button>} closeIcon>
                            <CreatePostProp/>
                        </Modal>
                        <DatabaseObjectList ids={this.state.posts}
                                            noObjectsMessage="No posts yet!"
                                            acceptedItemTypes={["Post"]}
                            // TODO Check the sort...
                                            sortFunction={(a, b) => a.time_created.localeCompare(b.time_created)}
                        />
                    </Tab.Pane>
                )},
            {menuItem: 'Group Challenges', render: () => (
                    <Tab.Pane basic className='u-border--0 u-padding--0 u-margin-top--3'>
                        <div>{this.createGroupChallenge(this.state.isOwned)}</div>
                        <DatabaseObjectList ids={this.getGroupAttribute("challenges")}
                                            noObjectsMessage={"No challenges yet!"}
                                            sortFuntion={(a, b) => a.endTime.localeCompare(b.endTime)}
                        />
                    </Tab.Pane>)
            },
            { menuItem: 'Group Chat', render: () => (
                    <Tab.Pane basic className='u-border--0 u-padding--0 u-margin-top--3'>
                        <CommentScreen board={this.state.groupID}/>
                    </Tab.Pane>
                )},
        ];

        if (!this.getGroupAttribute("id")) {
            return(
                <Modal open={this.props.open} onClose={this.props.onClose.bind(this)}>
                    <Message icon>
                        <Icon name='spinner' size="small" loading />
                        <Message.Content>
                            <Message.Header>
                                Loading...
                            </Message.Header>
                        </Message.Content>
                    </Message>
                </Modal>
            );
        }

        return(
            <Modal open={this.props.open} onClose={this.props.onClose.bind(this)}>
                <Icon className='close' onClick={() => this.props.onClose()}/>
                <Modal.Header align='center'>{this.getGroupAttribute("title")}</Modal.Header>
                <Modal.Content>
                    {this.editButton(this.state.isEditing)}
                    {this.createCorrectSettingsButton(this.state.isOwned, this.state.isJoined, this.state.groupID, this.state.isLoading)}
                    <Grid centered>
                        <Grid.Column>
                            <Image style={{width: '300px', height: '300px', minWidth: '100px', minHeight: '100px'}}
                                circular src={this.getGroupAttribute("groupImage")} size="large" centered />
                        </Grid.Column>
                    </Grid>
                    <Grid centered>
                        <strong>{"\""}{this.getGroupAttribute("motto")}{"\""}</strong>
                    </Grid>
                    <Modal trigger={
                        <Button floated='left' primary className="u-button--flat u-padding-left--1">
                            <Icon name='users' /> Owners</Button>}>
                        <Modal.Content>
                            <DatabaseObjectList ids={this.getGroupAttribute("owners")} noObjectsMessage={"No owners yet!"}/>
                        </Modal.Content>
                    </Modal>
                    <Modal trigger={
                        <Button floated='right' primary className="u-button--flat u-padding-left--1">
                            <Icon name='users' /> Members</Button>}>
                        <Modal.Content>
                            <DatabaseObjectList ids={this.getGroupAttribute("members")} noObjectsMessage={"No members yet!"}/>
                        </Modal.Content>
                    </Modal>
                </Modal.Content>
                {this.createCorrectButton(panes)}
            </Modal>
        );
    }

}

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
    info: state.info
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClient: (id, variablesList) => {
            dispatch(fetchClient(id, variablesList));
        },
        fetchTrainer: (id, variablesList) => {
            dispatch(fetchClient(id, variablesList));
        },
        forceFetchUserAttributes: (attributeList) => {
            dispatch(forceFetchUserAttributes(attributeList));
        },
        fetchGroup: (id, variablesList) => {
            dispatch(fetchGroup(id, variablesList));
        },
        forceFetchGroup: (id, variablesList) => {
            dispatch(forceFetchGroup(id, variablesList));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDescriptionModal);
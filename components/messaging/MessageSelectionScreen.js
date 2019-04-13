import React, { Component } from 'react'
import { List, Icon, Grid, Button, Message, Modal } from 'semantic-ui-react';
import ClientCard, {ClientCardInfo} from "../cards/ClientCard";
import { connect } from "react-redux";
import {fetchItem} from "../../redux/actions/cacheActions";
import Spinner from "../props/Spinner";
import {getItemTypeFromID, switchHandleItemType, switchReturnItemType} from "../../logic/ItemType";
import TrainerCard, {TrainerCardInfo} from "../cards/TrainerCard";
import EventCard, {EventCardInfo} from "../cards/EventCard";
import ChallengeCard, {ChallengeCardInfo} from "../cards/ChallengeCard";
import PostCard, {PostCardInfo} from "../cards/PostCard";
import MessageBoardCard from "./MessageBoardCard";
import MessageBoard from "./MessageBoard";
import {getMessageBoardName} from "../../logic/MessageHelper";

// TODO Refactor this stuff!

type Props = {
    ids: [string],
    noObjectsMessage: string,
    acceptedItemTypes?: [string],
    sortFunction?: any
}

class DatabaseObjectList extends Component<Props> {
    state = {
        isLoading: true,
        ids: null,
        objects: [],
        marker: 0,
        board: null
    };

    constructor(props) {
        super(props);
        this.handleMessagePress = this.handleMessagePress.bind(this);
    }


    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        // We can use json stringify to check this because it's an array of strings
        if (newProps.ids && JSON.stringify(this.state.ids) !== JSON.stringify(newProps.ids)) {
            this.state.ids = newProps.ids;
            // alert("received ids = " + JSON.stringify(newProps.ids));
            this.setState({isLoading: true, ids: newProps.ids, objects: []}, () => {
                const addObject = (object) => {
                    if (object) {
                        this.state.objects.push(object);
                    }
                    this.setState({isLoading: false});
                };
                for (let i = 0; i < newProps.ids.length; i++) {
                    const id = newProps.ids[i];
                    const itemType = getItemTypeFromID(id);
                    if (!newProps.acceptedItemTypes || newProps.acceptedItemTypes.includes(itemType)) {
                        const variableList = switchReturnItemType(itemType,
                            ClientCardInfo.fetchList,
                            TrainerCardInfo.fetchList,
                            null, null, null,
                            EventCardInfo.fetchList,
                            ChallengeCardInfo.fetchList,
                            null,
                            PostCardInfo.fetchList,
                            null, null, null, MessageBoardCard.fetchVariableList,
                            "Get variable list from item type not implemented!");
                        this.props.fetchItem(itemType, id, variableList, addObject);
                    }
                }
            });
        }
    }

    getMessageBoard() {
        if (this.state.board) {
            return (
                <Modal open={true} onClose={() => {this.setState({board: null})}} closeIcon>
                    <MessageBoard board={this.state.board}/>
                </Modal>
            );
        }
        return null;
    }

    handleMessagePress(otherUserID) {
        this.setState({board: getMessageBoardName([this.props.user.id, otherUserID])})
    }

    render() {
        function objectComponents(objects, sortFunction, handleMessagePressFunction) {
            const objectList = [...objects];
            const components = [];
            if (sortFunction) {
                objectList.sort(sortFunction);
            }
            for (const key in objectList) {
                if (objectList.hasOwnProperty(key)) {
                    const object = objectList[key];
                    const id = object.id;
                    const itemType = object.item_type;
                    const rank = parseInt(key) + 1;
                    components.push(
                        <List.Item key={key}>
                            <Grid>
                                <Grid.Column width={12}>
                                    {switchReturnItemType(itemType,
                                        <ClientCard rank={rank} client={object}/>,
                                        <TrainerCard rank={rank} trainer={object}/>,
                                        null,
                                        null,
                                        null,
                                        <EventCard event={object}/>,
                                        <ChallengeCard challenge={object}/>,
                                        null,
                                        <PostCard post={object}/>,
                                        null,
                                        null,
                                        null,
                                        <MessageBoardCard messageBoardID={id}/>,
                                        "Get database object list object not implemented for item type"
                                    )}
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Button primary fluid onClick={() => {handleMessagePressFunction(id)}}><Icon name='comment outline' size='large' />
                                        <Icon name='plus' size='large' /></Button>
                                </Grid.Column>
                            </Grid>
                        </List.Item>
                    );
                    components.push(switchReturnItemType())
                }
            }
            return components;
        }
        if (this.props.isLoading) {
            return(
                <Spinner/>
            )
        }
        if (this.state.objects.length > 0) {
            return(
                <List relaxed verticalAlign="middle">
                    {objectComponents(this.state.objects, this.props.sortFunction, this.handleMessagePress)}
                    {this.getMessageBoard()}
                </List>
            );
        }
        else {
            return(
                <Message>{this.props.noObjectsMessage}</Message>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItem: (itemType, id, variableList, dataHandler, failureHandler) => {
            dispatch(fetchItem(itemType, id, variableList, dataHandler, failureHandler));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseObjectList);
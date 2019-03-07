import React, { Component } from 'react';
import CommentBox from "./MessageInput";
import Messages from './Messages';
import { Icon, Message, Divider } from "semantic-ui-react";
import {fetchClient, fetchTrainer} from "../../redux_actions/cacheActions";
import {
    queryNextMessagesFromBoard,
    discardBoard
} from "../../redux_actions/messageActions";
import {connect} from "react-redux";
import ScrollView from "react-inverted-scrollview";

type Props = {
    board: string,
};

class MessageBoard extends Component<Props> {
    state = {
        board: null,
        messages: [],
        isLoading: false,
        fetchLimit: 10,
        canFetch: true,
        canScroll: false
    };

    constructor(props) {
        super(props);
        // this.handleAddComment = this.handleAddComment.bind(this);
        this.queryMessages = this.queryMessages.bind(this);
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillUnmount() {
        // Unsubscribe to the Ably messages
        // Also potentially clear the board?
        discardBoard(this.state.board);
    }

    componentWillReceiveProps(newProps, nextContext) {
        if (this.state.board !== newProps.board) {
            this.state.board = newProps.board;
            this.setState({});
            // this.props.setHandlerToBoard(newProps.board, (message) => {
            //     // If you get a message, then that means that it is definitely a Message?
            //     // console.log("What to do with this?\n\n" + JSON.stringify(message));
            //
            //     this.props.addMessageFromNotification(newProps.board, message.data);
            // });
            // Set up the board
            // this.queryMessages();
            if (this.state.board && !this.props.message.boards[this.state.board]) {
                //alert("is in board");
                this.queryMessages();
            }
            if(!this.state.canScroll) {
                //alert("can't scroll");
                this.queryMessages();
            }
        }
    }

    queryMessages() {
        // console.log("Can we query?");
        if (this.state.canFetch) {
            //alert("Querying next messages from the board!");
            this.setState({isLoading: true});
            this.props.queryNextMessagesFromBoard(this.state.board, this.state.fetchLimit, (items) => {
                if (items) {
                    // this.setState({messages: [...this.state.messages, ...items]});
                    // for (let i = 0; i < items.length; i++) {
                    //     // Fetch everything we need to!
                    //     const message = items[i];
                    //     const fromItemType = getItemTypeFromID(message.from);
                    //     if (fromItemType === "Client") {
                    //         this.props.fetchClient(message.from, ["name"])
                    //     }
                    //     else if (fromItemType === "Trainer") {
                    //         this.props.fetchTrainer(message.from, ["name"]);
                    //     }
                    // }
                }
                else {
                    // That means we're done getting messages
                    this.setState({canFetch: false});
                }
                this.setState({isLoading: false});
            });
        }
    }

    getBoardMessages() {
        const board = this.state.board;
        if (board && this.props.message.boards[board]) {
            return this.props.message.boards[this.state.board];
        }
        return [];
    }
    scrollToBottom() {
        if (!this.scrollView) return;
        this.scrollView.scrollToBottom();
    }

    scrollToTop() {
        if (!this.scrollView) return;
        this.scrollView.scrollToTop();
    }

    handleScroll = ({ scrollTop, scrollBottom }) => {
        this.setState({canScroll: true});
        console.log('scrollTop', scrollTop);
        console.log('scrollBottom', scrollBottom);
        if (scrollTop < 1) {
            // Then we fetch new stuff
            this.setState({canFetch: true});
            this.queryMessages();
        }
    };

    loadHistory(historyLoading) {
        if (historyLoading) {
            return (
                <Message icon>
                    <Icon name='spinner' size="small" loading />
                    <Message.Content>
                        <Message.Header>
                            Loading...
                        </Message.Header>
                    </Message.Content>
                </Message>
            )
        }
    }

    render() {

        return (
                <div className='u-margin-top--2'>
                    {/*console.log("Comment screen render user: " + this.props.curUser)*/}
                    {this.loadHistory(this.state.isLoading)}
                    <ScrollView
                        class='chat'
                        width='100%'
                        height='300px'
                        ref={ref => (this.scrollView = ref)}
                        onScroll={this.handleScroll}
                    >
                        <Messages board={this.state.board} messages={this.getBoardMessages()} userID={this.props.user.id}/>
                    </ScrollView>
                    <Divider className='u-margin-top--2' />
                    <CommentBox board={this.state.board}/>
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
    message: state.message
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClient: (id, variablesList, dataHandler) => {
            dispatch(fetchClient(id, variablesList, dataHandler));
        },
        fetchTrainer: (id, variablesList, dataHandler) => {
            dispatch(fetchTrainer(id, variablesList, dataHandler));
        },
        queryNextMessagesFromBoard: (board, limit, dataHandler, failureHandler) => {
            dispatch(queryNextMessagesFromBoard(board, limit, dataHandler, failureHandler));
        },
        discardBoard: (board) => {
            dispatch(discardBoard(board));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);

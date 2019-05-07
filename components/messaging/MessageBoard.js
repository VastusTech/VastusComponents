import React, { useState, useEffect } from 'react';
import CommentBox from "./MessageInput";
import Messages from './Messages';
import { Message, Divider } from "semantic-ui-react";
import {fetchClient, fetchTrainer} from "../../redux/convenience/cacheItemTypeActions";
import {
    queryNextMessagesFromBoard,
    discardBoard, unsubscribeFromBoard
} from "../../redux/actions/messageActions";
import {connect} from "react-redux";
import ScrollView from "react-inverted-scrollview";
import Spinner from "../props/Spinner";
import {getIDsFromMessageBoard, ifMessageUnreadFor} from "../../logic/MessageHelper";

const fetchLimit = 10;
const messageMinimum = 10;

type Props = {
    board: string,
};

/**
 * Gets another batch of messages for the board.
 *
 * @param {string} board The name of the board to receive messages for.
 * @param {number} fetchLimit The number of messages to fetch at most.
 * @param {boolean} canFetch If the board can continue fetching.
 * @param {function(boolean)} setCanFetch Sets the can fetch state.
 * @param {function(string, number, function([{}]), function(error))} queryNextMessagesFromBoard Message function to
 * retrieve the next batch of Messages from the database.
 */
const queryMessages = (board, fetchLimit, canFetch, setCanFetch, queryNextMessagesFromBoard) => {
    if (canFetch) {
        // alert("Querying next messages from the board!");
        // setIsLoading(true);
        queryNextMessagesFromBoard(board, fetchLimit, (items) => {
            // TODO Fetch all the rest of the information for the User when I switch it back to that ~ Leo
            if (!items) {
                setCanFetch(false);
            }
            else {
                // That means we're done getting messages
            }
            // setIsLoading(false);
        });
    }
};

/**
 * Scrolls to the bottom of the board.
 *
 * @param {{}} scrollViewRef The reference to the scroll view object, allowing it to perform functions.
 */
const scrollToBottom = (scrollViewRef) => {
    if (!scrollViewRef) return;
    scrollViewRef.scrollToBottom();
};

/**
 * Scrolls to the top of the board.
 *
 * @param {{}} scrollViewRef The reference to the scroll view object, allowing it to perform functions.
 */
// const scrollToTop = (scrollViewRef) => {
//     if (!scrollViewRef) return;
//     scrollViewRef.scrollToTop();
// };

/**
 * Handles the scroll for the message board and loads the next set of messages if applicable.
 *
 * @param {{}} ref The reference to the scroll view object, giving information about its current state.
 * @param {string} board The name of the board to handle the scroll for.
 * @param {number} fetchLimit The number of messages to fetch at most.
 * @param {boolean} canFetch If the board can continue fetching.
 * @param {function(boolean)} setCanFetch Sets the can fetch state.
 * @param {function(string, number, function([{}]), function(error))} queryNextMessagesFromBoard Message function to
 * retrieve the next batch of Messages from the database.
 */
const handleScroll = (ref, board, fetchLimit, canFetch, setCanFetch, queryNextMessagesFromBoard) => {
    // setCanScroll(true);
    const scrollTop = ref.scrollTop;
    const scrollBottom = ref.scrollBottom;
    console.log('scrollTop', scrollTop);
    console.log('scrollBottom', scrollBottom);
    if (scrollTop < 1) {
        // Then we fetch new stuff
        setCanFetch(true);
        queryMessages(board, fetchLimit, canFetch, setCanFetch, queryNextMessagesFromBoard);
    }
};

/**
 * Figures out the other User's read status of the Message. (Like iMessage "read").
 *
 * @param {string} otherID The ID of the other user.
 * @param {{from: string, lastSeenFor: [string]}} firstMessage The first message in the board, indicating read status.
 * @return {*} React JSX to display. Returns "seen" if the other user has read the message that you sent. Otherwise "".
 */
const getOtherReadStatus = (otherID, firstMessage) => {
    if (otherID && firstMessage) {
        if (firstMessage.from !== otherID) {
            if (!ifMessageUnreadFor(otherID, firstMessage)) {
                return <Message>Seen</Message>;
            }
            else {
                return <Message>Unseen</Message>;
            }
        }
    }
    return null;
};

/**
 * Shows a message board with the input and its Messages. Handles querying for the Messages and the sending of
 * everything.
 *
 * @param props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const MessageBoard = (props: Props) => {
    const [otherID, setOtherID] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    const [canFetch, setCanFetch] = useState(true);
    // const [canScroll, setCanScroll] = useState(false);
    const [scrollViewRef, setScrollViewRef] = useState(null);

    useEffect(() => {
        if (props.board) {
            scrollToBottom(scrollViewRef);
            if (props.board && (!props.message.boards[props.board]
                || props.message.boards[props.board].length < messageMinimum)) {
                // alert("Not enough messages!");
                queryMessages(props.board, fetchLimit, canFetch, setCanFetch,
                    props.queryNextMessagesFromBoard);
            }
            const ids = getIDsFromMessageBoard(props.board);
            if (ids.length === 2) {
                for (let i = 0; i < 2; i++) {
                    if (props.user.id && ids[i] !== props.user.id) {
                        setOtherID(ids[i]);
                    }
                }
            }
            return () => {
                alert("Unsubscribing from " + props.board);
                props.unsubscribeFromBoard(props.board);
                // Unsubscribe to the Ably messages
                // Also potentially clear the board?
                // props.discardBoard(props.board);
            }
        }
    }, [props.board]);

    return (
        <div className='u-margin-top--2'>
            {/*console.log("Comment screen render user: " + this.props.curUser)*/}
            <ScrollView
                class='chat'
                width='100%'
                height='300px'
                ref={ref => setScrollViewRef(ref)}
                onScroll={ref => handleScroll(ref, props.board, fetchLimit, canFetch, setCanFetch,
                    props.queryNextMessagesFromBoard)}
            >
                <Spinner loading={(props.message.boardIfFirsts[props.board] || props.message.boardNextTokens[props.board])}/>
                <Messages board={props.board}
                          messages={(props.board && props.message.boards[props.board]) ?
                              props.message.boards[props.board] :
                              []}
                          userID={props.user.id}/>
                {getOtherReadStatus(otherID, props.message.boards[props.board] ? props.message.boards[props.board][0] : null)}
            </ScrollView>
            <Divider className='u-margin-top--2' />
            <CommentBox board={props.board}/>
        </div>
    );
};

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
        },
        unsubscribeFromBoard: (board) => {
            dispatch(unsubscribeFromBoard(board));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);

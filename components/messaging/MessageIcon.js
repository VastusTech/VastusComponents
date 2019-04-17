import React, {useEffect} from 'react';
import {Icon} from 'semantic-ui-react';
import {
    peekAtFirstMessageFromBoard,
} from "../../redux/actions/messageActions";
import {connect} from "react-redux";
import {ifMessageUnreadFor} from "../../logic/MessageHelper";

/**
 * Calculates the number of unread boards the user has.
 *
 * @param {string} userID The ID of the User to find the number of unread boards for.
 * @param {{}} boardsCache The messages cache to get the boards from.
 * @param {[string]} userBoards The boards that the User is a part of.
 * @return {number} The number of unread boards the User has.
 */
const numUnread = (userID, boardsCache, userBoards) => {
    let unread = 0;
    if (userBoards) {
        const numBoards = userBoards.length;
        for (let i = 0; i < numBoards; i++) {
            const board = boardsCache[userBoards[i]];
            if (board && board.length > 0) {
                if (ifMessageUnreadFor(userID, board[0])) {
                    unread++;
                }
            }
        }
    }
    return unread;
};

/**
 * Displays the Message Icon with the unread boards number next to the icon.
 *
 * @param {{}} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const MessageIcon = (props) => {
    useEffect(() => {
        const boards = props.user.messageBoards;
        if (boards) {
            const numBoards = boards.length;
            for (let i = 0; i < numBoards; i++) {
                const boardID = boards[i];
                props.peekAtFirstMessageFromBoard(boardID);
            }
        }
    }, []);

    let unread = numUnread(props.user.id, props.message.boards, props.user.messageBoards);
    if (unread > 0) {
        return (
            <div>
                <Icon name='comment' size='large'/>
                {unread}
            </div>
        );
    }
    else {
        return (
            <div>
                <Icon name='comment outline' size='large' />
            </div>
        );
    }
};

const mapStateToProps = state => ({
    user: state.user,
    message: state.message,
});

const mapDispatchToProps = dispatch => {
    return {
        peekAtFirstMessageFromBoard: (board) => {
            dispatch(peekAtFirstMessageFromBoard(board));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageIcon);
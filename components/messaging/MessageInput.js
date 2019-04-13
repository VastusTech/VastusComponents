import React, { useState, Fragment } from 'react';
import {Button, Input, Icon, Grid} from "semantic-ui-react";
import {connect} from "react-redux";
import MessageFunctions from "../../database_functions/MessageFunctions";
import {err, log} from "../../../Constants";

type Props = {
    board: string
}

/**
 * TODO
 *
 * @param board
 * @param e
 * @param setIsLoading
 * @param userID
 * @param username
 * @param userProfileImagePath
 */
const addMessage = (board, e, setIsLoading, userID, username, userProfileImagePath, ) => {
    // Prevent the default behaviour of form submit
    e.preventDefault();

    // Get the value of the comment box
    // and make sure it not some empty strings
    let message = e.target.elements.message.value.trim();

    // Make sure name and comment boxes are filled
    if (message) {
        setIsLoading(true);
        MessageFunctions.createTextMessage(userID, userID, username, userProfileImagePath, board, message, () => {
            log&&console.log("Successfully sent message!");
            setIsLoading(false);
        }, (error) => {
            err&&console.error("Failed to send message! Error = " + JSON.stringify(error));
            setIsLoading(false);
        });

        // Clear input fields
        e.target.elements.message.value = '';
    }
};

/**
 * TODO
 *
 * @param picture
 * @param board
 * @param userID
 * @param username
 * @param userProfileImagePath
 * @param setIsLoading
 */
const addPicture = (picture, board, userID, username, userProfileImagePath, setIsLoading) => {
    setIsLoading(true);
    MessageFunctions.createPictureMessage(userID, userID, username, userProfileImagePath, board, picture, "picture", () => {
        setIsLoading(false);
        log&&console.log("Successfully created picture message!");
    }, (error) => {
        setIsLoading(false);
        err&&console.error("FAILED ADDING PICTURE. ERROR = " + JSON.stringify(error));
    });
};

/**
 * TODO
 *
 * @param video
 * @param board
 * @param userID
 * @param username
 * @param userProfileImagePath
 * @param setIsLoading
 */
const addVideo = (video, board, userID, username, userProfileImagePath, setIsLoading) => {
    this.setState({sendLoading: true});
    MessageFunctions.createVideoMessage(userID, userID, username, userProfileImagePath, board, video, "video", () => {
        setIsLoading(false);
        log&&console.log("Successfully created video message!");
    }, (error) => {
        setIsLoading(false);
        err&&console.error("FAILED ADDING VIDEO. ERROR = " + JSON.stringify(error));
    });
};

/**
 * TODO
 *
 * @param event
 * @param board
 * @param userID
 * @param username
 * @param userProfileImagePath
 * @param setIsLoading
 */
const addPictureOrVideo = (event, board, userID, username, userProfileImagePath, setIsLoading) => {
    const file = event.target.files[0];
    const fileType = file["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const validVideoTypes = ["video/mp4", "video/mv4", "video/avi", "video/mpg"];
    if (validImageTypes.includes(fileType)) {
        addPicture(file, board, userID, username, userProfileImagePath, setIsLoading);
    }
    else if (validVideoTypes.includes(fileType)) {
        addVideo(file, board, userID, username, userProfileImagePath, setIsLoading);
    }
    else {
        console.log("PROBLEMATIC FILE TYPE = " + fileType);
    }
};

/**
 * TODO
 *
 * @param props
 * @return {*}
 * @constructor
 */
const MessageInput = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Fragment>
            <form onSubmit={e => addMessage(props.board, e, setIsLoading, props.user.id, props.user.name, props.user.profileImagePath)} className='u-margin-top--2'>
                <Input type='text' action fluid className="textarea" name="message" placeholder="Write Message...">
                    <input/>
                    <Button as='label' for='proPicUpload'>
                        <Icon name='camera' size = "large" style={{marginLeft: '8px'}}/>
                        <input type="file" accept="image/*;video/*;capture=camcorder" id="proPicUpload" hidden='true' onChange={e => addPictureOrVideo(e, props.board, props.user.id, props.user.name, props.user.profileImagePath, setIsLoading)}/>
                    </Button>
                    <Button loading={isLoading} primary>Send</Button>
                </Input>
            </form>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    message: state.message
});

export default connect(mapStateToProps)(MessageInput);
import React, {useState, Fragment} from 'react';
import {Button, Input, Icon, Progress} from "semantic-ui-react";
import {connect} from "react-redux";
import MessageFunctions from "../../database_functions/MessageFunctions";
import {err, log} from "../../../Constants";

type Props = {
  board: string
}

/**
 * Sends a text message to the message board.
 *
 * @param {{}} e The event value for the text input.
 * @param {string} board The name of the message board to send the video to.
 * @param {string} userID The ID of the User sending the message.
 * @param {string} username The username of the User sending the message.
 * @param {string} userProfileImagePath The S3 profile image path of the User sending the message.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 */
const addMessage = (e, board, userID, username, userProfileImagePath, setIsLoading, setPercent) => {
  // Prevent the default behaviour of form submit
  e.preventDefault();

  // Get the value of the comment box
  // and make sure it not some empty strings
  let message = e.target.elements.message.value.trim();

  setPercent(50);
  // Make sure name and comment boxes are filled
  if (message) {
    setIsLoading(true);
    MessageFunctions.createTextMessage(userID, userID, username, userProfileImagePath, board, message, () => {
      log && console.log("Successfully sent message!");
      setPercent(100);
      setIsLoading(false);
    }, (error) => {
      setPercent(0);
      err && console.error("Failed to send message! Error = " + JSON.stringify(error));
      setIsLoading(false);
    });

    // Clear input fields
    e.target.elements.message.value = '';
  }
};

/**
 * Sends a picture message to the message board.
 *
 * @param {*} picture The file of the picture to send.
 * @param {string} board The name of the message board to send the video to.
 * @param {string} userID The ID of the User sending the message.
 * @param {string} username The username of the User sending the message.
 * @param {string} userProfileImagePath The S3 profile image path of the User sending the message.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 */
const addPicture = (picture, board, userID, username, userProfileImagePath, setIsLoading) => {
  setIsLoading(true);
  MessageFunctions.createPictureMessage(userID, userID, username, userProfileImagePath, board, picture, "picture", () => {
    setIsLoading(false);
    log && console.log("Successfully created picture message!");
  }, (error) => {
    setIsLoading(false);
    err && console.error("FAILED ADDING PICTURE. ERROR = " + JSON.stringify(error));
  });
};

/**
 * Sends a video message to the message board.
 *
 * @param {*} video The video file to send to the board.
 * @param {string} board The name of the message board to send the video to.
 * @param {string} userID The ID of the User sending the message.
 * @param {string} username The username of the User sending the message.
 * @param {string} userProfileImagePath The S3 profile image path of the User sending the message.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 */
const addVideo = (video, board, userID, username, userProfileImagePath, setIsLoading) => {
  this.setState({sendLoading: true});

  MessageFunctions.createVideoMessage(userID, userID, username, userProfileImagePath, board, video, "video", () => {
    setIsLoading(false);
    log && console.log("Successfully created video message!");
  }, (error) => {
    setIsLoading(false);
    err && console.error("FAILED ADDING VIDEO. ERROR = " + JSON.stringify(error));
  });
};

/**
 * Takes a file from the camcorder of the device and sends that file through the message board, using the file type to
 * identify it.
 *
 * @param {{}} event The event value for the file input.
 * @param {string} board The name of the message board to send the video to.
 * @param {string} userID The ID of the User sending the message.
 * @param {string} username The username of the User sending the message.
 * @param {string} userProfileImagePath The S3 profile image path of the User sending the message.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 */
const addPictureOrVideo = (event, board, userID, username, userProfileImagePath, setIsLoading) => {
  const file = event.target.files[0];
  const fileType = file["type"];
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  const validVideoTypes = ["video/mp4", "video/mv4", "video/avi", "video/mpg"];
  if (validImageTypes.includes(fileType)) {
    addPicture(file, board, userID, username, userProfileImagePath, setIsLoading);
  } else if (validVideoTypes.includes(fileType)) {
    addVideo(file, board, userID, username, userProfileImagePath, setIsLoading);
  } else {
    console.log("PROBLEMATIC FILE TYPE = " + fileType);
  }
};

const loadingBar = (isLoading, percent) => {
  if (isLoading) {
    return (
      <Progress percent={percent} active color='purple'/>
    );
  }
}

/**
 * This is the component to send messages for a message board. Handles text, picture, and video messages.
 *
 * @param props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const MessageInput = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [percent, setPercent] = useState(0);

  return (
    <Fragment>

      <form
        onSubmit={e => addMessage(e, props.board, props.user.id, props.user.username, props.user.profileImagePath, setIsLoading, setPercent)}
        className='u-margin-top--2'>
        {loadingBar(isLoading, percent)}
        <Input type='text' action fluid className="textarea" name="message" placeholder="Write Message..."
        style={{border: '1px solid rebeccapurple', background: 'white', color: 'purple'}} color='white'>
          <input/>
          <Button as='label' for='proPicUpload'>
            <Icon name='camera' size="large" style={{marginLeft: '8px'}}/>
            <input type="file" accept="image/*;video/*;capture=camcorder" id="proPicUpload" hidden='true'
                   onChange={e => addPictureOrVideo(e, props.board, props.user.id, props.user.name, props.user.profileImagePath, setIsLoading)}/>
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
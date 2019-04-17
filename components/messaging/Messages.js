import React from "react";
import Message from './Message';
import { Container } from "semantic-ui-react";

/**
 * The component for displaying a list of messages in the correct order based on how they appear in the message redux.
 *
 * @param props The props passed into the component.
 * @return {*} The React JSX required to display the component.
 * @constructor
 */
const Messages = (props: {messages: [any], userID: string}) => {
    return (
        <Container style={{width: '85%'}}>
            {
                props.messages.slice(0).reverse().map((message, index) => {
                    return <Message key={index} message={message} userID={props.userID}/>
                })
            }
        </Container>
    );
};

export default Messages;

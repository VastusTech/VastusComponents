import React from "react";
import Message from './Message';
import { Container } from "semantic-ui-react";

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

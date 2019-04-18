import React from 'react';
import { Card, Grid, Header, Modal, Label } from "semantic-ui-react";
import MessageBoard from "./MessageBoard";

type Props = {
    messageBoardTitle: string,
    messageBoardProPic: string,
    messageBoardLastMessage: string,
    messageBoardID: string,
    unread: boolean,
    onClickCard: any
};

/**
 * The Message Board Card as it appears in the board feed. Shows preview information, user information and the unread
 * status of the board to the user.
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const MessageBoardCard = (props: Props) => {
    if(props.unread) {
        return (
            <Modal trigger={
                <Card fluid color='purple' raised onClick={() =>
                    props.onClickCard()
                }>
                    <Card.Content>
                        <Grid columns={3} verticalAlign='middle'>
                            <Grid.Column width={1}>
                                {props.unread ? <Label empty size='mini' circular color='purple'/> : null}
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <div className="u-avatar u-avatar--small"
                                     style={{backgroundImage: `url(${props.messageBoardProPic})`}}>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid.Row style={{marginBottom: '10px'}}>
                                    <Header size='medium'>{props.messageBoardTitle}</Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <div>{props.messageBoardLastMessage}</div>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                </Card>
            } closeIcon>
                <MessageBoard board={props.messageBoardID}/>
            </Modal>
        );
    }
    else {
        return (
            <Modal trigger={
                <Card fluid raised onClick={() =>
                    props.onClickCard()
                }>
                    {props.unread ? <Label circular color='purple' floating/> : null}
                    <Card.Content>
                        <Grid columns={3}>
                            <Grid.Column width={1}>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <div className="u-avatar u-avatar--small"
                                     style={{backgroundImage: `url(${props.messageBoardProPic})`}}>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid.Row style={{marginBottom: '10px'}}>
                                    <Header size='medium'>{props.messageBoardTitle}</Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <div>{props.messageBoardLastMessage}</div>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                </Card>
            } closeIcon>
                <MessageBoard board={props.messageBoardID}/>
            </Modal>
        );
    }
};

export default MessageBoardCard;
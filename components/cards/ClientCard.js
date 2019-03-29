import React, { useState, Fragment } from 'react';
import { Card, Dimmer, Loader, Grid, Header } from 'semantic-ui-react';
import ClientModal from '../modals/ClientModal';
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";

export const ClientCardInfo = {
    fetchList: ["id", "username", "gender", "birthday", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath", "friendRequests"],
    ifSubscribe: false
};

type Props = {
    rank?: number,
    client: {
        id: string,
        username: string,
        gender: string,
        birthday: string,
        name: string,
        friends: [string],
        challengesWon: [string],
        scheduledEvents: [string],
        profileImagePath: string,
        friendRequests: [string]
    }
};

const profilePicture = (profileImage) => {
    if (profileImage) {
        return(
            <div className="u-avatar u-avatar--small" style={{backgroundImage: `url(${profileImage})`}}/>
        );
    }
    else {
        return(
            <Dimmer inverted>
                <Loader />
            </Dimmer>
        );
    }
};

/**
 * Client Card
 *
 * This is the generic view for how a client shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 */
const ClientCard = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const getClientAttribute = (attributeName) => {
        return getAttributeFromObject(props.client, attributeName);
    };

    if (!props.client) {
        return(
            <Card fluid raised>
                <h1>Loading...</h1>
            </Card>
        );
    }
    return(
        // This is displays a few important pieces of information about the challenge for the feed view.
        <Card fluid raised onClick={() => setModalOpen.bind(true)}>
            <Card.Content>
                {/* If no rank */}
                {!props.rank && (
                    <Fragment>
                        <Card.Header>
                            <div className="u-flex u-flex-justify--center u-margin-bottom--2">
                                {profilePicture()}
                            </div>
                        </Card.Header>
                        <Card.Header textAlign = 'center'>
                            {getClientAttribute("name")}
                        </Card.Header>
                    </Fragment>
                )}
                {/* If has rank */}
                {props.rank && (
                    <Grid divided verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Header size='large' textAlign='center'>{props.rank}</Header>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <div className="u-flex u-flex-align--center">
                                    {profilePicture(getClientAttribute("profileImage"))} <Header size='small' className='u-margin-top--0 u-margin-left--2'>{getClientAttribute("name")}</Header>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )}
                <ClientModal open={modalOpen} onClose={() => {console.log("closing"); setModalOpen(false); console.log("closing")}} clientID={props.client.id}/>
            </Card.Content>
            <Card.Content extra>
                <Card.Meta>
                    {getClientAttribute("challengesWonLength")} challenges won
                </Card.Meta>
            </Card.Content>
        </Card>
    );
};

export default ClientCard;

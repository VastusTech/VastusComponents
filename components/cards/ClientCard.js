import React, { useState, Fragment } from 'react';
import { Card, Grid, Header } from 'semantic-ui-react';
import ClientModal from '../modals/ClientModal';
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import StyledProfileImage from "../props/StyledProfileImage";

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

/**
 * This is the generic view for how a client shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param {Props} props The given props to the component.
 * @returns {*}
 * @constructor
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
        <Card fluid raised onClick={() => setModalOpen(true)}>
            <Card.Content>
                {/* If no rank */}
                {!props.rank && (
                    <Fragment>
                        <Card.Header>
                            <div className="u-flex u-flex-justify--center u-margin-bottom--2">
                                <StyledProfileImage profileImage={getClientAttribute("profileImage")} type={"Small"}/>
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
                                    <StyledProfileImage profileImage={getClientAttribute("profileImage")} type="Small"/>
                                </div>
                            </Grid.Column>
                            <Grid.Column textAlign = 'center'>
                                {getClientAttribute("name")}
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

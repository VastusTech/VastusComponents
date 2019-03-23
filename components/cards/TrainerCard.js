import React, { useState } from 'react';
import {Card, Dimmer, Loader, Grid, Icon, Image, Divider, Button, Feed} from 'semantic-ui-react';
import TrainerPortalModal from '../modals/TrainerModal';
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import Spinner from "../props/Spinner";

export const TrainerCardInfo = {
    fetchList: ["id", "name", "profileImagePath"],
    ifSubscribe: false
};


type Props = {
    rank?: number,
    trainer: {
        name: string,
    }
}

/**
 * Trainer Card
 *
 * This is the generic view for how a trainer shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 */
const TrainerCard = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const getTrainerAttribute = (attributeName) => {
        return getAttributeFromObject(props.trainer, attributeName);
    };
    const profilePicture = () => {
        if (getTrainerAttribute("profileImage")) {
            return(
                <div className="u-avatar u-avatar--large u-margin-bottom--neg2 u-margin-x--auto" style={{backgroundImage: `url(${getTrainerAttribute("profileImage")})`}}/>
            );
        }
        else {
            return(
                <Dimmer inverted>
                    <Spinner />
                </Dimmer>
            );
        }
    };

    if (!props.trainer) {
        return(
            <Dimmer inverted>
                <Spinner />
            </Dimmer>
        );
    }
    return (
        <Card fluid raised centered onClick={() => modalOpen||setModalOpen(true)}>
            <div className="u-container">
                {profilePicture()}
            </div>
            <Card.Content textAlign='center'>
                <Card.Header>
                    {getTrainerAttribute("name")}
                </Card.Header>
                <Card.Description>
                    {/*this.getTrainerAttribute("title")*/} Personal Trainer
                </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='center'>
                <Button.Group fluid>
                    <Button>
                        <Icon name='globe'/> Boston, MA</Button>
                    <Button primary>
                        Vastus Certified</Button>
                </Button.Group>
            </Card.Content>
            <TrainerPortalModal open={modalOpen} onClose={() => setModalOpen(false)} trainerID={getTrainerAttribute("id")}/>
        </Card>
    )
};

export default TrainerCard;


import React, { useState } from 'react';
import {Button, Card, Dimmer, Grid, Image} from 'semantic-ui-react';
import ChallengeDescriptionModal from '../modals/ChallengeDescriptionModal';
import {daysLeft, parseISOString} from "../../logic/TimeHelper";
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import type;
import StyledProfileImage from "./TrainerCard";
import Challenge from "../../types/Challenge";
import MainTab from "../../../screens/main_tab/MainTab";


export const StoreItemModalInfo = {
    fetchList: ["id", "item_type", "prizeName", "time_created",
        "partner", "buyer", "price", "profileImagePath", "purchased" ]
};

type Props = {
    deal: StoreItem
};


const StoreItemModal = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const getStoreItemAttribute = (attributeName) => {
        return getAttributeFromObject(props.deal, attributeName);
    };

    if (!props.deal) {
        return (
            <Dimmer inverted>
                <Spinner/>
            </Dimmer>
        );
    }
    return (
        <Card fluid raised centered onClick={() => modalOpen || setModalOpen(true)}>
            <Card.Header>{getStoreItemAttribute("name")}</Card.Header>
            <Card.Content>
                <Grid centered>
                    <Grid.Column>
                        <div className="u-container">
                            <Image circular src={getStoreItemAttribute("image")} />
                        </div>
                        <Grid.Row>
                            <Grid centered columns='equal'>
                                <Grid.Column>
                                    {getStoreItemAttribute("price")}
                                </Grid.Column>
                                <Grid.Column>
                                    <Image src="logo.png" />
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Card.Content>
            <dealPortalModal open={modalOpen} onClose={() => setModalOpen(false)} dealID={getDealAttribute("id")}/>
        </Card>
    );
}

export default StoreItemModal;
import React, { useState } from 'react';
import {Button, Card, Dimmer, Icon, Image} from 'semantic-ui-react';
import ChallengeDescriptionModal from '../modals/ChallengeDescriptionModal';
import {daysLeft, parseISOString} from "../../logic/TimeHelper";
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import type;
import StyledProfileImage from "./TrainerCard"; Challenge from "../../types/Challenge";


export const DealCardInfo = {
    fetchList: ["id", "item_type", "prizeName", "time_created",
         "partner", "buyer", "price", "profileImagePath", "purchased" ]
};

type Props = {
    deal: Deal
};


const DealCard = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const getDealAttribute = (attributeName) => {
        return getAttributeFromObject(props.deal, attributeName);
    };

    if (!props.deal) {
        return(
            <Dimmer inverted>
                <Spinner />
            </Dimmer>
        );
    }
    return (
<Card fluid raised centered onClick={() => modalOpen||setModalOpen(true)}>
    <div className="u-container">
        <StyledProfileImage profileImage={getDealAttribute("profileImage")} type="LargeCenter"/>
    </div>
    <Card.Content textAlign='center'>
        <Card.Header>
            {getDealAttribute("productName")}
        </Card.Header>
    </Card.Content>
    <Card.Content extra textAlign='center'>

    </Card.Content>
    <dealPortalModal open={modalOpen} onClose={() => setModalOpen(false)} dealID={getDealAttribute("id")}/>
</Card>
/*

    public Boolean purchased;
 */
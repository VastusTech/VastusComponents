import React, {useState} from 'react';
import {Card, Dimmer, Icon, Button} from 'semantic-ui-react';
import TrainerPortalModal from '../modals/TrainerModal';
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import Spinner from "../props/Spinner";
import StyledProfileImage from "../props/StyledProfileImage";
import type Trainer from "../../types/Trainer";

export const TrainerCardInfo = {
  fetchList: ["id", "name", "profileImagePath"],
  ifSubscribe: false
};


type Props = {
  rank?: number,
  trainer: Trainer
}

/**
 * This is the generic view for how a trainer shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param {Props} props The given props to the component.
 * @returns {*} The React JSX used to display the component.
 * @constructor
 */
const TrainerCard = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const getTrainerAttribute = (attributeName) => {
    return getAttributeFromObject(props.trainer, attributeName);
  };

  if (!props.trainer) {
    return (
      <Dimmer inverted>
        <Spinner/>
      </Dimmer>
    );
  }
  return (
    <Card fluid raised centered onClick={() => modalOpen || setModalOpen(true)}>
      <div className="u-container">
        <StyledProfileImage profileImage={getTrainerAttribute("profileImage")} type="LargeCenter"/>
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


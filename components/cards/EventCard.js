import React, {useState} from 'react';
import type Event from "../../types/Event";
import {Card, Dimmer} from 'semantic-ui-react';
import EventDescriptionModal from '../modals/EventDescriptionModal';
import {convertFromISO} from "../../logic/TimeHelper";
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import Spinner from "../props/Spinner";

export const EventCardInfo = {
  fetchList: ["id", "title", "time", "time_created", "owner", "members", "capacity", "difficulty", "restriction", "access"],
  ifSubscribe: false
};

type Props = {
  event: Event
}

/**
 * This is the generic view for how a event shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param {Props} props The given props to the component.
 * @returns {*} The React JSX used to display the component.
 * @constructor
 */
const EventCard = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getEventAttribute = (attributeName) => {
    return getAttributeFromObject(props.event, attributeName);
  };

  if (!props.event) {
    return (
      <Dimmer>
        <Spinner/>
      </Dimmer>
    );
  }
  return (
    // This is displays a few important pieces of information about the challenge for the feed view.
    <Card fluid raised onClick={setModalOpen.bind(true)}>
      <Card.Content>
        <Card.Header textAlign='center'>{getEventAttribute("title")}</Card.Header>
        <Card.Meta textAlign='center'>{convertFromISO(getEventAttribute("time"))}</Card.Meta>
        <EventDescriptionModal open={modalOpen} onClose={setModalOpen.bind(false)} eventID={props.event.id}/>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{convertFromISO(getEventAttribute("time_created"))}</Card.Meta>
        <Card.Meta textAlign='center'>
          {getEventAttribute("membersLength")} of {getEventAttribute("capacity")} spots taken.
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default EventCard;


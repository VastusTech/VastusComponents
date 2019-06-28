import React from "react";
import EventCard from "../EventCard";

export const EventDetailCardInfo = {
  fetchList: ["id", "title", "time", "time_created", "owner", "members", "capacity", "difficulty", "restriction", "access"],
  ifSubscribe: false
};

type Props = {
  event: Event
};

/**
 * The detail card for posts about events.
 *
 * @param {Props} props The given props to the component.
 * @return {*} The React JSX used to display the component.
 * @constructor
 */
const EventDetailCard = (props: Props) => (
  <EventCard event={props.event}/>
);

export default EventDetailCard;


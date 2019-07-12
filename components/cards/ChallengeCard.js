import React, {useState} from 'react';
import {Card, Image, Message} from 'semantic-ui-react';
import ChallengeDescriptionModal from '../modals/ChallengeDescriptionModal';
import {daysLeft, parseISOString} from "../../logic/TimeHelper";
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import type Challenge from "../../types/Challenge";

export const ChallengeCardInfo = {
  fetchList: ["id", "item_type", "title", "endTime", "ifCompleted", "tags", "difficulty", "time_created", "capacity",
    "members", "prize", "goal", "owner", "access", "restriction", "submissions"],
  ifSubscribe: false,
};

type Props = {
  challenge: Challenge
};

const pictures = {
  Performance: require('../../img/Performance_icon.png'),
  Strength: require('../../img/Strength_icon.png'),
  Endurance: require('../../img/Endurance_icon.png'),
  HIIT: require('../../img/HIIT_icon.png')
};

/**
 * Displays the tag icons for the Challenge.
 *
 * @param tags {[string]} The array of names for the tags.
 * @return {*} The React JSX to display the tags.
 */
const displayTagIcons = (tags) => {
  if (tags) {
    if (tags.length === 1) {
      return (
        <Image size='small' src={pictures[tags[0]]}/>
      );
    } else if (tags.length === 2) {
      return (
        <div>
          <Image size='tiny' src={pictures[tags[0]]}/>
          <Image size='tiny' src={pictures[tags[1]]}/>
        </div>
      );
    } else if (tags.length === 3) {
      return (
        <div>
          <Image avatar src={pictures[tags[0]]}/>
          <Image avatar src={pictures[tags[1]]}/>
          <Image avatar src={pictures[tags[2]]}/>
        </div>
      );
    } else if (tags.length === 4) {
      return (
        <div>
          <Image avatar src={pictures[tags[0]]}/>
          <Image avatar src={pictures[tags[1]]}/>
          <Image avatar src={pictures[tags[2]]}/>
          <Image avatar src={pictures[tags[3]]}/>
        </div>
      );
    }
  } else {
    return (
      // "There ain't no tags round these parts partner " + tags
      null
    );
  }
};

/**
 *
 * @param {string} endTime The ISO string for the time the Challenge finishes.
 * @return {string}
 */
const getDaysLeft = (endTime) => {
  if (daysLeft(parseISOString(endTime)) <= 0) {
    return "Challenge Completed"
  } else if (daysLeft(parseISOString(endTime)) === 1) {
    return daysLeft(parseISOString(endTime)) + " Day Left";
  } else {
    return daysLeft(parseISOString(endTime)) + " Days Left";
  }
};

/**
 * This is the generic view for how a challenge shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param props {Props} The given props to the Component.
 * @return {*} The React JSX to display the Challenge Card.
 * @constructor
 */
const ChallengeCard = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getChallengeAttribute = (attributeName) => {
    return getAttributeFromObject(props.challenge, attributeName);
  };

  if (!props.challenge) {
    return (
      <Message floating negative inverted color="purple">
        <Message.Header>
          Challenge Deleted...
        </Message.Header>
      </Message>
    );
  }
  return (
    // This is displays a few important pieces of information about the challenge for the feed view.
    <Card fluid raised onClick={() => modalOpen || setModalOpen(true)}>
      <Card.Content textAlign='center'>
        <Card.Header textAlign='center' style={{color: 'purple'}}>{getChallengeAttribute("title")}</Card.Header>
        <Card.Meta textAlign='center' style={{color: '#D4AF37'}}>{getDaysLeft(getChallengeAttribute("endTime"))}
        </Card.Meta>
        {displayTagIcons(getChallengeAttribute("tags"))}
        <ChallengeDescriptionModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          challengeID={getChallengeAttribute("id")}
          daysLeft={getDaysLeft()}
        />
      </Card.Content>
      <Card.Content extra>
        <Card.Meta textAlign='center' style={{color: '#D4AF37'}}>
          {getChallengeAttribute("membersLength")} of {getChallengeAttribute("capacity")} spots taken.
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default ChallengeCard;

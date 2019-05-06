import React  from 'react';
import ChallengeCard from "../ChallengeCard";
import type Challenge from "../../../types/Challenge";

export const ChallengeDetailCardInfo = {
    fetchList: ["id", "item_type", "title", "endTime", "ifCompleted", "tags", "difficulty", "time_created", "capacity", "members", "prize", "goal", "owner", "access", "restriction", "submissions"],
    ifSubscribe: false,
};

type Props = {
    challenge: Challenge
};

/**
 * The detail card for posts about challenges.
 *
 * @param {Props} props The given props to the component.
 * @return {*} The React JSX used to display the component.
 * @constructor
 */
const ChallengeDetailCard = (props: Props) => (
    <ChallengeCard challenge={props.challenge}/>
);

export default ChallengeDetailCard;

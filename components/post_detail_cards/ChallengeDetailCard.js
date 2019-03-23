import React  from 'react';
import ChallengeCard from "../cards/ChallengeCard";

export const ChallengeDetailCardInfo = {
    fetchList: ["id", "item_type", "title", "endTime", "ifCompleted", "tags", "difficulty", "time_created", "capacity", "members", "prize", "goal", "owner", "access", "restriction", "submissions"],
    ifSubscribe: false,
};


type Props = {
    challengeID: string
}

const ChallengeDetailCard = (props: Props) => (
    <ChallengeCard challengeID={props.challengeID}/>
);

export default ChallengeDetailCard;

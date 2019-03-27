import React  from 'react';
import ChallengeCard from "../ChallengeCard";

export const ChallengeDetailCardInfo = {
    fetchList: ["id", "item_type", "title", "endTime", "ifCompleted", "tags", "difficulty", "time_created", "capacity", "members", "prize", "goal", "owner", "access", "restriction", "submissions"],
    ifSubscribe: false,
};

type Props = {
    challenge: {
        id: string,
        title: string,
        endTime: string,
        ifCompleted: boolean,
        tags: [string],
        difficulty: string,
        time_created: string,
    }
};

const ChallengeDetailCard = (props: Props) => (
    <ChallengeCard challenge={props.challenge}/>
);

export default ChallengeDetailCard;

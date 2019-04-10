import React from "react";
import GroupCard from "../GroupCard";

export const GroupDetailCardInfo = {
    fetchList: ["id", "item_type", "title", "description", "restriction", "members", "owners", "time_created", "access"],
    ifSubscribe: false
};

type Props = {
    group: {
        id: string,
        title: string,
        description: string,
        restriction: string,
        members: [string],
        owners: [string],
        time_created: string,
        access: string
    }
};

const GroupDetailCard = (props: Props) => (
    <GroupCard group={props.group}/>
);

export default GroupDetailCard;
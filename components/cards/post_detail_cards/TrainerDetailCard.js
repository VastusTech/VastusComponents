import React from "react";
import TrainerCard from "../TrainerCard";

export const TrainerDetailCardInfo = {
    fetchList: ["id", "name", "profileImagePath"],
    ifSubscribe: false
};

type Props = {
    trainer: {
        name: string,
    }
};

const TrainerDetailCard = (props: Props) => (
    <TrainerCard trainer={props.trainer}/>
);

export default TrainerDetailCard;
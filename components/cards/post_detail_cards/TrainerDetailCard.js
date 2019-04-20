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

/**
 * The detail card for posts about trainers.
 *
 * @param {Props} props The given props to the component.
 * @return {*} The React JSX used to display the component.
 * @constructor
 */
const TrainerDetailCard = (props: Props) => (
    <TrainerCard trainer={props.trainer}/>
);

export default TrainerDetailCard;
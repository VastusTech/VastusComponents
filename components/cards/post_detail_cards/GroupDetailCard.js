import React from "react";
import GroupCard from "../GroupCard";
import type Group from "../../../types/Group";

export const GroupDetailCardInfo = {
  fetchList: ["id", "item_type", "title", "description", "restriction", "members", "owners", "time_created", "access"],
  ifSubscribe: false
};

type Props = {
  group: Group
};

/**
 * The detail card for posts about groups.
 *
 * @param {Props} props The given props to the component.
 * @return {*} The React JSX used to display the component.
 * @constructor
 */
const GroupDetailCard = (props: Props) => (
  <GroupCard group={props.group}/>
);

export default GroupDetailCard;
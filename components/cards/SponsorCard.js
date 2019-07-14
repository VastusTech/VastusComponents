import React, {useState} from 'react';
import {Card, Dimmer, Icon, Button} from 'semantic-ui-react';
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import Spinner from "../props/Spinner";
import StyledProfileImage from "../props/StyledProfileImage";
import type Sponsor from "../../types/Sponsor";
import SponsorModal from "../modals/SponsorModal";

export const SponsorCardInfo = {
  fetchList: ["id", "name", "profileImagePath"],
  ifSubscribe: false
};

type Props = {
  rank?: number,
  sponsor: Sponsor,
}

/**
 * This is the generic view for how a sponsor shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param {Props} props The given props to the component.
 * @returns {*} The React JSX used to display the component.
 * @constructor
 */
const SponsorCard = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getSponsorAttribute = (attributeName) => {
    return getAttributeFromObject(props.sponsor, attributeName);
  };

  if (!props.sponsor) {
    return (
      <Dimmer inverted>
        <Spinner/>
      </Dimmer>
    );
  }
  return (
    <Card fluid raised centered onClick={() => modalOpen || setModalOpen(true)}>
      <div className="u-container">
        <StyledProfileImage profileImage={getSponsorAttribute("profileImage")} type="LargeCenter"/>
      </div>
      <Card.Content textAlign='center'>
        <Card.Header>
          {getSponsorAttribute("name")}
        </Card.Header>
      </Card.Content>
      <SponsorModal open={modalOpen} onClose={() => setModalOpen(false)} sponsorID={getSponsorAttribute("id")}/>
    </Card>
  )
};

export default SponsorCard;


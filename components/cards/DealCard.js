import React, {useState, Fragment} from 'react';
import type Deal from "../../types/Deal";
import {Card, Dimmer, Grid, Header} from 'semantic-ui-react';
import DealModal from '../modals/DealModal';
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import StyledProfileImage from "../props/StyledProfileImage";
import ProfileImage from "../props/ProfileImage";
import Spinner from "../props/Spinner";

export const DealCardInfo = {
  fetchList: ["id", "owner", "quantity", "productImagePath", "productImagePaths", "productName", "productCreditPrice"],
  ifSubscribe: false
};

type Props = {
  rank?: number,
  deal: Deal
};

/**
 * This is the generic view for how a deal shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param {Props} props The given props to the component.
 * @returns {*} The React JSX used to display the component.
 * @constructor
 */
const DealCard = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getDealAttribute = (attributeName) => {
    return getAttributeFromObject(props.deal, attributeName);
  };

  if (!props.deal) {
    return (
      <Dimmer>
        <Spinner/>
      </Dimmer>
    );
  }
  return (
    // This is displays a few important pieces of information about the challenge for the feed view.
    <Card fluid raised onClick={() => modalOpen || setModalOpen(true)}>
      <Card.Content>
        {/* If no rank */}
        {!props.rank && (
          <Fragment>
            <Card.Header>
              <ProfileImage userID={props.deal.id}
                            profileImage={props.client.profileImage}/>
              <div className="u-flex u-flex-justify--center u-margin-bottom--2">
                <StyledProfileImage profileImage={getDealAttribute("profileImage")} type={"Small"}/>
              </div>
            </Card.Header>
            <Card.Header textAlign='center'>
              {getDealAttribute("name")}
            </Card.Header>
          </Fragment>
        )}
        {/* If has rank */}
        {props.rank && (
          <Grid divided verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header size='large' textAlign='center'>{props.rank}</Header>
              </Grid.Column>
              <Grid.Column width={12}>
                <div className="u-flex u-flex-align--center">
                  <StyledProfileImage profileImage={getDealAttribute("profileImage")} type="Small"/>
                </div>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                {getDealAttribute("name")}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        <DealModal open={modalOpen} onClose={() => {
          console.log("closing");
          setModalOpen(false);
          console.log("closing")
        }} clientID={props.client.id}/>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>
          {getDealAttribute("challengesWonLength")} challenges won
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default DealCard;

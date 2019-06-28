import React, {useState, Fragment} from 'react';
import {Card, Grid, Header} from 'semantic-ui-react';
import ClientModal from '../modals/ClientModal';
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import StyledProfileImage from "../props/StyledProfileImage";
import type User from "../../types/User";
import {getItemTypeFromID, switchReturnItemType} from "../../logic/ItemType";
import TrainerModal from "../modals/TrainerModal";

export const UserCardInfo = {
  fetchList: ["id", "item_type", "username", "gender", "birthday", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath", "friendRequests"],
  ifSubscribe: false
};

type Props = {
  rank?: number,
  user: User
};

/**
 * Gets the modal for the user of the user card.
 *
 * @param {string} userID The ID of the User of the card.
 * @param {boolean} modalOpen Whether the modal is open or not.
 * @param {function(boolean)} setModalOpen Sets the modal open state.
 * @returns {*} The React JSX to display the modal.
 */
const getModal = (userID, modalOpen, setModalOpen) => (
  switchReturnItemType(getItemTypeFromID(userID),
    <ClientModal open={modalOpen} onClose={() => {
      console.log("closing");
      setModalOpen(false);
      console.log("closing")
    }} clientID={userID}/>,
    <TrainerModal open={modalOpen} onClose={() => {
      console.log("closing");
      setModalOpen(false);
      console.log("closing")
    }} trainerID={userID}/>,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null,
    "USER CARD MODAL"
  )
);

/**
 * This is the generic view for how a user shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param {Props} props The given props to the component.
 * @returns {*} The React JSX used to display the component.
 * @constructor
 */
const UserCard = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getUserAttribute = (attributeName) => {
    return getAttributeFromObject(props.user, attributeName);
  };

  if (!props.user) {
    return (
      <Card fluid raised>
        <h1>Loading...</h1>
      </Card>
    );
  }
  return (
    // This is displays a few important pieces of information about the challenge for the feed view.
    <Card fluid raised onClick={() => setModalOpen(true)}>
      <Card.Content>
        {/* If no rank */}
        {!props.rank && (
          <Fragment>
            <Card.Header>
              <div className="u-flex u-flex-justify--center u-margin-bottom--2">
                <StyledProfileImage profileImage={getUserAttribute("profileImage")} type={"Small"}/>
              </div>
            </Card.Header>
            <Card.Header textAlign='center'>
              {getUserAttribute("name")}
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
                  <StyledProfileImage profileImage={getUserAttribute("profileImage")} type="Small"/>
                </div>
              </Grid.Column>
              <Grid.Column textAlign='center' width={2}>
                {getUserAttribute("name") + "   "}
              </Grid.Column>
              {getUserAttribute("item_type") === "Trainer" &&
              (<Grid.Column textAlign="center" width={1}><Header as="h5" color="purple">Trainer</Header></Grid.Column>)}
            </Grid.Row>
          </Grid>
        )}
        {getModal(props.user.id, modalOpen, setModalOpen)}
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>
          {getUserAttribute("challengesWonLength")} challenges won
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default UserCard;

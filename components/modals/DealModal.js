import React, {useState, useEffect} from 'react';
import {Icon, Modal, Button, Grid, Message, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {
  fetchDeal, fetchSponsor,
} from "../../redux/convenience/cacheItemTypeActions";
import UserFunctions from "../../database_functions/UserFunctions";
import {getObjectAttribute} from "../../logic/CacheRetrievalHelper";
import Spinner from "../props/Spinner";
import {log} from "../../../Constants";
import type Deal from "../../types/Deal";
import SponsorModal from "./SponsorModal";

export const DealModalInfo = {
  // Contains everything that is referenced here
  fetchList: ["id", "item_type"],
  sponsorFetchList: ["id", "item_type"],
  ifSubscribe: true,
};

type Props = {
  open: boolean,
  onClose: any,
  dealID: string
};

/**
 * TODO
 *
 * @param isDeleted
 * @return {*}
 */
export const deletedMessage = (isDeleted) => {
  if (isDeleted) {
    return (<Message negative>
      <Message.Header>This Deal is Deleted!</Message.Header>
    </Message>);
  }
};

const userBuyDeal = (userID, dealID, setIsLoading, setError, props) => {
  if (userID && dealID) {
    setIsLoading(true);
    UserFunctions.buyDeal(userID, userID, dealID, () => {
      log&&console.log("Successfully bought deal");
      setIsLoading(false);
    }, (error) => {
      setIsLoading(false);
      setError(error);
    }, props);
  }
  else {

  }
};

/**
 * TODO
 *
 * @param props
 * @return {*}
 * @constructor
 */
const DealModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const getDealAttribute = attribute => getObjectAttribute(props.dealID, attribute, props.cache);
  const getSponsorAttribute = attribute => getObjectAttribute(getDealAttribute("sponsor"), attribute, props.cache);

  useEffect(() => {
    if (props.dealID) {
      // TODO Reset state?
      setIsLoading(false);
      setError(null);
      setSponsorModalOpen(false);
      setDeleted(false);
      props.fetchDeal(props.dealID, DealModalInfo.fetchList, (deal: Deal) => {
        if (deal) {
          if (deal.sponsor) {
            props.fetchSponsor(deal.sponsor, DealModalInfo.sponsorFetchList);
          }
        } else {
          setDeleted(true);
        }
      }, (error) => {

      });
    }
    return () => {
      // TODO clean up
    }
  }, [props.dealID]);

  //This modal displays the challenge information and at the bottom contains a button which allows the user
  //to join a challenge.
  if (!getDealAttribute("id")) {
    return (
      <Modal open={props.open} onClose={() => props.onClose()} closeIcon>
        <Spinner loading={true}/>
      </Modal>
    );
  }
  return (
    <div>
      <Modal open={props.open} onClose={() => props.onClose()} closeIcon style={{background: '#FFFFFF'}}>
        <Icon className='close' onClick={() => props.onClose()}/>
        <Modal.Header align='center' style={{marginTop: '10px', background: 'white', color: 'purple'}}>
          <div>
            {getDealAttribute("productName")}
          </div>
        </Modal.Header>
        <Modal.Content align='center'>
          <Grid centered columns='equal'>
            <Grid.Row style={{color: 'purple'}}>
              <Icon.Group size='large'>
                <Icon name='user circle outline' color='purple'/>
              </Icon.Group> <div onClick={() => setSponsorModalOpen(true)}>{getSponsorAttribute("name")}</div>
              <SponsorModal open={sponsorModalOpen}
                            onClose={() => setSponsorModalOpen(false)}
                            sponsorID={ getSponsorAttribute("id") }
              />
            </Grid.Row>
            <Grid.Row style={{color: 'purple'}}>
              <Icon.Group size='large'>
                <Icon name='money bill alternate outline' color='purple'/>
              </Icon.Group> {parseInt(getDealAttribute("productCreditPrice")) / 1000}
            </Grid.Row>
            <Grid.Row style={{color: 'purple'}}>
              <Image src={getDealAttribute("productImage")} centered style={{width: "200px", height: "200px"}}/>
            </Grid.Row>
          </Grid>
          <Modal.Description>
            <Button primary onClick={() => userBuyDeal(props.user.id, getDealAttribute("id"), setIsLoading,
              setError, props)}>Buy</Button>
          </Modal.Description>
          <Spinner loading={isLoading}/>
        </Modal.Content>
      </Modal>
      {deletedMessage(deleted)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cache: state.cache,
  info: state.info
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeal: (id, variablesList, successHandler, failureHandler) => {
      dispatch(fetchDeal(id, variablesList, successHandler, failureHandler));
    },
    fetchSponsor: (id, variablesList, successHandler, failureHandler) => {
      dispatch(fetchSponsor(id, variablesList, successHandler, failureHandler));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DealModal);


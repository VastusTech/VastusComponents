import React, {useEffect} from 'react'
import {Modal, Icon, Grid, Header} from 'semantic-ui-react'
import {connect} from "react-redux";
import {getSponsorAttribute} from "../../logic/CacheRetrievalHelper";
import ProfileImage from "../props/ProfileImage";
import {fetchSponsor, fetchDeal} from "../../redux/convenience/cacheItemTypeActions";
import type Sponsor from "../../types/Sponsor";
import {DealCardInfo} from "../cards/DealCard";
import DatabaseObjectList from "../lists/DatabaseObjectList";

// TODO Rewrite for the new design

const SponsorModalInfo = {
  fetchList: [],
  ifSubscribe: false,
};

type Props = {
  sponsorID: string,
  open: boolean,
  onClose: () => void
};

/**
 * TODO
 *
 * @param props
 * @return {*}
 * @constructor
 */
const SponsorModal = (props: Props) => {
  const getAttribute = (attribute) => getSponsorAttribute(props.sponsorID, attribute, props.cache);

  useEffect(() => {
    if (props.open && props.sponsorID) {
      props.fetchSponsor(props.sponsorID, SponsorModalInfo.fetchList, (sponsor: Sponsor) => {
        if (sponsor) {
          if (sponsor.deals) {
            for (let i = 0; i < sponsor.deals.length; i++) {
              props.fetchDeal(sponsor.deals[i], DealCardInfo.fetchList);
            }
          }
        }
        else {
          // TODO Deleted
        }
      });
    }
  }, [props.open]);

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Icon className='close' onClick={props.onClose}/>
      <Modal.Header style={{marginTop: '20px', marginBottom: '20px'}}>
        <Grid centered>{getAttribute("name")}</Grid></Modal.Header>
      <Modal.Content>
        <ProfileImage userID={props.sponsorID}
                      profileImage={getAttribute("profileImage")}
                      profileImages={getAttribute("profileImages")}
                      editable={false}
                      style={{marginTop: '20px'}}
        />
        <Header>Deals:</Header>
        <DatabaseObjectList ids={getAttribute("deals")}
                            noObjectsMessage="No Deals Yet..."
                            acceptedItemTypes={["Deal"]}
                            randomized={false}
        />
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cache: state.cache,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchSponsor: (id, variableList, successHandler, failureHandler) => {
      dispatch(fetchSponsor(id, variableList, successHandler, failureHandler));
    },
    fetchDeal: (id, variableList, successHandler, failureHandler) => {
      dispatch(fetchDeal(id, variableList, successHandler, failureHandler));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SponsorModal);

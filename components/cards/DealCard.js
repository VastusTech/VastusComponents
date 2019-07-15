import React, {useState, Fragment} from 'react';
import type Deal from "../../types/Deal";
import {Card, Dimmer, Grid, Header, Image} from 'semantic-ui-react';
import DealModal from '../modals/DealModal';
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";
import StyledProfileImage from "../props/StyledProfileImage";
import Spinner from "../props/Spinner";
import Logo from "../../img/VC_logo.svg"
import Breakpoint from 'react-socks';

export const DealCardInfo = {
  fetchList: ["id", "sponsor", "productImagePath", "productImagePaths", "productName", "productCreditPrice"],
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
  return [
    <Breakpoint medium up>
      <Card fluid raised onClick={() => modalOpen || setModalOpen(true)} style={{border: '2px solid rebeccapurple'}}>
        <Card.Content>
          <Fragment>
            <Card.Header>
              <Grid columns={3}>
                <Grid.Column width={1}>
                  <Image src={Logo} size='mini'/>
                </Grid.Column>
                <Grid.Column style={{color: 'purple', marginTop: '5px', marginLeft: '-25px'}}>
                  {getDealAttribute("productCreditPrice") / 1000}
                </Grid.Column>
                <Grid.Column style={{color: 'purple'}} width={1} floated='right'>
                  {getDealAttribute("productsLength") === 0 ?
                    "Sold Out!" :
                    `Only ${getDealAttribute("productsLength")} left!`
                  }
                </Grid.Column>
              </Grid>
              <div className="u-flex u-flex-justify--center u-margin-bottom--2">
                <StyledProfileImage profileImage={getDealAttribute("productImage")} type={"Large"}/>
              </div>
            </Card.Header>
            <Card.Header textAlign='center' style={{color: 'purple'}}>
              {getDealAttribute("productName")}
            </Card.Header>
          </Fragment>
        </Card.Content>
        <DealModal open={modalOpen} onClose={() => setModalOpen(false)} dealID={props.deal.id}/>
      </Card>
    </Breakpoint>,
    <Breakpoint medium down>
      <Card fluid raised onClick={() => modalOpen || setModalOpen(true)} style={{border: '2px solid rebeccapurple'}}>
          <Card.Content>
              <Fragment>
                  <Card.Header>
                      <Grid columns={3}>
                          <Grid.Column style={{marginLeft: '0px', width: '70px'}} floated='left'>
                              <Image src={Logo} size='mini'/>
                          </Grid.Column>
                          <Grid.Column style={{color: 'purple', marginTop: '5px', marginLeft: '-150px'}}>
                              {getDealAttribute("productCreditPrice") / 1000}
                          </Grid.Column>
                          <Grid.Column style={{color: 'purple', marginRight: '40px', marginTop: '-5px'}} width={1} floated='right'>
                              {getDealAttribute("productsLength") === 0 ?
                                  "Sold Out!" :
                                  `Only ${getDealAttribute("productsLength")} left!`
                              }
                          </Grid.Column>
                      </Grid>
                      <div className="u-flex u-flex-justify--center u-margin-bottom--2">
                          <StyledProfileImage profileImage={getDealAttribute("productImage")} type={"Large"}/>
                      </div>
                  </Card.Header>
                  <Card.Header textAlign='center' style={{color: 'purple'}}>
                      {getDealAttribute("productName")}
                  </Card.Header>
              </Fragment>
          </Card.Content>
          <DealModal open={modalOpen} onClose={() => setModalOpen(false)} dealID={props.deal.id}/>
      </Card>
    </Breakpoint>
  ];
};

export default DealCard;

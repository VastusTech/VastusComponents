import React, {useState} from "react";
import _ from "lodash";
import {connect} from "react-redux";
import {Button, Grid, Header, Image} from "semantic-ui-react";
import type Product from "../../types/Product";
import {getObjectAttribute} from "../../logic/CacheRetrievalHelper";

export const ProductCardInfo = {
  fetchList: ["id", "item_type", "expirationDate", "codes", "links"],
  dealFetchList: ["id", "item_type", "productName", "productCreditPrice", "productImagePath"],
  sponsorFetchList: ["id", "item_type", "name"],
  ifSubscribe: false,
};

type Props = {
  product: Product
};

const ProductCard = (props: Props) => {
  const [codesVisible, setCodesVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  const getDealAttribute = attribute => getObjectAttribute(props.product.deal, attribute, props.cache);
  const getSponsorAttribute = attribute => getObjectAttribute(getDealAttribute("sponsor"), attribute, props.cache);

  return (
    <Grid rows={5}>
      <Grid.Row>
        Product Name: {getDealAttribute("productName")}
      </Grid.Row>
      <Grid.Row>
        Sponsor Name: {getSponsorAttribute("name")}
      </Grid.Row>
      <Grid.Row>
        <Image src={getDealAttribute("productImage")}/>
      </Grid.Row>
      <Grid.Row>
        Product Credit Price: {getDealAttribute("productCreditPrice")}
      </Grid.Row>
      <Grid.Row>
        ID: {props.product.id}
        <Button primary onClick={() => setCodesVisible(p => !p)}>{codesVisible ? "Hide Codes" : "View Codes"}</Button>
        {codesVisible ?
          <Grid rows={props.product.codes.length}>
            {_.times(props.product.codes.length, (i) => (
              <Grid.Row>
                <Header>{props.product.codes[i]}</Header>
              </Grid.Row>
            ))}
          </Grid>
          : null}
        <Button primary onClick={() => setLinksVisible(p => !p)}>{linksVisible ? "Hide Links" : "View Links"}</Button>
        {linksVisible ?
          <Grid rows={props.product.links.length}>
            {_.times(props.product.links.length, (i) => (
              <Grid.Row>
                <Header>{props.product.links[i]}</Header>
              </Grid.Row>
            ))}
          </Grid>
          : null}
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  cache: state.cache,
  user: state.user,
});

export default connect(mapStateToProps)(ProductCard);

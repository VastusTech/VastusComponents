import React, {useState} from "react";
import _ from "lodash";
import {Button, Grid, Header} from "semantic-ui-react";
import type Product from "../../types/Product";

export const ProductCardInfo = {
  fetchList: ["id"],
  ifSubscribe: false
};

type Props = {
  product: Product
};

const ProductCard = (props: Props) => {
  const [codesVisible, setCodesVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  return (
    <Grid>
      ID: {props.product.id}
      Expires at {}
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
    </Grid>
  );
};

export default ProductCard;

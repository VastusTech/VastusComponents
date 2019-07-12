import React, {useState, useEffect, Fragment} from 'react'
import _ from 'lodash'
import {Visibility} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {debugAlert} from "../../logic/DebuggingHelper";
import {log, err} from "../../../Constants";
import Spinner from "../props/Spinner";
import {fetchDealQuery, fetchSponsor} from "../../redux/convenience/cacheItemTypeActions";
import DealCard, {DealCardInfo} from "../cards/DealCard";

const dealFeedLength = 5;

type Props = {
  filter: any
};

/**
 * Fetches another set of Deals with a query for the feed.
 *
 * @param {{}} filter The GraphQL filter to dictate how the query filters the objects.
 * @param {string|null} nextToken The next token from the previous query or null if it's the first query.
 * @param {boolean} isFinished If the querying has finished and there are no more objects to fetch.
 * @param {function([string], {}, number, string, function({}), function(error))} fetchDealQuery The redux function to
 * fetch a Post query.
 * @param {function} fetchSponsor Redux function to fetch a Sponsor.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 * @param {function(boolean)} setIsFinished Sets the if finished state.
 * @param {function(string)} setNextToken Sets the next token state.
 * @param {function([{}])} setDeals Sets the deals state.
 */
const queryDeals = (filter, nextToken, fetchDealQuery, fetchSponsor, isFinished, setIsLoading, setNextToken, setIsFinished, setDeals) => {
  debugAlert("Querying deals! NT = " + nextToken + ", isFinished = " + isFinished);
  if (!isFinished) {
    setIsLoading(true);
    debugAlert("Fetching Post Feed Query");
    fetchDealQuery(DealCardInfo.fetchList, filter, dealFeedLength, nextToken, (data) => {
      if (!data.nextToken) {
        setIsFinished(true);
      }
      if (data.items && data.items.length > 0) {
        for (let i = 0; i < data.items.length; i++) {
          const deal = data.items[i];
          // Fetch the "sponsor" information
          const sponsor = deal.sponsor;
          fetchSponsor(sponsor, ["name", "profileImagePath"]);
          setDeals(p => [...p, deal]);
        }
      }
      setNextToken(data.nextToken);
      setIsLoading(false);
    }, (error) => {
      err && console.error("Querying Deals failed!");
      err && console.error(error);
      setIsLoading(false);
    });
  }
};

/**
 * Displays a feed of Deals which are queried using the filter provided. Also uses the semantic ui react Visibility
 * module in order to delay fetching of Deals until directly requested.
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const DealFeed = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [nextToken, setNextToken] = useState(null);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    if (props.user.id) {
      setDeals([]);
      setNextToken(null);
      setIsFinished(false);
      queryDeals(props.filter, nextToken, props.fetchDealQuery, props.fetchSponsor, isFinished, setIsLoading, setNextToken,
        setIsFinished, setDeals);
    }
  }, [props.user.id]);

  /**
   *
   * @param e
   * @param calculations
   */
  const handleUpdate = (e, {calculations}) => {
    if (calculations.bottomVisible && !isLoading) {
      log && console.log("Next Token: " + nextToken);
      queryDeals(props.filter, nextToken, props.fetchDealQuery, props.fetchSponsor, isFinished, setIsLoading, setNextToken,
        setIsFinished, setDeals);
    }
  };

  //This displays the rows in a grid format, with visibility enabled so that we know when the bottom of the page
  //is hit by the user.
  return (
    <Visibility onUpdate={_.debounce(handleUpdate, 250)}>
      {_.times(deals.length, i => (
        <Fragment key={i + 1}>
          <DealCard deal={deals[i]}/>
        </Fragment>
      ))}
      {!isFinished && <Spinner/>}
    </Visibility>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cache: state.cache
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDealQuery: (variableList, filter, limit, nextToken, dataHandler, failureHandler) => {
      dispatch(fetchDealQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler))
    },
    fetchSponsor: (id, variableList, successHandler, failureHandler) => {
      dispatch(fetchSponsor(id, variableList, successHandler, failureHandler));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DealFeed);

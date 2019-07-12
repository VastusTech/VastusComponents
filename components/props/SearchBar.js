import _ from 'lodash'
import React, {useState, Fragment} from 'react'
import Fuse from "fuse.js";
import {Image, Search} from 'semantic-ui-react'
import EventDescriptionModal from "../modals/EventDescriptionModal";
import ClientModal from "../modals/ClientModal";
import TrainerModal from "../modals/TrainerModal";
import {connect} from "react-redux";
import {fetchClient, fetchEvent} from "../../redux/convenience/cacheItemTypeActions";
import {newSearch} from "../../redux/actions/searchActions";
import {switchReturnItemType} from "../../logic/ItemType";
import ChallengeDescriptionModal from "../modals/ChallengeDescriptionModal";
import PostDescriptionModal from "../modals/PostDescriptionModal";
import GroupDescriptionModal from "../modals/GroupDescriptionModal";
import Logo from '../../img/vt_gold_even_thicker_border.svg';
import OriginalLogo from '../../img/vt_new.svg';


const minimumSearchResults = 6;

/**
 * Gets the selected modal from the search results, switching for the item type.
 *
 * @param {{item_type: string, id: string}} result The selected database object.
 * @param {boolean} resultModalOpen If the result modal is open.
 * @param {function(boolean)} setResultModalOpen Set's the component result modal open state.
 * @return {*} The React JSX to display the result modal.
 */
export const getResultModal = (result, resultModalOpen, setResultModalOpen) => {
  if (!result) {
    return null;
  }
  return switchReturnItemType(result.item_type,
    <ClientModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} clientID={result.id}/>,
    <TrainerModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} trainerID={result.id}/>,
    null, null, null,
    <EventDescriptionModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} eventID={result.id}/>,
    <ChallengeDescriptionModal open={resultModalOpen} onClose={() => setResultModalOpen(false)}
                               challengeID={result.id}/>,
    null,
    <PostDescriptionModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} postID={result.id}/>,
    null,
    <GroupDescriptionModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} groupID={result.id}/>,
    null, null, null, null, "Item Type not implemented for Search Bar Result Modal");
};

/**
 * Uses the search results in order to format them into a Semantic UI Search Bar usable format.
 *
 * @param {string} searchQuery The query search string for the search bar.
 * @param {[{}]} results The array of objects returned from the search redux operation.
 * @param {boolean} searchBarEnabled Whether the search bar is enabled or not.
 * @return {*} The formatted results for the Search Bar component.
 */
export const getFormattedResults = (searchQuery, results, searchBarEnabled) => {
  const formattedResults = [];
  if (searchBarEnabled) {
    const resultTitles = [];
    for (const i in results) {
      if (results.hasOwnProperty(i)) {
        const result = results[i];
        // console.log(JSON.stringify(result));
        if (result.hasOwnProperty("item_type") && result.item_type) {
          // alert(JSON.stringify(result));
          let formattedResult = switchReturnItemType(result.item_type,
            { // Client
              title: result.name,
              description: result.username,
              resultcontent: result
            },
            { // Trainer
              title: result.name,
              description: result.username,
              resultcontent: result
            },
            null,
            null,
            null,
            { // Event
              title: (result.title),
              description: result.goal,
              resultcontent: result
            },
            { // Challenge
              title: (result.title),
              description: result.description,
              resultcontent: result
            },
            null,
            null,
            null,
            null,
            null,
            null,
            "Handle search bar result type not implemented!");

          if (formattedResult) {
            // TODO Insertsort this? By what basis though?
            while (formattedResult.title && resultTitles.includes(formattedResult.title)) {
              const len = formattedResult.title.length;
              // log&&console.log(JSON.stringify(resultTitles));
              // log&&console.log(formattedResult.title + "~ -3: " + formattedResult.title[len - 3] + ", -1: " + formattedResult.title[len - 1]);
              if (formattedResult.title[len - 3] === "(" && formattedResult.title[len - 1] === ")") {
                let num = parseInt(formattedResult.title[len - 2]);
                num++;
                formattedResult.title = formattedResult.title.substr(0, len - 3) + "(" + num + ")";
                // formattedResult.title[len - 2] = num;
              } else {
                formattedResult.title += " (2)";
              }
            }
            // console.log(formattedResult.title + " is not in " + JSON.stringify(resultTitles));
            formattedResults.push(formattedResult);
            resultTitles.push(formattedResult.title);
          }
        }
      }
    }
  }
  // console.log(formattedResults.length);
  if (searchQuery) {
    const fuse = new Fuse(formattedResults, {
      shouldSort: true,
      // threshold: 0.6,
      // location: 0,
      // distance: 100,
      maxPatternLength: 64,
      minMatchCharLength: 1,
      keys: [
        "resultcontent.name",
        "resultcontent.goal",
        "description",
        "title",
        "resultcontent.username"
      ]
    });
    return fuse.search(searchQuery);
  } else {
    return formattedResults;
  }
};

/**
 * Handles a result's click and opens the result modal for it.
 *
 * @param {{resultcontent: *}} result The result from the search bar component.
 * @param {function(*)} setResult Sets the component's result state.
 * @param {function(boolean)} setResultModalOpen Set's the component's result modal open state.
 */
const handleResultSelect = (result, setResult, setResultModalOpen) => {
  setResult(result.resultcontent);
  setResultModalOpen(true);
};

/**
 * Retrieves search results from a new search query in the search bar.
 *
 * @param {string} searchQuery The string to search for in the database.
 * @param {function(string, number, function([{}]))} newSearch The redux function to start a new search in the reducer.
 * @param {function(boolean)} setIsLoading Sets the component's is loading state.
 */
const retrieveSearchResults = (searchQuery, newSearch, setIsLoading) => {
  // alert("new search!");
  newSearch(searchQuery, minimumSearchResults, () => {
    setIsLoading(false);
  });
};

/**
 * Debounced retrieve search results function so that calling it multiple times will not actually activate it
 * more than once.
 *
 * @type {Function|*|void}
 */
const debouncedRetrieveSearchResults = _.debounce(retrieveSearchResults, 500);

/**
 * TODO
 *
 * @param value
 * @param newSearch
 * @param setSearchQuery
 * @param setIsLoading
 */
const handleSearchChange = (value, newSearch, setSearchQuery, setIsLoading) => {
  setSearchQuery(value);
  setIsLoading(true);
  // alert("1");
  // _.debounce(function() {alert("3")}, 250);
  // alert("retrieving search results");
  console.log("retrieve search results");
  debouncedRetrieveSearchResults(value, newSearch, setIsLoading);
};

/**
 * The search bar searches for things within our database based on the "search" redux settings. Search is global in
 * redux so that we can set the settings in the search modal. This also allows you to click any of the results and view
 * a modal for the object.
 *
 * @param {{}} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const SearchBarProp = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedResult, setSelectedResult] = useState(null);
  const [result, setResult] = useState(null);
  // const [resultModal, setResultModal] = useState(null);
  const [resultModalOpen, setResultModalOpen] = useState(false);

  // constructor(props) {
  //     super(props);
  //     this.handleResultSelect = this.handleResultSelect.bind(this);
  //     this.openResultModal = this.openResultModal.bind(this);
  //     this.closeResultModal = this.closeResultModal.bind(this);
  //     this.retrieveSearchResults = _.debounce(this.retrieveSearchResults.bind(this), 500);
  // }

  // TODO Check to see that this is valid to do?
  // console.log("Showing " + this.state.searchResults.length + " results");
  // const isLoading = (this.state.clientsLoading || this.state.eventsLoading);
  // console.log(this.props.search.results.length);
  /* <Fragment>
      {getResultModal(result, resultModalOpen, setResultModalOpen)}
      <Search
          fluid
          size="large"
          placeholder="Search for Users and Challenges"
          loading={isLoading}
          onResultSelect={(e, {result}) => handleResultSelect(result, setResult, setResultModalOpen)}
          onSearchChange={(e, {value}) => handleSearchChange(value, props.newSearch, setSearchQuery, setIsLoading)}
          results={getFormattedResults(searchQuery, props.search.results, props.search.searchBarEnabled)}
          value={searchQuery}
          showNoResults={props.search.searchBarEnabled}
      />
  </Fragment> */
  return (
    <Image src={Logo} centered size='tiny' style={{marginTop: '-10px', marginBottom: '-10px'}}/>
  )
};

const mapStateToProps = state => ({
  user: state.user,
  cache: state.cache,
  search: state.search
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClient: (id, variablesList) => {
      dispatch(fetchClient(id, variablesList));
    },
    fetchEvent: (id, variablesList) => {
      dispatch(fetchEvent(id, variablesList));
    },
    newSearch: (queryString, minResults, dataHandler) => {
      dispatch(newSearch(queryString, minResults, dataHandler));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarProp);
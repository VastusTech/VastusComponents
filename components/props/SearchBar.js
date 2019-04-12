import _ from 'lodash'
import React, { useState, Fragment } from 'react'
import Fuse from "fuse.js";
import {Search } from 'semantic-ui-react'
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

const minimumSearchResults = 6;

const getResultModal = (result, resultModalOpen, setResultModalOpen) => {
    if (!result) {
        return null;
    }
    return switchReturnItemType(result.item_type,
        <ClientModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} clientID={result.id}/>,
        <TrainerModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} trainerID={result.id}/>,
        null, null, null,
        <EventDescriptionModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} eventID={result.id}/>,
        <ChallengeDescriptionModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} challengeID={result.id}/>,
        null,
        <PostDescriptionModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} postID={result.id}/>,
        null,
        <GroupDescriptionModal open={resultModalOpen} onClose={() => setResultModalOpen(false)} groupID={result.id}/>,
        null, null, null, null, "Item Type not implemented for Search Bar Result Modal");
};

const getFormattedResults = (searchQuery, results, searchBarEnabled) => {
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
                            }
                            else {
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
    }
    else {
        return formattedResults;
    }
};

const handleResultSelect = (result, setResult, setResultModalOpen) => {
    setResult(result.resultcontent);
    setResultModalOpen(true);
};

// const retrieveMoreResults = (searchQuery, numResults, loadMoreResults, setIsLoading) => {
//     // alert("loading more results");
//     loadMoreResults(searchQuery, (data) => {
//         const ifFinished = data.length === 0;
//         numResults += data.length;
//         // alert("Finished = " + ifFinished);
//         if (numResults < minimumSearchResults && !ifFinished) {
//             // log&&console.log("Grabbing more results: numResults = " + results.length + ", ifFinished = " + this.props.search.ifFinished);
//             retrieveMoreResults(searchQuery, numResults, loadMoreResults, setIsLoading);
//         }
//         else {
//             setIsLoading(false);
//         }
//     });
// };
const retrieveSearchResults = _.debounce((searchQuery, newSearch, setIsLoading) => {
    // alert("new search!");
    newSearch(searchQuery, minimumSearchResults, () => {
        setIsLoading(false);
    });
}, 500);
// const bufferedRetrieveSearchResults = _.debounce(retrieveSearchResults, 500);
const handleSearchChange = (value, newSearch, setSearchQuery, setIsLoading) => {
    setSearchQuery(value);
    setIsLoading(true);
    // alert("1");
    // _.debounce(function() {alert("3")}, 250);
    // alert("retrieving search results");
    console.log("retrieve search results");
    retrieveSearchResults(value, newSearch, setIsLoading);
};

const SearchBarProp = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedResult, setSelectedResult] = useState(null);
    const [result, setResult] = useState(null);
    const [resultModal, setResultModal] = useState(null);
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
    return (
        <Fragment>
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
        </Fragment>
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
import "../../../testing/SetTesting";
import { expect } from "chai";
import {newSearch, disableType, enableType, loadMoreResults, enableSearchBar, disableSearchBar, resetQuery,
    setTypeFilter} from "../searchActions";
import search, {SET_SEARCH_QUERY} from "../../reducers/searchReducer";
import {getInitialReduxStore, store} from "../../../testing/TestHelper";

describe("Search Actions", function () {
    let reduxStore;
    beforeEach(() => {
        reduxStore = store(getInitialReduxStore(['search', 'cache']));
    });

    describe("New Search", () => {
        it("Should new search", (done) => {
            reduxStore.dispatch(newSearch("QUERYSTRING", 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'RESET_QUERY' },
                    { payload: 'QUERYSTRING', type: 'SET_SEARCH_QUERY' },
                ]);
                done();
            });
        });
    });
    // TODO Rewrite this to be more testable?
    // describe("Load More Results", () => {
    //     it("Should load more results", (done) => {
    //         const initialStore = getInitialReduxStore(['cache', 'search']);
    //         initialStore.search = search(initialStore.search, {type: SET_SEARCH_QUERY, payload: "QUERYSTRING"});
    //         reduxStore = store(initialStore);
    //         reduxStore.dispatch(loadMoreResults("QUERYSTRING", 10)).then(() => {
    //             expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([]);
    //             done();
    //         });
    //     });
    // });
    describe("Reset Query", () => {
        it("Should reset the query", (done) => {
            reduxStore.dispatch(resetQuery()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'RESET_QUERY' }
                ]);
                done();
            });
        });
    });
    describe("Enable Type", () => {
        it("Should enable the type", (done) => {
            reduxStore.dispatch(enableType("Client")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: 'Client', type: 'ENABLE_TYPE' }
                ]);
                done();
            });
        });
    });
    describe("Disable Type", () => {
        it("Should disable the type", (done) => {
            reduxStore.dispatch(disableType("Client")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: 'Client', type: 'DISABLE_TYPE' }
                ]);
                done();
            });
        });
    });
    describe("Enable Search Bar", () => {
        it("Should enable the search bar", (done) => {
            reduxStore.dispatch(enableSearchBar()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'ENABLE_SEARCH_BAR' }
                ]);
                done();
            });
        });
    });
    describe("Disable Search Bar", () => {
        it("Should disable the search bar", (done) => {
            reduxStore.dispatch(disableSearchBar()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'DISABLE_SEARCH_BAR' }
                ]);
                done();
            });
        });
    });
    describe("Set Type Filter", () => {
        it("Should set the type filter", (done) => {
            const filterJSON = {
                or: [{
                    attributeName: {
                        eq: "$var1"
                    }
                }, {
                    attributeName: {
                        eq: "$searchQuery"
                    }
                }]
            };
            reduxStore.dispatch(setTypeFilter("Client", filterJSON, {var1: "value", searchQuery: "SEARCHQUERY"})).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { filterParameters: {var1: "value", searchQuery: "SEARCHQUERY"}, filterJSON, type: 'Client' },
                        type: 'SET_TYPE_FILTER' }
                ]);
                done();
            });
        });
    });
});

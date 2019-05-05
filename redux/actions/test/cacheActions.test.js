import "../../../testing/SetTesting";
import { expect } from "chai";
import {fetchItem, forceFetchItem, fetchItems, forceFetchItems, fetchItemQuery, forceFetchItemQuery, putItem,
    subscribeFetchItem, getCache, getCacheName, setItemAttribute, removeFromItemAttributeAtIndex, setItemAttributeIndex,
    getQueryCache, addToItemAttribute, removeFromItemAttribute}
    from "../cacheActions";
import cache, {PUT_ITEM, PUT_ITEM_QUERY} from "../../reducers/cacheReducer";
import {getInitialReduxStore, store} from "../../../testing/TestHelper";

describe("Cache Actions", function () {
    let reduxStore;
    beforeEach(() => {
        reduxStore = store(getInitialReduxStore(['cache', 'user']));
    });

    describe("Fetch Item", () => {
        // TODO Check how it handles an existing item
        it("Fetches a Client", (done) => {
            reduxStore.dispatch(fetchItem("CL0001", "Client", ["id", "item_type", "time_created"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches an existing Client with new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItem("CL0001", "Client", ["attributeName2", "attributeName3"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches an existing Client with some same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
            }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItem("CL0001", "Client", ["id", "item_type", "attributeName2"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches an existing Client with all same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItem("CL0001", "Client", ["id", "item_type", "attributeName"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: null, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Force Fetch Item", () => {
        // TODO Check how it handles an existing item
        it("Force Fetches a Client for first time", (done) => {
            reduxStore.dispatch(forceFetchItem("CL0001", "Client", ["id", "item_type", "time_created"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches an existing client with new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItem("CL0001", "Client", ["attributeName2", "attributeName3"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches an existing client with some same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItem("CL0001", "Client", ["id", "item_type", "attributeName2"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches an existing client with all same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItem("CL0001", "Client", ["id", "item_type", "attributeName"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Subscribe Fetch Item", () => {
        // TODO Check how it handles an existing item
        it("Subscribe Fetches a Client", (done) => {
            reduxStore.dispatch(subscribeFetchItem("CL0001", "Client", ["id", "item_type", "time_created"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'SET_IS_LOADING' },
                    { payload: {messageHandler: {}, unsubscriptionHandler: {}, handler: {}, channel: 'CL0001-Updates' },
                        type: 'ADD_HANDLER' },
                    { type: 'SET_IS_NOT_LOADING' },
                    { payload: { item: {__stale__: false}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Subscribe Fetches an existing Client with new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(subscribeFetchItem("CL0001", "Client", ["attributeName2", "attributeName3"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'SET_IS_LOADING' },
                    { payload: { messageHandler: {}, unsubscriptionHandler: {}, handler: {}, channel: 'CL0001-Updates' },
                        type: 'ADD_HANDLER' },
                    { type: 'SET_IS_NOT_LOADING' },
                    { payload: { item: {__stale__: false}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Subscribe Fetches an existing Client with some same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }
            });
            reduxStore = store(initialStore);
            reduxStore.dispatch(subscribeFetchItem("CL0001", "Client", ["id", "item_type", "attributeName2"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'SET_IS_LOADING' },
                    { payload: { messageHandler: {}, unsubscriptionHandler: {}, handler: {}, channel: 'CL0001-Updates' },
                        type: 'ADD_HANDLER' },
                    { type: 'SET_IS_NOT_LOADING' },
                    { payload: { item: {__stale__: false}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Subscribe Fetches an existing Client with all same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
            }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(subscribeFetchItem("CL0001", "Client", ["id", "item_type", "attributeName"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'SET_IS_LOADING' },
                    { payload: { messageHandler: {}, unsubscriptionHandler: {}, handler: {}, channel: 'CL0001-Updates' },
                        type: 'ADD_HANDLER' },
                    { type: 'SET_IS_NOT_LOADING' },
                    { payload: { item: {__stale__: false}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    // TODO ===========================================================================================================
    // TODO =                               THERE'S AN ERROR IN BATCH FETCH                                           =
    // TODO ===========================================================================================================
    describe("Fetch Items", () => {
        it("Fetches all new items", (done) => {
            reduxStore.dispatch(fetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["id", "item_type", "attributeName"],
                    0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches some existing items with same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["id", "item_type", "attributeName"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches some existing items with some new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["attributeName", "attributeName2"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName: "TEST_VALUE", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName: "TEST_VALUE", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName: "TEST_VALUE", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches some existing items with all new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["attributeName2", "attributeName3"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches all existing items with same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0003", item: {id: "CL0003", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["id", "item_type", "attributeName"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches all existing items with some new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0003", item: {id: "CL0003", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["attributeName", "attributeName2"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches all existing items with all new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0003", item: {id: "CL0003", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["attributeName2", "attributeName3"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Force Fetch Items", () => {
        it("Force fetches all new items", (done) => {
            reduxStore.dispatch(forceFetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["id", "item_type", "attributeName"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches some existing items with same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["id", "item_type", "attributeName"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches some existing items with some new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["attributeName", "attributeName2"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName: "TEST_VALUE", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName: "TEST_VALUE", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName: "TEST_VALUE", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches some existing items with all new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["attributeName2", "attributeName3"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches all existing items with same attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0003", item: {id: "CL0003", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["id", "item_type", "attributeName"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches all existing items with some new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0003", item: {id: "CL0003", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["attributeName", "attributeName2"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName: "TEST_VALUE", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName: "TEST_VALUE", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName: "TEST_VALUE", attributeName2: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches all existing items with all new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0002", item: {id: "CL0002", item_type: "Client", attributeName: "attributeValue"}
                }});
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0003", item: {id: "CL0003", item_type: "Client", attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItems(["CL0001", "CL0002", "CL0003"], "Client", ["attributeName2", "attributeName3"],
                0, 10)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {id: "CL0001", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0002", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0002' }, type: 'PUT_ITEM' },
                    { payload: { item: {id: "CL0003", item_type: "Client", attributeName2: "TEST_VALUE", attributeName3: "TEST_VALUE"},
                            itemType: 'Client', id: 'CL0003' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Fetch Item Query", () => {
        it("Fetches an item query with a null next token", (done) => {
            reduxStore.dispatch(fetchItemQuery("Client", ["id", "item_type", "attributeName"], null, 10, null)).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'normalizedQueryString', 'queryResult']).to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { nextToken: 'null', itemType: 'Client' }, type: 'PUT_ITEM_QUERY' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches an item query with a string next token", (done) => {
            reduxStore.dispatch(fetchItemQuery("Client", ["id", "item_type", "attributeName"], null, 10, "NEXTTOKEN")).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'normalizedQueryString', 'queryResult']).to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { nextToken: 'NEXTTOKEN', itemType: 'Client' }, type: 'PUT_ITEM_QUERY' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches an existing item query with a null next token", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM_QUERY, asyncDispatch: () => {}, payload: {
                itemType: "Client", normalizedQueryString: "QUERYSTRING", queryResult: [], nextToken: 'null'}});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItemQuery("Client", ["id", "item_type", "attributeName"], null, 10, null)).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'normalizedQueryString', 'queryResult']).to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { nextToken: 'null', itemType: 'Client' }, type: 'PUT_ITEM_QUERY' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Fetches an existing item query with a string next token", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM_QUERY, asyncDispatch: () => {}, payload: {
                    itemType: "Client", normalizedQueryString: "QUERYSTRING", queryResult: [], nextToken: 'NEXTTOKEN'}});
            reduxStore = store(initialStore);
            reduxStore.dispatch(fetchItemQuery("Client", ["id", "item_type", "attributeName"], null, 10, "NEXTTOKEN")).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'normalizedQueryString', 'queryResult']).to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { nextToken: 'NEXTTOKEN', itemType: 'Client' }, type: 'PUT_ITEM_QUERY' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Force Fetch Item Query", () => {
        it("Force fetches an item query with a null next token", (done) => {
            reduxStore.dispatch(forceFetchItemQuery("Client", ["id", "item_type", "attributeName"], null, 10, null)).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'normalizedQueryString', 'queryResult']).to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { nextToken: 'null', itemType: 'Client' }, type: 'PUT_ITEM_QUERY' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches an item query with a string next token", (done) => {
            reduxStore.dispatch(forceFetchItemQuery("Client", ["id", "item_type", "attributeName"], null, 10, "NEXTTOKEN")).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'normalizedQueryString', 'queryResult']).to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { nextToken: 'NEXTTOKEN', itemType: 'Client' }, type: 'PUT_ITEM_QUERY' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches an existing item query with a null next token", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM_QUERY, asyncDispatch: () => {}, payload: {
                    itemType: "Client", normalizedQueryString: "QUERYSTRING", queryResult: [], nextToken: 'null'}});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItemQuery("Client", ["id", "item_type", "attributeName"], null, 10, null)).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'normalizedQueryString', 'queryResult']).to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { nextToken: 'null', itemType: 'Client' }, type: 'PUT_ITEM_QUERY' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Force fetches an existing item query with a string next token", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM_QUERY, asyncDispatch: () => {}, payload: {
                    itemType: "Client", normalizedQueryString: "QUERYSTRING", queryResult: [], nextToken: 'NEXTTOKEN'}});
            reduxStore = store(initialStore);
            reduxStore.dispatch(forceFetchItemQuery("Client", ["id", "item_type", "attributeName"], null, 10, "NEXTTOKEN")).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'normalizedQueryString', 'queryResult']).to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { nextToken: 'NEXTTOKEN', itemType: 'Client' }, type: 'PUT_ITEM_QUERY' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Put Item", () => {
        it("Puts a new item", (done) => {
            reduxStore.dispatch(putItem("CL0001", "Client", {id: "CL0001", item_type: "Client"})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch']).to.eql([
                    { payload: { item: {id: "CL0001", item_type: "Client"}, itemType: 'Client', id: 'CL0001' },
                        type: 'PUT_ITEM' }
                ]);
                done();
            })
        });
        it("Puts an existing item with new attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(putItem("CL0001", "Client", {attributeName2: "attributeValue", attributeName3: "attributeValue"})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch']).to.eql([
                    { payload: { item: {attributeName2: "attributeValue", attributeName3: "attributeValue"}, itemType: 'Client', id: 'CL0001' },
                        type: 'PUT_ITEM' }
                ]);
                done();
            });
        });
        it("Puts an existing item with some existing attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(putItem("CL0001", "Client", {id: "CL0001", attributeName2: "attributeValue", attributeName3: "attributeValue"})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch']).to.eql([
                    { payload: { item: {id: "CL0001", attributeName2: "attributeValue", attributeName3: "attributeValue"}, itemType: 'Client', id: 'CL0001' },
                        type: 'PUT_ITEM' }
                ]);
                done();
            });
        });
        it("Puts an existing item with all existing attributes", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(putItem("CL0001", "Client", {id: "CL0001", item_type: "Client"})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch']).to.eql([
                    { payload: { item: {id: "CL0001", item_type: "Client"}, itemType: 'Client', id: 'CL0001' },
                        type: 'PUT_ITEM' }
                ]);
                done();
            })
        });
    });
    describe("Set Item Attribute", () => {
        it("Sets an existing attribute for an existing item", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client", attributeName: "firstAttributeValue"}
            }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(setItemAttribute("CL0001", "attributeName", "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { item: {attributeName: "attributeValue"}, itemType: 'Client', id: 'CL0001' },
                        type: 'PUT_ITEM' }
                ]);
                done();
            });
        });
        it("Sets a new attribute for an existing item", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client"}
            }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(setItemAttribute("CL0001", "attributeName", "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { item: {attributeName: "attributeValue"}, itemType: 'Client', id: 'CL0001' },
                        type: 'PUT_ITEM' }
                ]);
                done();
            });
        });
        it("Does nothing for a new item", (done) => {
            reduxStore.dispatch(setItemAttribute("CL0001", "attributeName", "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { item: {attributeName: "attributeValue"}, itemType: 'Client', id: 'CL0001' },
                        type: 'PUT_ITEM' }
                ]);
                done();
            });
        });
    });
    describe("Set Item Attribute Index", () => {
        it("Sets the first item attribute index for a item's array", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(setItemAttributeIndex("CL0001", "attributeName", 0, "value")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { attributeValue: 'value',
                                index: 0,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'SET_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            })
        });
        it("Sets a middle item attribute index for a item's array", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(setItemAttributeIndex("CL0001", "attributeName", 1, "value")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { attributeValue: 'value',
                                index: 1,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'SET_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
        it("Sets the last item attribute index for a item's array", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(setItemAttributeIndex("CL0001", "attributeName", 2, "value")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { attributeValue: 'value',
                                index: 2,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'SET_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
        it("Does nothing for a out of bounds index", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(setItemAttributeIndex("CL0001", "attributeName", 3, "value")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { attributeValue: 'value',
                                index: 3,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'SET_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
        it("Does nothing for a non array attribute", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                    attributeName: "attributeValue"}
            }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(setItemAttributeIndex("CL0001", "attributeName", 3, "value")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { attributeValue: 'value',
                                index: 3,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'SET_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
        it("Does nothing for a non-existing item", (done) => {
            reduxStore.dispatch(setItemAttributeIndex("CL0001", "attributeName", 0, "value")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { attributeValue: 'value',
                                index: 0,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'SET_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
    });
    describe("Add to Item Attribute", () => {
        it("Should add an item to an existing array attribute", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(addToItemAttribute("CL0001", "attributeName", "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { attributes: {attributeName: ["attributeValue"]}, itemType: 'Client', id: 'CL0001' },
                        type: 'ADD_TO_ITEM_ATTRIBUTES' }
                ]);
                done();
            });
        });
        it("Should do nothing for a non-array attribute", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(addToItemAttribute("CL0001", "attributeName", "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { attributes: {attributeName: ["attributeValue"]}, itemType: 'Client', id: 'CL0001' },
                        type: 'ADD_TO_ITEM_ATTRIBUTES' }
                ]);
                done();
            });
        });
        it("Should do nothing for a non-existing item", (done) => {
            reduxStore.dispatch(addToItemAttribute("CL0001", "attributeName", "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { attributes: {attributeName: ["attributeValue"]}, itemType: 'Client', id: 'CL0001' },
                        type: 'ADD_TO_ITEM_ATTRIBUTES' }
                ]);
                done();
            });
        });
    });
    describe("Remove from Item Attribute", () => {
        it("Should remove items from an existing array attribute", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeFromItemAttribute("CL0001", "attributeName", "value1")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { attributes: {attributeName: ["value1"]}, itemType: 'Client', id: 'CL0001' },
                        type: 'REMOVE_FROM_ITEM_ATTRIBUTES' }
                ]);
                done();
            });
        });
        it("Should do nothing for a non-array attribute", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeFromItemAttribute("CL0001", "attributeName", "value1")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { attributes: {attributeName: ["value1"]}, itemType: 'Client', id: 'CL0001' },
                        type: 'REMOVE_FROM_ITEM_ATTRIBUTES' }
                ]);
                done();
            });
        });
        it("Should do nothing for a non-existing item", (done) => {
            reduxStore.dispatch(removeFromItemAttribute("CL0001", "attributeName", "value1")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload: { attributes: {attributeName: ["value1"]}, itemType: 'Client', id: 'CL0001' },
                        type: 'REMOVE_FROM_ITEM_ATTRIBUTES' }
                ]);
                done();
            });
        });
    });
    describe("Remove from Item Attribute At Index", () => {
        it("Should remove the first item attribute index for a item's array", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeFromItemAttributeAtIndex("CL0001", "attributeName", 0)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { index: 0,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'REMOVE_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
        it("Should remove a middle item attribute index for a item's array", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeFromItemAttributeAtIndex("CL0001", "attributeName", 1)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { index: 1,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'REMOVE_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
        it("Should remove the last item attribute index for a item's array", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeFromItemAttributeAtIndex("CL0001", "attributeName", 2)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { index: 2,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'REMOVE_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
        it("Should do nothing for a out of bounds index", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: ["value1", "value2", "value3"]}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeFromItemAttributeAtIndex("CL0001", "attributeName", 3)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { index: 3,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'REMOVE_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
        it("Should do nothing for a non-array attribute", (done) => {
            const initialStore = getInitialReduxStore(['cache', 'user']);
            initialStore.cache = cache(initialStore.cache, {type: PUT_ITEM, asyncDispatch: () => {}, payload: {
                    itemType: "Client", id: "CL0001", item: {id: "CL0001", item_type: "Client",
                        attributeName: "attributeValue"}
                }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeFromItemAttributeAtIndex("CL0001", "attributeName", 3)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { index: 3,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'REMOVE_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
        it("Should do nothing for a non-existing item", (done) => {
            reduxStore.dispatch(removeFromItemAttributeAtIndex("CL0001", "attributeName", 0)).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { payload:
                            { index: 0,
                                attributeName: 'attributeName',
                                itemType: 'Client',
                                id: 'CL0001' },
                        type: 'REMOVE_ITEM_ATTRIBUTE_INDEX' }
                ]);
                done();
            });
        });
    });
    describe("Get Cache", () => {
        it("Should get the cache for a real item type", () => {
            expect(getCache("Client", () => getInitialReduxStore(['cache']))).to.eql({});
        });
        it("Should get null for a bad name", () => {
            expect(getCache("NotAnItemType", () => getInitialReduxStore(['cache']))).to.eql(null);
        });
        it("Should get null for Message type", () => {
            expect(getCache("Message", () => getInitialReduxStore(['cache']))).to.eql(null);
        });
    });
    describe("Get Cache Name", () => {
        it("Should get the name of the cache for a real item type", () => {
            expect(getCacheName("Client")).to.equal("clients");
        });
        it("Should get null for a bad name", () => {
            expect(getCacheName("NotAnItemType")).to.equal(null);
        });
        it("Should get null for Message type", () => {
            expect(getCacheName("Message")).to.equal(null);
        });
    });
    describe("Get Query Cache", () => {
        it("Should get the query cache for a real item type", () => {
            expect(getQueryCache("Client", () => getInitialReduxStore(['cache']))).to.eql({});
        });
        it("Should get null for a bad name", () => {
            expect(getQueryCache("NotAnItemType", () => getInitialReduxStore(['cache']))).to.eql(null);
        });
        it("Should get null for Message type", () => {
            expect(getQueryCache("Message", () => getInitialReduxStore(['cache']))).to.eql(null);
        });
    });
});

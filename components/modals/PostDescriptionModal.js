import React, { useState } from 'react';
import {Modal, Button, List, Message, Dimmer} from 'semantic-ui-react';
import ClientModal from "./ClientModal";
import { connect } from 'react-redux';
import { fetchClient, forceFetchPost, fetchPost } from "../../redux/convenience/cacheItemTypeActions";
import { convertFromISO } from "../../logic/TimeHelper";
import { forceFetchUserAttributes } from "../../redux/actions/userActions";
import PostFunctions from "../../database_functions/PostFunctions";
import {getObjectAttribute, getPostAttribute} from "../../logic/CacheRetrievalHelper";
// import {setIsLoading} from "../../redux_actions/infoActions";
import Spinner from "../props/Spinner";

type Props = {
    postID: string,
    open: boolean,
    onClose: any
};

const handleDeletePostButton = (userID, postID, setIsLoading) => {
    //log&&console.log("Handling deleting the event");
    if (userID && postID) {
        setIsLoading(true);
        PostFunctions.delete(userID, postID, (data) => {
            setIsLoading(false);
            // this.forceUpdate(data.id);
            //
            // this.setState({isDeleteLoading: false, event: null, isOwned: false});
        }, (error) => {
            setIsLoading(false);
            // log&&console.log(JSON.stringify(error));
            // this.setState({isDeleteLoading: false, error: error});
        });
    }
};

//This modal displays the challenge information and at the bottom contains a button which allows the user
//to join a challenge.
const createCorrectButton = (userID, postID, isOwned, isDeleteLoading, setIsLoading) => {
    //log&&console.log("Owned: " + isOwned + " Joined: " + isJoined);
    // log&&console.log(ifCompleted);
    if(isOwned) {
        // TODO This should also link the choose winner button
        return(
            <div>
                <Button loading={isDeleteLoading} fluid negative size="large" disabled={isDeleteLoading} onClick={() => handleDeletePostButton(userID, postID, setIsLoading)}>Delete</Button>
            </div>
        );
    }
    else {
        //log&&console.log(isJoinLoading);
        return null;
    }
};

/*
* Event Description Modal
*
* This is the event description which displays more in depth information about a challenge, and allows the user
* to join the challenge.
 */
const PostDescriptionModal = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [clientModalOpen, setClientModalOpen] = useState(false);
    const getAttribute = attribute => getObjectAttribute(props.postID, attribute, props.cache);
    const getByAttribute = attribute => getObjectAttribute(getAttribute("by"), attribute, props.cache);

    if (!props.postID) {
        return(
            <Dimmer>
                <Spinner/>
            </Dimmer>
        );
    }
    //log&&console.log("Challenge Info: " + JSON.stringify(this.state.event));
    return(
        <Modal closeIcon open={props.open} onClose={() => props.onClose()}>
            <Modal.Header>{convertFromISO(getAttribute("time_created"))}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <ClientModal open={clientModalOpen} onClose={() => setClientModalOpen(false)} clientID={getAttribute("by")}/>
                    <List relaxed>
                        <List.Item>
                            <List.Icon name='user' />
                            <List.Content>
                                Created by <Button className="u-button--flat" onClick={() => clientModalOpen||setClientModalOpen(true)}>{getByAttribute("name")}</Button>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='calendar' />
                            <List.Content>
                                {convertFromISO(getAttribute("time_created"))}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='description' />
                            <List.Content>
                                {getAttribute("description")}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='access' />
                            <List.Content>
                                {getAttribute("access")}
                            </List.Content>
                        </List.Item>
                        {/*TODO This is going to be where we show the DETAIL CARD (or some equivalent)*/}
                        <List.Item>
                            <List.Icon name='users' />
                            <List.Content>
                                <Modal trigger={<Button className="u-button--flat u-padding-left--1">About</Button>} closeIcon>
                                    <Modal.Content>
                                    </Modal.Content>
                                </Modal>
                            </List.Content>
                        </List.Item>
                    </List>
                    {createCorrectButton(props.user.id, props.postID, props.user.id === getPostAttribute("by"), isLoading, setIsLoading)}
                </Modal.Description>
                {/*
                    <Modal trigger={<Button primary id="ui center aligned"><Icon name="comment outline"/></Button>}>
                        <Grid>
                            <div id="ui center align">

                            </div>
                        </Grid>
                    </Modal>
                    */}
            </Modal.Content>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
    info: state.info
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClient: (id, variablesList) => {
            dispatch(fetchClient(id, variablesList));
        },
        forceFetchUserAttributes: (attributeList) => {
            dispatch(forceFetchUserAttributes(attributeList));
        },
        fetchPost: (id, variablesList) => {
            dispatch(fetchPost(id, variablesList));
        },
        forceFetchPost: (id, variablesList) => {
            dispatch(forceFetchPost(id, variablesList));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDescriptionModal);

import React, { useState } from 'react';
import {Card, Image, Dimmer, Icon, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import GroupDescriptionModal from '../modals/GroupDescriptionModal';
import Logo from "../../img/vt_new.svg";
import Spinner from "../props/Spinner";
import {getAttributeFromObject, getObjectAttribute} from "../../logic/CacheRetrievalHelper";
import {
    fetchClient,
} from "../../redux/convenience/cacheItemTypeActions";
import type Group from "../../types/Group";

export const GroupCardInfo = {
    fetchList: ["id", "item_type", "title", "description", "motto", "restriction", "members", "owners", "time_created", "access", "challenges"],
    ifSubscribe: false
};

type Props = {
    group: Group
};

/**
 * This is the generic view for how a Group shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 *
 * @param {Props} props The given props to the component.
 * @returns {*} The React JSX used to display the component.
 * @constructor
 */
const GroupCard = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const getGroupAttribute = (attributeName) => {
        return getAttributeFromObject(props.group, attributeName);
    };

    //alert(getGroupAttribute("owners"));

    const getOwnerAttribute = attribute => getObjectAttribute(getGroupAttribute("owners")[0], attribute, props.cache);

    //alert(getOwnerAttribute("name"));

    // if (getGroupAttribute("owners")) {
    //     // if (getGroupAttribute("owners") === props.user.id) {
    //     //     setIsOwned(true);
    //     // }
    //     const itemType = getItemTypeFromID(getGroupAttribute("owners")[0]);
    //     if (itemType === "Client") {
    //         props.fetchClient(getGroupAttribute("owners")[0], ["id", "name", "profileImagePath", "profileImagePaths"]);
    //     }
    //     else if (itemType === "Trainer") {
    //         props.fetchTrainer(getGroupAttribute("owners")[0], ["id", "name", "profileImagePath", "profileImagePaths"]);
    //     }
    // }

    if (!props.group) {
        //console.log("can't find Group");
        return (
            <Dimmer>
                <Spinner/>
            </Dimmer>
        );
    }
    return(
        // This is displays a few important pieces of information about the Group for the feed view.
        <Card fluid raised onClick={() => modalOpen||setModalOpen(true)}>
            <Card.Content textAlign = 'center'>
                <Card.Header textAlign = 'center'>{getGroupAttribute("title")}</Card.Header>
                <Image src={Logo} size="small" centered />
                <Card.Meta textAlign = 'center' >{"\""}{getGroupAttribute("motto")}{"\""}</Card.Meta>
                <GroupDescriptionModal open={modalOpen} onClose={() => setModalOpen(false)} groupID={getGroupAttribute("id")}/>
            </Card.Content>
            <Card.Content extra>
                <Card.Meta textAlign = 'center'>
                    <Button disabled className="u-button--flat u-padding-left--1" floated='left'><Icon name='user' />
                        {getOwnerAttribute("name")}</Button>
                    <Button disabled className="u-button--flat u-padding-left--1" floated='right'><Icon name='users' />
                        {getGroupAttribute("membersLength")} Members</Button>
                </Card.Meta>
            </Card.Content>
        </Card>
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
        fetchTrainer: (id, variablesList) => {
            dispatch(fetchClient(id, variablesList));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCard);
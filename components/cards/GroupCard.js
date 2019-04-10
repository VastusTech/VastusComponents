import React, { useState } from 'react';
import {Card, Image, Dimmer} from 'semantic-ui-react';
import GroupDescriptionModal from '../modals/GroupDescriptionModal';
import Logo from "../../img/vt_new.svg";
import Spinner from "../props/Spinner";
import {getAttributeFromObject} from "../../logic/CacheRetrievalHelper";

export const GroupCardInfo = {
    fetchList: ["id", "item_type", "title", "description", "restriction", "members", "owners", "time_created", "access"],
    ifSubscribe: false
};

type Props = {
    group: {
        id: string,
        title: string,
        description: string,
        restriction: string,
        members: [string],
        owners: [string],
        time_created: string,
        access: string
    }
};

// const pictures = {
//     Performance: require('../../img/Performance_icon.png'),
//     Strength: require('../../img/Strength_icon.png'),
//     Endurance: require('../../img/Endurance_icon.png'),
//     HIIT: require('../../img/HIIT_icon.png')
// };

// const displayTagIcons = (tags) => {
//     if (tags) {
//         if (tags.length === 1) {
//             return (
//                 <Image size='small' src={pictures[tags[0]]}/>
//             );
//         }
//         else if (tags.length === 2) {
//             return (
//                 <div>
//                     <Image size='tiny' src={pictures[tags[0]]}/>
//                     <Image size='tiny' src={pictures[tags[1]]}/>
//                 </div>
//             );
//         }
//         else if (tags.length === 3) {
//             return(
//                 <div>
//                     <Image avatar src={pictures[tags[0]]}/>
//                     <Image avatar src={pictures[tags[1]]}/>
//                     <Image avatar src={pictures[tags[2]]}/>
//                 </div>
//             );
//         }
//         else if (tags.length === 4) {
//             return(
//                 <div>
//                     <Image avatar src={pictures[tags[0]]}/>
//                     <Image avatar src={pictures[tags[1]]}/>
//                     <Image avatar src={pictures[tags[2]]}/>
//                     <Image avatar src={pictures[tags[3]]}/>
//                 </div>
//             );
//         }
//     }
//     else {
//         return null;
//     }
// };

/**
 * Group Card
 *
 * This is the generic view for how a Group shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 */
const GroupCard = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const getGroupAttribute = (attributeName) => {
        return getAttributeFromObject(props.group, attributeName);
    };

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
                <Card.Meta textAlign = 'center' >{getGroupAttribute("description")}</Card.Meta>
                <GroupDescriptionModal open={modalOpen} onClose={() => setModalOpen(false)} groupID={getGroupAttribute("id")}/>
            </Card.Content>
            <Card.Content extra>
                <Card.Meta textAlign = 'center'>
                    {getGroupAttribute("membersLength")} Members
                </Card.Meta>
            </Card.Content>
        </Card>
    );
};


export default GroupCard;
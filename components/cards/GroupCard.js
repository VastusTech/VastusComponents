import React, { Component } from 'react';
import {Card, Image} from 'semantic-ui-react';
import GroupDescriptionModal from '../modals/GroupDescriptionModal';
import { connect } from 'react-redux';
import { fetchGroup } from "../../redux_actions/cacheActions";
import {daysLeft, parseISOString} from "../../logic/TimeHelper";
import Logo from "../../img/vt_new.svg";

Date.prototype.toIsoString = function() {
    var tzo = -this.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate()) +
        'T' + pad(this.getHours()) +
        ':' + pad(this.getMinutes()) +
        ':' + pad(this.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
};

Date.daysBetween = function( date1, date2 ) {   //Get 1 day in milliseconds
    let one_day=1000*60*60*24;    // Convert both dates to milliseconds
    let date1_ms = date1.getTime();
    let date2_ms = date2.getTime();    // Calculate the difference in milliseconds
    let difference_ms = date2_ms - date1_ms;        // Convert back to days and return
    return Math.round(difference_ms/one_day);
};

type Props = {
    groupID: string
};

/**
 * Group Card
 *
 * This is the generic view for how a Group shows up in any feeds or lists.
 * It is used as a modal trigger in the feed.
 */
class GroupCard extends Component<Props> {
    static fetchVariableList = ["id", "item_type", "title", "description", "restriction", "members", "owners", "time_created", "access"];

    static pictures = {
        Performance: require('../../img/Performance_icon.png'),
        Strength: require('../../img/Strength_icon.png'),
        Endurance: require('../../img/Endurance_icon.png'),
        HIIT: require('../../img/HIIT_icon.png')
    };

    state = {
        error: null,
        groupID: null,
        groupModalOpen: false,
    };

    constructor(props) {
        super(props);
        this.getDaysLeft = this.getDaysLeft.bind(this);
        this.getTodayDateString = this.getTodayDateString.bind(this);
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
        //this.props.fetchGroup(this.state.groupID, ["id", "title", "time", "time_created", "owner", "members", "capacity", "difficulty"]);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.groupID && !this.state.groupID) {
            this.setState({groupID: newProps.groupID});
        }
    }

    getGroupAttribute(attribute) {
        if (this.state.groupID) {
            let group = this.props.cache.groups[this.state.groupID];
            if (group) {
                if (attribute.substr(attribute.length - 6) === "Length") {
                    attribute = attribute.substr(0, attribute.length - 6);
                    if (group[attribute] && group[attribute].length) {
                        return group[attribute].length;
                    }
                    else {
                        return 0;
                    }
                }
                /*if(attribute === "tags") {
                    console.log(Group[attribute]);
                }*/
                return group[attribute];
            }
        }
        return null;
    }

    displayTagIcons(tags) {
        if(tags) {
            if (tags.length === 1) {
                return (
                    <Image size='small' src={GroupCard.pictures[tags[0]]}/>
                );
            }
            else if (tags.length === 2) {
                return (
                    <div>
                        <Image size='tiny' src={GroupCard.pictures[tags[0]]}/>
                        <Image size='tiny' src={GroupCard.pictures[tags[1]]}/>
                    </div>
                );
            }
            else if (tags.length === 3) {
                return(
                    <div>
                        <Image avatar src={GroupCard.pictures[tags[0]]}/>
                        <Image avatar src={GroupCard.pictures[tags[1]]}/>
                        <Image avatar src={GroupCard.pictures[tags[2]]}/>
                    </div>
                );
            }
            else if (tags.length === 4) {
                return(
                    <div>
                        <Image avatar src={GroupCard.pictures[tags[0]]}/>
                        <Image avatar src={GroupCard.pictures[tags[1]]}/>
                        <Image avatar src={GroupCard.pictures[tags[2]]}/>
                        <Image avatar src={GroupCard.pictures[tags[3]]}/>
                    </div>
                );
            }
        }
        else {
            return (
                // "There ain't no tags round these parts partner " + tags
                null
            );
        }
    }

    openGroupModal = () => {
        if (!this.state.groupModalOpen) {
            console.log("Opening Group modal");
            this.setState({groupModalOpen: true});
        }
    };
    closeGroupModal = () => {
        this.setState({groupModalOpen: false});
        console.log("Closing Group Modal pt. 2: the reckoning");
    };

    render() {
        if (!this.getGroupAttribute("id")) {
            //console.log("can't find Group");
            return null;
        }
        if  (this.getDaysLeft() <= 0) {
            return null;
        }
        // if(this.getGroupAttribute("tags")) {
        //     // console.log("There be tags!");
        //     // console.log(this.getGroupAttribute("tags"));
        // }
        return(
            // This is displays a few important pieces of information about the Group for the feed view.
            <Card fluid raised onClick={this.openGroupModal.bind(this)}>
                <Card.Content textAlign = 'center'>
                    <Card.Header textAlign = 'center'>{this.getGroupAttribute("title")}</Card.Header>
                    <Image src={Logo} size="small" centered />
                    <Card.Meta textAlign = 'center' >{this.getGroupAttribute("description")}</Card.Meta>
                    {/*<GroupDescriptionModal open={this.state.groupModalOpen} onClose={this.closeGroupModal.bind(this)} groupID={this.getGroupAttribute("id")}/>*/}
                </Card.Content>
                <Card.Content extra>
                    <Card.Meta textAlign = 'center'>
                        {this.getGroupAttribute("members").length} Members
                    </Card.Meta>
                </Card.Content>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
    info: state.info
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGroup: (id, variablesList) => {
            dispatch(fetchGroup(id, variablesList));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCard);
import React, {Component} from 'react'
import {Grid, Button, Message, Image, Modal, Form, Container, Checkbox, Header, Card, Icon} from 'semantic-ui-react';
import {connect} from "react-redux";
import {setError} from "../../redux/actions/infoActions";
import {fetchChallenge} from "../../redux/convenience/cacheItemTypeActions";
import GroupFunctions from "../../database_functions/GroupFunctions";
import {removeFromArray} from "../../logic/ArrayHelper";

// TODO Refactor

/*type Props = {
    queryChallenges: any
}*/

/*
* Create Event Prop
*
* This is the modal for creating events. Every input is in the form of a normal text input.
* Inputting the time and date utilizes the Semantic-ui Calendar React library which isn't vanilla Semantic.
 */
class CreateGroupProp extends Component {
    state = {
        checked: false,
        checkedRest: false,
        title: "",
        motto: "",
        isSubmitLoading: false,
        showModal: false,
        submitError: "",
        showSuccessModal: false,
        showSuccessLabel: false,
        tags: [],
        performancePressed: false,
        endurancePressed: false,
        hiitPressed: false,
        strengthPressed: false,
        restriction: null,
        access: 'private',
        pictures: [],
        videos: [],
        tempPictureURLs: [],
        tempVideoURLs: [],
    };

    toggle = () => this.setState({ checked: !this.state.checked });
    toggleRest = () => this.setState({ checkedRest: !this.state.checkedRest });

    handleAccessSwitch = () => {
        if(this.state.access === 'public') {
            this.setState({access: 'private'})
        }
        else if (this.state.access === 'private') {
            this.setState({access: 'public'})
        }
        else {
            console.error("Event access should be public or private");
        }
    };

    handleRestrictionSwitch = () => {
        if(this.state.restriction === 'invite') {
            this.setState({restriction: null});
        }
        else {
            this.setState({restriction: 'invite'});
        }
    };

    showRestriction() {
        if(!this.state.restriction) {
            return 'unrestricted';
        }
        else {
            return this.state.restriction;
        }
    }

    handleTag(tag) {
        if(tag === "HIIT" && !this.state.hiitPressed) {
            this.setState({tags: this.state.tags.concat(tag)},
                () => console.log(JSON.stringify(this.state.tags)));
            this.setState({hiitPressed: true});
        }
        else if(tag === "Performance" && !this.state.performancePressed) {
            this.setState({tags: this.state.tags.concat(tag)},
                () => console.log(JSON.stringify(this.state.tags)));
            this.setState({performancePressed: true});
        }
        else if(tag === "Endurance" && !this.state.endurancePressed) {
            this.setState({tags: this.state.tags.concat(tag)},
                () => console.log(JSON.stringify(this.state.tags)));
            this.setState({endurancePressed: true});
        }
        else if(tag === "Strength" && !this.state.strengthPressed) {
            this.setState({tags: this.state.tags.concat(tag)},
                () => console.log(JSON.stringify(this.state.tags)));
            this.setState({strengthPressed: true});
        }
        else if(tag === "HIIT" && this.state.hiitPressed) {
            this.setState({tags: removeFromArray(this.state.tags, tag)},
                () => console.log(JSON.stringify(this.state.tags)));
            this.setState({hiitPressed: false});
        }
        else if(tag === "Performance" && this.state.performancePressed) {
            this.setState({tags: removeFromArray(this.state.tags, tag)},
                () => console.log(JSON.stringify(this.state.tags)));
            this.setState({performancePressed: false});
        }
        else if(tag === "Endurance" && this.state.endurancePressed) {
            this.setState({tags: removeFromArray(this.state.tags, tag)},
                () => console.log(JSON.stringify(this.state.tags)));
            this.setState({endurancePressed: false});
        }
        else if(tag === "Strength" && this.state.strengthPressed) {
            this.setState({tags: removeFromArray(this.state.tags, tag)},
                () => console.log(JSON.stringify(this.state.tags)));
            this.setState({strengthPressed: false});
        }
    }

    handleSubmit = () => {
        // TODO Make sure the dates are well formed?
        /*
        const year = parseInt(this.eventState.eventDate.substr(0, 4));
        const month = parseInt(this.eventState.eventDate.substr(5, 2)) - 1;
        const day = parseInt(this.eventState.eventDate.substr(8, 2));
        const hour = parseInt(this.eventState.startTime.substr(0, 2));
        const minute = parseInt(this.eventState.startTime.substr(3, 2));
        let startDate = new Date(year, month, day, hour, minute);
        let endDate = new Date(startDate.getTime() + (60000 * this.eventState.duration));
        // console.log(endDate.toDateString());
        // console.log(endDate.getMinutes());
        // endDate.setMinutes(endDate.getMinutes() + this.eventState.duration);
        // console.log(endDate.getMinutes());
        // console.log(endDate.toDateString());



        const time = startDate.toIsoString() + "_" + endDate.toIsoString();
        */
        this.setState({isSubmitLoading: true});

        // TODO Check to see if valid inputs!
        if (this.state.title && this.state.motto && this.state.tags) {
            alert("Title: " + this.state.title + "Motto: " + this.state.motto);
            GroupFunctions.createGroupOptional(this.props.user.id, this.state.title, "Default Description", this.state.motto, this.state.pictures[0], [this.props.user.id], [this.props.user.id], this.state.tags, this.state.access,
                this.state.restriction, (data) => {
                    console.log("Successfully created a group!");
                    this.setState({isSubmitLoading: false});
                    this.closeModal();
                    this.setState({showSuccessLabel: true});
                    this.setState({showModal: false});
                }, (error) => {
                    this.setState({submitError: "*" + JSON.stringify(error)});
                    this.setState({isSubmitLoading: false});
                });
        }
        else {
            this.setState({isSubmitLoading: false, submitError: "All fields need to be filled out!"});
        }
    };

    handleDurationChange = (e, data) => {
        this.eventState.duration = data.value;
        //console.log(this.eventState.duration);
        // this.setState({
        //     duration: data.value,
        // }, () => {
        //     console.log('value',this.state.duration);
        // });
    };

    // static getTodayDateString() {
    //     // This is annoying just because we need to work with time zones :(
    //     const shortestTimeInterval = 5;
    //     const date = new Date();
    //     date.setMinutes(date.getMinutes() + (shortestTimeInterval - (date.getMinutes() % shortestTimeInterval)));
    //     return date.toIsoString().substr(0, 10);
    // }

    // static getNowTimeString() {
    //     // Sneaking some modular arithmetic in this ;) This is so that the time shown is always a nice lookin' number
    //     const shortestTimeInterval = 5;
    //     const date = new Date();
    //     date.setMinutes(date.getMinutes() + (shortestTimeInterval - (date.getMinutes() % shortestTimeInterval)));
    //     return date.toIsoString().substr(11, 5);
    // }

    closeModal = () => {
        this.setState({ showModal: false })
    };

    createSuccessModal() {
        if(this.state.showSuccessModal) {
            return (
                <Modal open={this.state.showSuccessModal}>
                    <Modal.Header align='center'>You Just Created A New Group!</Modal.Header>
                    <Modal.Content>
                        <Button fluid negative size="small" onClick={this.closeSuccessModal}>Ok</Button>
                    </Modal.Content>
                </Modal>
            );
        }
    }

    createSuccessLabel() {
        if(this.state.showSuccessLabel && this.state.showModal) {
            this.setState({showSuccessLabel: false});
        }
        else if(this.state.showSuccessLabel) {
            return (<Message positive>
                <Message.Header>Success!</Message.Header>
                <p>
                    You just created a new Group!
                </p>
            </Message>);
        }
        else {
            return null;
        }
    }

    closeSuccessModal = () => {
        this.setState({showSuccessModal: false});
    };

    getPictures() {
        const pictures = {};
        for (let i = 0; i < this.state.pictures.length; i++) {
            pictures["pictures/" + i] = this.state.pictures[i];
        }
        if (this.state.pictures.length > 0) {
            return pictures;
        }
        return null;
    }

    setPicture = (event) => {
        // const index = this.state.pictures.length;
        this.state.pictures.push(event.target.files[0]);
        // const path = "/" + this.props.user.id + "/temp/pictures/" + index;
        this.state.tempPictureURLs.push(URL.createObjectURL(event.target.files[0]));
        this.setState({});
    };

    displaySubmission() {
        if(this.state.notifySubmission) {
            return (
                <Message positive>
                    <Message.Header>Success!</Message.Header>
                    <p>
                        You uploaded a group image!
                    </p>
                </Message>
            );
        }
    }

    displayCurrentImage() {
        if (this.state.tempPictureURLs && this.state.tempPictureURLs.length > 0) {
            //console.log("Running cur image");
            return(
                <Card>
                    <Image src={this.state.tempPictureURLs[0]} />
                </Card>
            );
        }
        return null;
    }


    displayError() {
        if(this.state.submitError !== "") {
            return (<Message negative>
                <Message.Header>Sorry!</Message.Header>
                <p>{this.state.submitError}</p>
            </Message>);
        }
    }

    setMotto(value) {
        this.setState({motto: value.target.value});
        console.log("New Motto is equal to " + value.target.value);
    }

    setTitle(value) {
        this.setState({title: value.target.value});
        console.log("New Title is equal to " + value.target.value);
    }

    render() {

        return (
            <Container style={{marginBottom: '50px', marginTop: '10px'}}>
                <Header align='center'>Group Builder</Header>
                        <Grid centered>
                                <Grid.Column>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Input fluid label="Title" type="text" name="title" placeholder="Title" onChange={value => this.setTitle(value)}/>
                                        <Form.Input fluid label="Group Motto" type="text" name="motto" placeholder="Add Motto Here..." onChange={value => this.setMotto(value)}/>

                                        <Grid centered rows='equal'>

                                            <Grid.Row>
                                                {this.displayCurrentImage()}
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid centered>
                                                    <div className="uploadImage u-flex u-flex-align--center u-margin-top--2" align='center'>
                                                        <div floated="center">
                                                            <Button primary fluid as="label" htmlFor="picUpload" className="u-bg--primaryGradient">
                                                                <Icon name="camera" className='u-margin-right--0' inverted />
                                                                Upload Group Photo
                                                            </Button>
                                                            <input type="file" accept="image/*;capture=camcorder" id="picUpload" hidden={true} onChange={this.setPicture}/>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <div>{this.displaySubmission()}</div>
                                            </Grid.Row>
                                        </Grid>
                                        <Grid centered>
                                        <Form.Field width={12}>
                                            <Checkbox toggle onClick={this.handleRestrictionSwitch} onChange={this.toggleRest} checked={this.state.checkedRest} label={this.showRestriction()} />
                                        </Form.Field>
                                        <div>{this.displayError()}</div>
                                        </Grid>
                                    </Form>
                            </Grid.Column>
                        </Grid>
                        <Grid centered>
                        <Modal.Actions>
                            <Button loading={this.state.isSubmitLoading} disabled={this.state.isSubmitLoading} primary size="big" type='button' onClick={() => { this.handleSubmit()}}>Submit</Button>
                        </Modal.Actions>
                        {this.createSuccessLabel()}
                        </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    info: state.info,
    cache: state.cache
});

const mapDispatchToProps = (dispatch) => {
    return {
        setError: (error) => {
            dispatch(setError(error));
        },
        fetchChallenge: (id, variablesList) => {
            dispatch(fetchChallenge(id, variablesList));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupProp);
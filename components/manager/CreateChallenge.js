import React, { useState } from 'react'
import {Grid, Button, Message, Image, Modal, Form, Container, Checkbox, Header, Dropdown, Label} from 'semantic-ui-react';
import {connect} from "react-redux";
import {setError} from "../../redux_actions/infoActions";
import {fetchChallenge, putChallenge} from "../../redux_convenience/cacheItemTypeActions";
import ChallengeFunctions from "../../database_functions/ChallengeFunctions";
import {getNowTimeString} from "../../logic/TimeHelper";
import {streakUpdateInfo} from "../../logic/StreakHelper";

const handleSubmit = (userID, endDate, capacity, title, goal, tagsPressed, access, restriction, prize, challengeType,
                      streakUpdateSpanType, streakUpdateInterval, streakN, setIsLoading, setError, setShowSuccessModal) => {
    this.setState({isSubmitLoading: true});
    const tags = [];
    for (const key in tagsPressed) {
        if (tagsPressed.hasOwnProperty(key) && tagsPressed[key]) {
            tags.push(key);
        }
    }
    // TODO Check to see if valid inputs!
    if (capacity && title && goal && tags) {
        if (Number.isInteger(+capacity)) {
            ChallengeFunctions.createChallengeOptional(userID, userID, endDate, capacity, title, goal, "n/a",
                "3", [], tags, access, restriction, prize, challengeType, streakUpdateSpanType, streakUpdateInterval,
                streakN, (data) => {
                    console.log("Successfully created a challenge!");
                    setIsLoading(false);
                    setShowSuccessModal(true);
                    // this.closeModal();
                    // this.setState({showSuccessLabel: true});
                    // this.setState({showModal: false});
                }, (error) => {
                    //console.log(JSON.stringify(error));
                    setIsLoading(false);
                    setError("*" + JSON.stringify(error))
                    // this.setState({submitError: "*" + JSON.stringify(error)});
                    // this.setState({isSubmitLoading: false});
                });
        }
        else {
            setIsLoading(false);
            setError("Capacity needs to be an integer!");
            // this.setState({isSubmitLoading: false, submitError: "Capacity needs to be an integer!"});
        }
    }
    else {
        setIsLoading(false);
        setError("All fields need to be filled out!");
        // this.setState({isSubmitLoading: false, submitError: "All fields need to be filled out!"});
    }
};

// handleTag(tag) {
//     if(tag === "HIIT" && !this.state.hiitPressed) {
//         this.setState({tags: this.state.tags.concat(tag)},
//             () => console.log(JSON.stringify(this.state.tags)));
//         this.setState({hiitPressed: true});
//     }
//     else if(tag === "Performance" && !this.state.performancePressed) {
//         this.setState({tags: this.state.tags.concat(tag)},
//             () => console.log(JSON.stringify(this.state.tags)));
//         this.setState({performancePressed: true});
//     }
//     else if(tag === "Endurance" && !this.state.endurancePressed) {
//         this.setState({tags: this.state.tags.concat(tag)},
//             () => console.log(JSON.stringify(this.state.tags)));
//         this.setState({endurancePressed: true});
//     }
//     else if(tag === "Strength" && !this.state.strengthPressed) {
//         this.setState({tags: this.state.tags.concat(tag)},
//             () => console.log(JSON.stringify(this.state.tags)));
//         this.setState({strengthPressed: true});
//     }
//     else if(tag === "HIIT" && this.state.hiitPressed) {
//         this.setState({tags: arrayRemove(this.state.tags, tag)},
//             () => console.log(JSON.stringify(this.state.tags)));
//         this.setState({hiitPressed: false});
//     }
//     else if(tag === "Performance" && this.state.performancePressed) {
//         this.setState({tags: arrayRemove(this.state.tags, tag)},
//             () => console.log(JSON.stringify(this.state.tags)));
//         this.setState({performancePressed: false});
//     }
//     else if(tag === "Endurance" && this.state.endurancePressed) {
//         this.setState({tags: arrayRemove(this.state.tags, tag)},
//             () => console.log(JSON.stringify(this.state.tags)));
//         this.setState({endurancePressed: false});
//     }
//     else if(tag === "Strength" && this.state.strengthPressed) {
//         this.setState({tags: arrayRemove(this.state.tags, tag)},
//             () => console.log(JSON.stringify(this.state.tags)));
//         this.setState({strengthPressed: false});
//     }
// }

// const createSuccessModal = () => {
//     if(this.state.showSuccessModal) {
//         return (
//             <Modal open={this.state.showSuccessModal}>
//                 <Modal.Header align='center'>Successfully Created Event!</Modal.Header>
//                 <Modal.Content>
//                     <Button fluid negative size="small" onClick={this.closeSuccessModal}>Ok</Button>
//                 </Modal.Content>
//             </Modal>
//         );
//     }
// };

const createSuccessLabel = (show) => {
    if (show) {
        return (<Message positive>
            <Message.Header>Success!</Message.Header>
            <p>
                You just created a new Challenge!
            </p>
        </Message>);
    }
    else {
        return null;
    }
};

const displayError = (error) => {
    if(error !== "") {
        return (<Message negative>
            <Message.Header>Sorry!</Message.Header>
            <p>{error}</p>
        </Message>);
    }
};

/*
* Create Challenge Prop
*
* This is the modal for creating events. Every input is in the form of a normal text input.
* Inputting the time and date utilizes the Semantic-ui Calendar React library which isn't vanilla Semantic.
 */
const CreateChallengeProp = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [tagsPressed, setTagsPressed] = useState({
        HIIT: false,
        Strength: false,
        Performance: false,
        Endurance: false
    });
    const [title, setTitle] = useState("");
    const [endTime, setEndTime] = useState(getNowTimeString());
    const [capacity, setCapacity] = useState(25);
    const [goal, setGoal] = useState("");
    const [prize, setPrize] = useState("");
    const [description, setDescription] = useState("");
    const [restriction, setRestriction] = useState(null);
    const [access, setAccess] = useState("public");
    const [showSuccessLabel, setShowSuccessLabel] = useState(false);
    const [challengeType, setChallengeType] = useState(null);
    const [streakUpdateSpanType, setStreakUpdateSpanType] = useState(null);
    const [streakUpdateInterval, setStreakUpdateInterval] = useState(null);
    const [streakN, setStreakN] = useState(null);

    // state = {
    //     showModal: false,
    //     showSuccessModal: false,
    //     showSuccessLabel: false,
    //     showSuccessLabelTimer: 0,
    // };

    return (
        <div align='center'>
            <Header align='center'>Challenge Builder</Header>
            <div align='center'>
                <Grid align='center'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Button color={tagsPressed.HIIT ? "purple" : "black"} inverted={tagsPressed.HIIT} basic={!tagsPressed.HIIT}>
                                <Image dark size='medium' src={require('../../img/vastus-tech-icons-03.svg')} onClick={() => setTagsPressed(p => ({...p, HIIT: !p.HIIT}))}/>
                                <div style={{color: 'white'}}>HIIT</div>
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button color={tagsPressed.Strength ? "purple" : "black"} inverted={tagsPressed.Strength} basic={!tagsPressed.Strength}>
                                <Image size='medium' src={require('../../img/vastus-tech-icons-04.svg')} onClick={() => setTagsPressed(p => ({...p, Strength: !p.Strength}))}/>
                                <div style={{color: 'white'}}>Strength</div>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Button color={tagsPressed.Performance ? "purple" : "black"} inverted={tagsPressed.Performance} basic={!tagsPressed.Performance}>
                                <Image size='medium' src={require('../../img/vastus-tech-icons-02.svg')} onClick={() => setTagsPressed(p => ({...p, Performance: !p.Performance}))}/>
                                <div style={{color: 'white'}}>Performance</div>
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button color={tagsPressed.Endurance ? "purple" : "black"} inverted={tagsPressed.Endurance} basic={!tagsPressed.Endurance}>
                                <Image size='medium' src={require('../../img/vastus-tech-icons-01.svg')} onClick={() => setTagsPressed(p => ({...p, Endurance: !p.Endurance}))}/>
                                <div style={{color: 'white'}}>Endurance</div>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Container align='center'>
                    <Grid centered>
                        <Grid.Row centered>
                            <Grid.Column>
                                <Form onSubmit={() => handleSubmit(props.user.id, endTime, capacity, title, goal, tagsPressed,
                                    access, restriction, prize, challengeType, streakUpdateSpanType, streakUpdateInterval, streakN,
                                    setIsLoading, setError, setShowSuccessLabel)}>
                                    <Form.Input fluid label="Title" type="text" name="title" placeholder="Title" onChange={value => setTitle(value.target.value)}/>
                                    <div className="field">
                                        <label>End Date & Time</label>
                                        <input type="datetime-local" name="challengeDate" onChange={value => {setEndTime(value.target.value);}}/>
                                    </div>
                                    <Form.Input fluid label="Capacity" type="text" name="capacity" placeholder="Number of allowed attendees... " onChange={value => setCapacity(value.target.value)}/>
                                    <Form.Input fluid label="Goal" type="text" name="goal" placeholder="Criteria the victor is decided on..." onChange={value => setGoal(value.target.value)}/>
                                    <Form.Input fluid label="Prize" type="text" name="prize" placeholder="Prize for winning the event..." onChange={value => setPrize(value.target.value)}/>
                                    {
                                        challengeType === "streak" ? [
                                            <div className="field" align="center">
                                                <Header as="h1">{streakUpdateInfo(streakN, streakUpdateInterval, streakUpdateSpanType)}</Header>
                                            </div>,
                                            <div className="field">
                                                <label>Update Span</label>
                                                <Dropdown value={streakUpdateSpanType} selection placeholder="Choose the Span of the Streak Update"
                                                          options={[{
                                                              key: "hourly",
                                                              text: "Hourly",
                                                              value: "hourly",
                                                          }, {
                                                              key: "daily",
                                                              text: "Daily",
                                                              value: "daily"
                                                          }, {
                                                              key: "weekly",
                                                              text: "Weekly",
                                                              value: "weekly"
                                                          }, {
                                                              key: "monthly",
                                                              text: "Monthly",
                                                              value: "monthly"
                                                          }, {
                                                              key: "yearly",
                                                              text: "Yearly",
                                                              value: "yearly"
                                                          }]}
                                                          onChange={(e, data) => {
                                                              setStreakUpdateSpanType(data.value)}}/>
                                            </div>,
                                            <Form.Input fluid label="Span Interval" type="number" name="streakUpdateInterval"
                                                        placeholder="Spans until streaks update... " value={streakUpdateInterval}
                                                        onChange={value => value.target.value === "" || parseInt(value.target.value) <= 0
                                                            ? setStreakUpdateInterval(1) : setStreakUpdateInterval(value.target.value)}/>,
                                            <Form.Input fluid label="Streak Number" type="number" name="streakN"
                                                        placeholder="Number of submissions until streak counts..." value={streakN}
                                                        onChange={value => value.target.value === "" || parseInt(value.target.value) <= 0
                                                            ? setStreakN(1) : setStreakN(value.target.value)}/>,
                                        ] : null
                                    }
                                    {/*<Form.Field>
                                        <div className="field" width={5}>
                                            <label>Difficulty</label>
                                            <Rating icon='star' defaultRating={1} maxRating={3} />
                                        </div>
                                    </Form.Field>*/}
                                    <Form.Field width={12}>
                                        <Checkbox toggle
                                                  onClick={() => {setChallengeType(p => p ? null : "streak");
                                                  setStreakN(1); setStreakUpdateInterval(1); setStreakUpdateSpanType("daily")}}
                                                  checked={challengeType === "streak"}
                                                  label={challengeType ? challengeType : "normal"} />
                                    </Form.Field>
                                    <Form.Field width={12}>
                                        <Checkbox toggle
                                                  onClick={() => setAccess(p => p === "public" ? "private" : "public")}
                                                  checked={access === "public"}
                                                  label={access} />
                                    </Form.Field>
                                    <Form.Field width={12}>
                                        <Checkbox toggle
                                                  onClick={() => setRestriction(p => p ? null : "restricted")}
                                                  checked={restriction}
                                                  label={restriction ? restriction : "unrestricted"}/>
                                    </Form.Field>
                                    <div>{displayError(error)}{createSuccessLabel(showSuccessLabel)}</div>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
            <Modal.Actions>
                <Button loading={isLoading} disabled={isLoading} primary size="big" type='button'
                        onClick={() => handleSubmit(props.user.id, endTime, capacity, title, goal, tagsPressed, access,
                            restriction, prize, challengeType, streakUpdateSpanType, streakUpdateInterval, streakN,
                            setIsLoading, setError, setShowSuccessLabel)}>Submit</Button>
            </Modal.Actions>
        {createSuccessLabel(showSuccessLabel)}
        </div>
    );
};

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
        putChallenge: (event) => {
            dispatch(putChallenge(event));
        },
        // putChallengeQuery: (queryString, queryResult) => {
        //     dispatch(putChallengeQuery(queryString, queryResult));
        // },
        // clearChallengeQuery: () => {
        //     dispatch(clearChallengeQuery());
        // }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChallengeProp);
import React, { useState } from 'react'
import {
    Grid,
    Button,
    Message,
    Image,
    Modal,
    Form,
    Container,
    Checkbox,
    Header,
    Dropdown,
    Icon
} from 'semantic-ui-react';
import {connect} from "react-redux";
import {setError} from "../../redux/actions/infoActions";
import {fetchChallenge} from "../../redux/convenience/cacheItemTypeActions";
import ChallengeFunctions from "../../database_functions/ChallengeFunctions";
import {getNowTimeString} from "../../logic/TimeHelper";
import {addToUserAttribute} from "../../redux/actions/userActions";
import {clearItemQueryCache} from "../../redux/actions/cacheActions";
import { Storage } from 'aws-amplify';
import {err} from "../../../Constants";

/**
 * Handles the actual creation of the Challenge given the inputted info from the User.
 *
 * @param {string} userID The ID of the User creating the Challenge.
 * @param {string} endDate The ISO string of the date that the Challenge ends.
 * @param {number} capacity The max number of members for the challenge.
 * @param {string} title The display title for the Challenge.
 * @param {string} goal The way for members to win the Challenge.
 * @param {[string]} tagsPressed The tags that are applied to the Challenge.
 * @param {string} access The access string for who can see the Challenge. ("public" or "private").
 * @param {string|null} restriction The restriction string for if Users can join without a request. ("invite" or null).
 * @param {string} prize The prize for winning the Challenge.
 * @param {string|null} challengeType The type of Challenge this will be, how to win it. ("streak" or null).
 * @param {string|null} streakUpdateSpanType The update span type, "hourly", "daily", ...
 * @param {string|null} streakUpdateInterval How many update span types pass for a streak cycle.
 * @param {number|null} streakN The number of submissions to do to maintain the streak.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 * @param {function(error)} setError Sets the error state.
 * @param {function(true)} setShowSuccessModal Sets the showing of success modal state.
 * @param {{}} props The props of the component that hold the redux automatic updating functions.
 */
const handleSubmit = (userID, endDate, capacity, title, goal, tagsPressed, access, restriction, prize, challengeType,
                      streakUpdateSpanType, streakUpdateInterval, streakN, setIsLoading, setError, setShowSuccessModal, props) => {
    //this.setState({isSubmitLoading: true});
    alert("Current user: " + userID);
    const tags = [];
    for (const key in tagsPressed) {
        if (tagsPressed.hasOwnProperty(key) && tagsPressed[key]) {
            tags.push(key);
        }
    }
    // TODO Check to see if valid inputs!
    if (capacity && title && goal && tags) {
        if (Number.isInteger(+capacity)) {
            ChallengeFunctions.createChallengeOptional(userID, userID, endDate, capacity, title, goal, null,
                null, null, tags, access, restriction, null, null, null, null,
                streakN, () => {
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
                }, props);
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

/**
 * Shows a success label based on the given info.
 *
 * @param {boolean} show Whether the User has successfully created a Challenge or not.
 * @return {*} The React JSX to display the success label or null if not applicable.
 */
export const createSuccessLabel = (show) => {
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

/**
 * Displays an error message if applicable.
 *
 * @param {string} error The error message string.
 * @return {*} The React JSX to show the error message.
 */
export const displayError = (error) => {
    if(error !== "") {
        return (<Message negative>
            <Message.Header>Sorry!</Message.Header>
            <p>{error}</p>
        </Message>);
    }
};

const setPictureURL = (event, userID, setTempPictures, setPrize) => {
    setPrize(event.target.files[0]);
    const path = "/" + userID + "/temp/pictures/0";
    Storage.put(path, event.target.files[0], { contentType: "video/*;image/*" })
        .then(() => {
            Storage.get(path).then((url) => {
                setTempPictures(url);
            }).catch((error) => {
                err&&console.error(error);
            })
        }).catch((error) => {
        err&&console.error(error);
    });
};

const displayCurrentImage = (picture) => {
    if (picture) {
        //console.log("Running cur image");
        return(
            <Image src={picture} />
        );
    }
    return null;
}

/**
 * This is the modal for creating Challenges. Every input is in the form of a normal text input.
 * Inputting the time and date utilizes the Semantic-ui Calendar React library which isn't vanilla Semantic.
 *
 * @param {{}} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
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
    const [restriction, setRestriction] = useState(null);
    const [access, setAccess] = useState("public");
    const [showSuccessLabel, setShowSuccessLabel] = useState(false);
    const [challengeType, setChallengeType] = useState("streak");
    const [streakUpdateSpanType, setStreakUpdateSpanType] = useState(null);
    const [streakUpdateInterval, setStreakUpdateInterval] = useState(null);
    const [streakN, setStreakN] = useState(null);
    const [tempPictures, setTempPictures] = useState(null);

    function setPicture(image) {
        setPictureURL(image, props.user.id, setTempPictures, setPrize);
        alert("Image URL: " + image);
    }

    return (
        <div align='center'>
            <Form onSubmit={() => handleSubmit(props.user.id, endTime, capacity, title, goal, tagsPressed,
                access, restriction, prize, challengeType, streakUpdateSpanType, streakUpdateInterval, streakN,
                setIsLoading, setError, setShowSuccessLabel)}>
                <Header as='h3'>
                <Form.Input fluid type="text" name="title" placeholder={props.user.name + "\'s Challenge"}
                            onChange={value => setTitle(value.target.value)}/>
                </Header>
            <div align='center'>
                <Grid align='center'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Button color={tagsPressed.HIIT ? "purple" : "black"} inverted={tagsPressed.HIIT} basic={!tagsPressed.HIIT}>
                                <Image size='medium' src={require('../../img/vastus-tech-icons-03.svg')} onClick={() => setTagsPressed(p => ({...p, HIIT: !p.HIIT}))}/>
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
                    <Grid.Row>
                        {/*<UploadImage
                                    imageURL={prize ? prize.image : null}
                                    callback={(picture) => {setPrize(picture)}}/>*/}
                        {displayCurrentImage(tempPictures)}
                        <Button as='label' for='picUpload'>
                            <Icon name='camera' size = "large" style={{marginLeft: '8px'}}/>
                            <input type="file" accept="image/*;video/*;capture=camcorder" id="picUpload" hidden='true' onChange={e => setPicture(e)}/>
                        </Button>
                    </Grid.Row>
                </Grid>
                <Container align='center'>
                    <Grid centered>
                        <Grid.Row centered>
                            <Grid.Column>
                                {/*<Form.Input fluid label="Capacity" type="text" name="capacity" placeholder="Number of allowed attendees... " onChange={value => setCapacity(value.target.value)}/>*/}
                                <div className="field">
                                    <label>End Date & Time</label>
                                    <input type="datetime-local" name="challengeDate" onChange={value => {setEndTime(value.target.value);}}/>
                                </div>
                                <Form.Input fluid type="text" name="goal" placeholder="Challenge Goal..." onChange={value => setGoal(value.target.value)}/>
                                    <div key={0} className="field" align="center">
                                        {/*<Header as="h1">{streakUpdateInfo(streakN, streakUpdateInterval, streakUpdateSpanType)}</Header>*/}
                                        <Header as='h3'>
                                            <Grid columns={5}>

                                            </Grid>

                                        </Header>
                                    </div>
                                    {/*<Form.Field>
                                        <div className="field" width={5}>
                                            <label>Difficulty</label>
                                            <Rating icon='star' defaultRating={1} maxRating={3} />
                                        </div>
                                    </Form.Field>*/}
                                {/*Form.Field width={12}>
                                        <Checkbox toggle
                                                  onClick={() => {setChallengeType(p => p ? null : "streak");
                                                  setStreakN(1); setStreakUpdateInterval(1); setStreakUpdateSpanType("daily")}}
                                                  checked={challengeType === "streak"}
                                                  label={challengeType ? challengeType : "streak off"} />
                                    </Form.Field>*/}
                                    <Form.Field width={12}>
                                        <Checkbox toggle
                                                  onClick={() => setAccess(p => p === "public" ? "private" : "public")}
                                                  checked={access === "public"}
                                                  label={access} />
                                    </Form.Field>
                                {/*<Form.Field width={12}>
                                        <Checkbox toggle
                                                  onClick={() => setRestriction(p => p ? null : "restricted")}
                                                  checked={restriction}
                                                  label={restriction ? restriction : "unrestricted"}/>
                                    </Form.Field>*/}
                                    <div>{displayError(error)}{createSuccessLabel(showSuccessLabel)}</div>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
            <Modal.Actions>
                <Button loading={isLoading} disabled={isLoading} primary size="big" type='button'
                        onClick={() => handleSubmit(props.user.id, endTime, 1000, title, goal, tagsPressed, access,
                            restriction, prize, challengeType, streakUpdateSpanType, streakUpdateInterval, streakN,
                            setIsLoading, setError, setShowSuccessLabel, props)}>Submit</Button>
            </Modal.Actions>
        {createSuccessLabel(showSuccessLabel)}
        </Form>
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
        addToUserAttribute: (attributeName, attributeValue) => {
            dispatch(addToUserAttribute(attributeName, attributeValue));
        },
        clearItemQueryCache: (itemType) => {
            dispatch(clearItemQueryCache(itemType));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChallengeProp);


/*
<Grid.Column style={{marginTop: '15px'}} width={3}>
    {tasksPlural(streakUpdateInterval)} every
</Grid.Column>

<Grid.Column>
                                                    {intervalsPlural(streakN, setStreakUpdateSpanType, streakUpdateSpanType)}
                                                </Grid.Column>
*/

/*  <Grid.Column style={{marginTop: '15px'}} width={3}>
                                                    Complete
                                                </Grid.Column>
                                                <Grid.Column>
                                            <Form.Input fluid type="number" name="streakUpdateInterval" value={streakUpdateInterval ? streakUpdateInterval : ""}
                                                        onChange={value => value.target.value === "" || parseInt(value.target.value) <= 0
                                                            ? setStreakUpdateInterval(1) : setStreakUpdateInterval(value.target.value)}/>
                                                </Grid.Column>

                                                <Grid.Column>
                                                    <Form.Input fluid type="number" name="streakN" value={streakN ? streakN : ""}
                                                        onChange={value => value.target.value === "" || parseInt(value.target.value) <= 0
                                                            ? setStreakN(1) : setStreakN(value.target.value)}/>
                                                </Grid.Column>
*/

/*
export const tasksPlural = (value) => {
    if(value > 1) {
        return "tasks";
    }
    else {
        return "task";
    }
}

const intervalsPlural = (value, setStreakUpdateSpanType, streakUpdateSpanType) => {
    if(value > 1) {
        return (<Dropdown fluid value={streakUpdateSpanType} selection
                          options={[{
                              key: "hours",
                              text: "Hours",
                              value: "hourly",
                          }, {
                              key: "days",
                              text: "Days",
                              value: "daily"
                          }, {
                              key: "weeks",
                              text: "Weeks",
                              value: "weekly"
                          }, {
                              key: "months",
                              text: "Months",
                              value: "monthly"
                          }, {
                              key: "years",
                              text: "Years",
                              value: "yearly"
                          }]}
                          onChange={(e, data) => {
                              setStreakUpdateSpanType(data.value)
                          }}/>);
    }
    else {
        return (<Dropdown fluid value={streakUpdateSpanType} selection
                          options={[{
                              key: "hour",
                              text: "Hour",
                              value: "hourly",
                          }, {
                              key: "day",
                              text: "Day",
                              value: "daily"
                          }, {
                              key: "week",
                              text: "Week",
                              value: "weekly"
                          }, {
                              key: "month",
                              text: "Month",
                              value: "monthly"
                          }, {
                              key: "year",
                              text: "Year",
                              value: "yearly"
                          }]}
                          onChange={(e, data) => {
                              setStreakUpdateSpanType(data.value)
                          }}/>);
    }
}
*/
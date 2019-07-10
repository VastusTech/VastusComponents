import React, {useState} from 'react'
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
import {getNowTimeString} from "../../logic/TimeHelper";
import {addToUserAttribute} from "../../redux/actions/userActions";
import {clearItemQueryCache} from "../../redux/actions/cacheActions";
import {Storage} from 'aws-amplify';
import {err} from "../../../Constants";
import DealFunctions from "../../database_functions/DealFunctions";

/**
 * Handles the actual creation of the Deal given the inputted info from the User.
 *
 * @param {string} userID The ID of the User creating the Deal.
 * @param {string} sponsor The ID of the Sponsor to own the Deal.
 * @param {string} productName The name of the product to display.
 * @param {number} productCreditPrice The price in credits to buy a single quantity of the Deal.
 * @param {number|null} quantity The number of available Products to sell for the Deal. Null if indefinite.
 * @param {string|null} description The description of how to use the Deal's Product.
 * @param {*|null} productImage The image to display to represent the Product.
 * @param {[*]|null} productImages The images to display in the gallery for the Product.
 * @param {string} validUntil The ISO string for when the Deal expires.
 * @param {string|null} productStoreLink The URL for where someone can buy the Product for full price.
 * @param {function(boolean)} setIsLoading Sets the loading state.
 * @param {function(error)} setError Sets the error state.
 * @param {function(true)} setShowSuccessModal Sets the showing of success modal state.
 * @param {{}} props The props of the component that hold the redux automatic updating functions.
 */
const handleSubmit = (userID, sponsor, productName, productCreditPrice, quantity, description, productImage,
                      productImages, validUntil, productStoreLink, setIsLoading, setError, setShowSuccessModal, props) => {
  if (userID && sponsor && productName && productCreditPrice) {
    const productImagePath = productImage ? "productImage" : null;
    if (quantity == null || Number.isInteger(+quantity)) {
      DealFunctions.createDealOptional(userID, sponsor, productName, productCreditPrice, quantity, description,
        productImage, productImagePath, productImages, validUntil, productStoreLink,() => {
          console.log("Successfully created a Deal!");
          setIsLoading(false);
          setShowSuccessModal(true);
        }, (error) => {
          setIsLoading(false);
          setError("*" + JSON.stringify(error))
        }, props);
    } else {
      setIsLoading(false);
      setError("Quantity needs to be an integer!");
    }
  } else {
    setIsLoading(false);
    setError("All fields need to be filled out!");
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
        You just created a new Deal!
      </p>
    </Message>);
  } else {
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
  if (error !== "") {
    return (<Message negative>
      <Message.Header>Sorry!</Message.Header>
      <p>{error}</p>
    </Message>);
  }
};

const setPictureURL = (event, userID, setTempPictures, setPrize, prizes) => {
  let index = prizes.length;
  prizes.push(event.target.files[0]);
  alert("Just Pushed: " + prizes[0]);
  const path = "/" + userID + "/temp/pictures/" + index;
  Storage.put(path, event.target.files[0], {contentType: "video/*;image/*"})
    .then(() => {
      Storage.get(path).then((url) => {
        setTempPictures(url);
      }).catch((error) => {
        err && console.error(error);
      })
    }).catch((error) => {
    err && console.error(error);
  });
};

const displayCurrentImage = (picture) => {
  if (picture) {
    //console.log("Running cur image");
    return (
      <Image src={picture}/>
    );
  }
  return null;
};

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
  const [prize, setPrize] = useState([]);
  const [restriction, setRestriction] = useState(null);
  const [access, setAccess] = useState("public");
  const [showSuccessLabel, setShowSuccessLabel] = useState(false);
  const [challengeType, setChallengeType] = useState("streak");
  const [streakUpdateSpanType, setStreakUpdateSpanType] = useState(null);
  const [streakUpdateInterval, setStreakUpdateInterval] = useState(null);
  const [streakN, setStreakN] = useState(null);
  const [tempPictures, setTempPictures] = useState(null);

  function setPicture(image) {
    setPictureURL(image, props.user.id, setTempPictures, setPrize, prize);
    alert("Image URL: " + image);
  }

  function getLatestPrizePic() {
    const pictures = {};
    for (let i = 0; i < this.state.pictures.length; i++) {
      pictures["pictures/" + i] = prize[i];
    }
    if (this.state.pictures.length > 0) {
      return [pictures[pictures.length - 1]];
    }
    return null;
  }

  return (
    <div align='center'>
      <Form onSubmit={() => handleSubmit(props.user.id, endTime, capacity, title, goal, tagsPressed,
        access, restriction, prize[0], challengeType, streakUpdateSpanType, streakUpdateInterval, streakN,
        setIsLoading, setError, setShowSuccessLabel)}>
        <Header as='h3'>
          <Form.Input fluid type="text" name="title" placeholder={props.user.name + "\'s Challenge"}
                      onChange={value => setTitle(value.target.value)}/>
        </Header>
        <div align='center'>
          <Grid align='center'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Button color={tagsPressed.HIIT ? "purple" : "black"} inverted={tagsPressed.HIIT}
                        basic={!tagsPressed.HIIT}>
                  <Image size='medium' src={require('../../img/vastus-tech-icons-03.svg')}
                         onClick={() => setTagsPressed(p => ({...p, HIIT: !p.HIIT}))}/>
                  <div style={{color: 'white'}}>HIIT</div>
                </Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button color={tagsPressed.Strength ? "purple" : "black"} inverted={tagsPressed.Strength}
                        basic={!tagsPressed.Strength}>
                  <Image size='medium' src={require('../../img/vastus-tech-icons-04.svg')}
                         onClick={() => setTagsPressed(p => ({...p, Strength: !p.Strength}))}/>
                  <div style={{color: 'white'}}>Strength</div>
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Button color={tagsPressed.Performance ? "purple" : "black"} inverted={tagsPressed.Performance}
                        basic={!tagsPressed.Performance}>
                  <Image size='medium' src={require('../../img/vastus-tech-icons-02.svg')}
                         onClick={() => setTagsPressed(p => ({...p, Performance: !p.Performance}))}/>
                  <div style={{color: 'white'}}>Performance</div>
                </Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button color={tagsPressed.Endurance ? "purple" : "black"} inverted={tagsPressed.Endurance}
                        basic={!tagsPressed.Endurance}>
                  <Image size='medium' src={require('../../img/vastus-tech-icons-01.svg')}
                         onClick={() => setTagsPressed(p => ({...p, Endurance: !p.Endurance}))}/>
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
                <Icon name='camera' size="large" style={{marginLeft: '8px'}}/>
                <input type="file" accept="image/*;video/*;capture=camcorder" id="picUpload" hidden='true'
                       onChange={e => setPicture(e)}/>
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
                    <input type="datetime-local" name="challengeDate" onChange={value => {
                      setEndTime(value.target.value);
                    }}/>
                  </div>
                  <Form.Input fluid type="text" name="goal" placeholder="Challenge Goal..."
                              onChange={value => setGoal(value.target.value)}/>
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
                              label={access}/>
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

import React, {Component, useState} from 'react';
import {Grid, Icon, Button, Image, Header} from 'semantic-ui-react';
import ReactSwipe from 'react-swipe';
import ClientFunctions from "../../database_functions/ClientFunctions";
import _ from "lodash";
import {connect} from 'react-redux';
import {forceFetchUserAttributes} from "../../../redux_helpers/actions/userActions";
import UserFunctions from "../../database_functions/UserFunctions";

type Props = {
    userID?: string,
    profileImage: any,
    profileImages: [any],
    editable: boolean
};

const setGalleryPicture = (userID, event, pos, setIsLoading) => {
    // console.log("This is calling set gallery picture");
    // console.log(this.state.galleryNum);
    // alert(this.state.reactSwipeElement.getPos());
    const image = event.target.files[0];
    setIsLoading(true);
    if (pos === 0) {
        const path = "ClientFiles/" + userID + "/galleryImages" + pos;
        UserFunctions.addProfileImage(userID, userID, image, path, (data) => {
            // this.props.forceFetchUserAttributes(["profileImagePaths"]);
            setIsLoading(false);
        }, (error) => {
            //console.log("Failed edit client attribute");
            //console.log(JSON.stringify(error));
            setIsLoading(false);
        });
    }
    else {
        const path = "ClientFiles/" + userID + "/profileImage";
        UserFunctions.updateProfileImage(userID, userID, image, path, (data) => {
            setIsLoading(false);
        }, (error) => {
            setIsLoading(false);
        });
    }
};

const getImageComponents = (userID, profileImage, profileImages, editable, pos, setIsLoading) => {
    if (profileImage) {
        let profileImagesLength = 0;
        if (profileImages) {
            profileImagesLength = profileImages.length;
        }
        return _.times(profileImagesLength + 1, i => (
            <div>
                <Image src={i === 0 ? profileImage : profileImages[i - 1]} style={{
                    height: '300px',
                    width: '300px',
                    margin: 'auto', marginTop: "10px"
                }}/>
                {
                    editable&&(
                    <Grid centered>
                        <Button primary as="label" htmlFor="galleryUpload" circular className="u-bg--primaryGradient"
                                style={{marginTop: "20px", marginBottom: "20px"}}>
                            Change Picture
                        </Button>
                        <input type="file" accept="image/*" id="galleryUpload" hidden={true}
                               onChange={(event) => setGalleryPicture(userID, event, pos, setIsLoading)}/>
                    </Grid>
                    )
                }
            </div>
        ));
    }
    else {
        return (
            <Header> No gallery images yet! </Header>
        );
    }
};

const ProfileImageGallery = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [reactSwipeElement, setReactSwipeElement] = useState(null);

    return (
        <div>
            <Grid centered>
                <Grid.Column width={1} style={{marginRight: "10px"}} onClick={() => reactSwipeElement&&reactSwipeElement.prev()}>
                    <Icon size='large' name="caret left" style={{marginTop: "150px"}}/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <ReactSwipe
                        className="carousel"
                        swipeOptions={{continuous: false}}
                        ref={el => setReactSwipeElement(el)}
                    >
                        {getImageComponents(props.userID, props.profileImage, props.profileImages,
                        props.editable, reactSwipeElement ? reactSwipeElement.getPos() : null, setIsLoading)}
                        {props.editable&&(
                        <div style={{width: "50px"}} align="center">
                            <Button primary as="label" htmlFor="galleryUpload" circular
                                    className="u-bg--primaryGradient"
                                    style={{marginTop: "140px", marginBottom: "140px"}}>
                                <Icon name='plus'/> Add New Picture
                            </Button>
                            <input type="file" accept="image/*" id="galleryUpload" hidden={true}
                                   onChange={(event) => setGalleryPicture(props.userID, event,
                                       reactSwipeElement ? reactSwipeElement.getPos() : null, setIsLoading)}/>
                        </div>
                        )}
                    </ReactSwipe>
                </Grid.Column>
                <Grid.Column width={1} style={{marginRight: "10px", marginLeft: "-10px"}}
                             onClick={() => reactSwipeElement&&reactSwipeElement.next()}>
                    <Icon size='large' name="caret right" style={{marginTop: "150px"}}/>
                </Grid.Column>
            </Grid>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => {
    return {
        forceFetchUserAttributes: (variableList, dataHandler) => {
            dispatch(forceFetchUserAttributes(variableList, dataHandler));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImageGallery);
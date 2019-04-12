import React, {useEffect, useState} from 'react';
import {Grid, Icon, Button, Image, Header, Modal} from 'semantic-ui-react';
import ReactSwipe from 'react-swipe';
import _ from "lodash";
import {connect} from 'react-redux';
// import {forceFetchUserAttributes} from "../../../redux_helpers/actions/userActions";
import UserFunctions from "../../database_functions/UserFunctions";
import UploadImage from "../manager/UploadImage";
import {
    removeFromItemAttributeAtIndex,
    setItemAttribute,
    setItemAttributeIndex
} from "../../redux/actions/cacheActions";

type Props = {
    userID?: string,
    profileImage: any,
    profileImages: [any],
    profileImagePaths: [string],
    editable: boolean
};

/**
 *
 * @param userID {string}
 * @return {string}
 */
const getProfileImageS3Name = (userID) => {
    return "ClientFiles/" + userID + "/profileImage";
};
const getGalleryImageS3Name = (userID, pos) => {
    return "ClientFiles/" + userID + "/galleryImages/" + pos;
};

const setGalleryPicture = (userID, image, displayImage, pos, profileImagePaths, setItemAttribute, setItemAttributeIndex, setIsLoading) => {
    // console.log("This is calling set gallery picture");
    // console.log(this.state.galleryNum);
    // alert(this.state.reactSwipeElement.getPos());
    setIsLoading(true);
    if (pos !== 0) {
        let path = getGalleryImageS3Name(userID, );
        // for length 2, 2 is inside, 3 is outside
        // for length 0, 1 is outside
        if (pos <= profileImagePaths ? profileImagePaths.length : 0) {
            path = profileImagePaths[pos - 1];
        }
        else {
            // Keep checking to see that the new path added is going to be larger than the last path
            let profilePosID = pos;
            path = getGalleryImageS3Name(userID, profilePosID);
            while (profileImagePaths && path <= profileImagePaths[profileImagePaths.length - 1]) {
                path = getGalleryImageS3Name(userID, profilePosID);
                profilePosID++;
            }
        }
        UserFunctions.addProfileImage(userID, userID, image, path, (data) => {
            setItemAttributeIndex(userID, "profileImages", pos - 1, displayImage);
            setItemAttributeIndex(userID, "profileImagePaths", path, displayImage);
            setIsLoading(false);
        }, (error) => {
            setIsLoading(false);
        });
    }
    else {
        const path = getProfileImageS3Name(userID);
        UserFunctions.updateProfileImage(userID, userID, image, path, (data) => {
            setItemAttribute(userID, "profileImage", displayImage);
            setItemAttribute(userID, "profileImagePath", path);
            setIsLoading(false);
        }, (error) => {
            setIsLoading(false);
        });
    }
};

const removeGalleryPicture = (userID, pos, profileImagePaths, setItemAttribute, removeItemAttributeIndex, setIsLoading) => {
    setIsLoading(true);
    if (pos === 0) {
        // Main profile image
        UserFunctions.updateProfileImage(userID, userID, null, null, () => {
            setItemAttribute(userID, "profileImage", require('../../img/roundProfile.png'));
            setItemAttribute(userID, "profileImagePath", null);
            setIsLoading(false);
        }, (error) => {
            setIsLoading(false);
        });
    }
    else {
        // Gallery Image
        UserFunctions.removeProfileImage(userID, userID, profileImagePaths[pos - 1], () => {
            removeItemAttributeIndex(userID, "profileImages", pos - 1);
            removeItemAttributeIndex(userID, "profileImagePaths", pos - 1);
            setIsLoading(false);
        }, (error) => {
            setIsLoading(false);
        });
    }
};

const getImageComponents = (userID, profileImage, profileImagePaths, profileImages, editable, swipeRef,
                            setUploadModalOpen, setTempImageInfo, setItemAttribute, removeItemAttributeIndex, setIsLoading) => {
    if (profileImage) {
        let profileImagesLength = 0;
        if (profileImages) {
            profileImagesLength = profileImages.length;
        }
        return _.times(profileImagesLength + 1, i => (
            <div key={i}>
                <Image src={i === 0 ? profileImage : profileImages[i - 1]} style={{
                    height: '300px',
                    width: '300px',
                    margin: 'auto', marginTop: "10px"
                }}/>
                {
                    editable&&swipeRef&&(
                    <Grid columns={2} centered>
                        <Grid.Column>
                            <Button primary as="label" htmlFor="galleryUpload" circular className="u-bg--primaryGradient"
                                    style={{marginTop: "20px", marginBottom: "20px"}}>
                                {i === 0 ? "Change Main Profile Image" : "Change Gallery Image"}
                            </Button>
                            <input type="file" accept="image/*" id="galleryUpload" hidden={true}
                                   onChange={(event) => {setTempImageInfo({
                                       pos: swipeRef.getPos(),
                                       image: event.target.files[0]
                                   });
                                   setUploadModalOpen(true)}}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Button primary as="label" circular className="u-bg--primaryGradient"
                                    onClick={() => removeGalleryPicture(userID, swipeRef.getPos(), profileImagePaths, setItemAttribute, removeItemAttributeIndex, setIsLoading)}
                                    style={{marginTop: "20px", marginBottom: "20px"}}>
                            {i === 0 ? "Remove Profile Image" : "Remove Gallery Image"}</Button>
                        </Grid.Column>
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
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [tempImageInfo, setTempImageInfo] = useState(null);
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
                        {getImageComponents(props.userID, props.profileImage, props.profileImagePaths,
                            props.profileImages, props.editable, reactSwipeElement, setUploadModalOpen,
                            setTempImageInfo, props.setItemAttribute, props.removeItemAttributeIndex, setIsLoading)}
                        {props.editable&&(
                        <div style={{width: "50px"}} align="center">
                            <Button primary as="label" htmlFor="galleryUpload" circular
                                    className="u-bg--primaryGradient"
                                    style={{marginTop: "140px", marginBottom: "140px"}}>
                                <Icon name='plus'/> Add New Picture
                            </Button>
                            <input type="file" accept="image/*" id="galleryUpload" hidden={true}
                                   onChange={(event) => {setTempImageInfo({
                                       pos: reactSwipeElement.getPos(),
                                       image: event.target.files[0]
                                   });
                                   setUploadModalOpen(true)}}/>
                        </div>
                        )}
                    </ReactSwipe>
                    <Modal open={uploadModalOpen} onClose={() => {}}>
                        <UploadImage imageURL={tempImageInfo ? tempImageInfo.image : null}
                                     callback={(picture) => {setGalleryPicture(props.userID, picture, URL.createObjectURL(picture),
                                         tempImageInfo.pos, props.profileImagePaths, props.setItemAttribute, props.setItemAttributeIndex,
                                         setIsLoading); setUploadModalOpen(false); setTempImageInfo(null)}}/>
                    </Modal>
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
        setItemAttribute: (id, attributeName, attributeValue) => {
            dispatch(setItemAttribute(id, attributeName, attributeValue));
        },
        setItemAttributeIndex: (id, attributeName, index, attributeValue) => {
            dispatch(setItemAttributeIndex(id, attributeName, index, attributeValue));
        },
        removeItemAttributeIndex: (id, attributeName, index) => {
            dispatch(removeFromItemAttributeAtIndex(id, attributeName, index));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImageGallery);
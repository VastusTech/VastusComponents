import React, {useState} from 'react';
import {connect} from "react-redux";
import {Label, Modal, Icon, Dimmer} from "semantic-ui-react";
import UploadImage from "../manager/UploadImage";
import Spinner from "./Spinner";
import ClientFunctions from "../../database_functions/UserFunctions";
import ProfileImageGallery from "./ProfileImageGallery";
import {setItemAttribute} from "../../redux/actions/cacheActions";

type Props = {
    userID: string,
    profileImage: any,
    profileImages: [any],
    profileImagePaths: [string],
    editable: boolean
};

/**
 * Uploads the profile picture to update the main profile image of the User.
 *
 * @param {*} picture The picture to upload as the new profile image.
 * @param {string} userID The ID of the User for the profile image.
 * @param {*} displayPicture The picture to use to display when we manually update the object in the database.
 * @param {function(string, string, *)} setItemAttribute Function to manually update the item attribute.
 */
const uploadProfilePicture = (picture, userID, displayPicture, setItemAttribute) => {
    if (picture && userID) {
        const path = "ClientFiles/" + userID + "/profileImage";
        ClientFunctions.updateProfileImage(userID, userID, picture, path,
            (data) => {
                // this.props.forceFetchUserAttributes(["profileImagePath"]);
                setItemAttribute(userID, "profileImage", displayPicture);
                setItemAttribute(userID, "profileImagePath", path);
            }, (error) => {
                console.log("Failed edit client attribute");
                console.log(JSON.stringify(error));
            });
    }
};

/**
 * The Profile Image component displays a preview of the User's main profile image and opens a modal that shows the rest
 * of the User's profile image gallery when it is clicked on. Also allows the profile image to be editable directly.
 *
 * @param props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const ProfileImage = (props: Props) => {
    const [galleryModalOpen, setGalleryModalOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [tempProfilePicture, setTempProfilePicture] = useState(null);
    if (props.profileImage) {
        return (
            <div>
                <div onClick={() => setGalleryModalOpen(true)} className="u-avatar u-avatar--large u-margin-x--auto u-margin-top--neg4" style={{backgroundImage: `url(${props.profileImage})`}}/>
                <Modal closeIcon basic size='big' open={galleryModalOpen} onClose={() => setGalleryModalOpen(false)}>
                    <ProfileImageGallery userID={props.userID}
                                         profileImage={props.profileImage}
                                         profileImages={props.profileImages}
                                         profileImagePaths={props.profileImagePaths}
                                         editable={props.editable}/>
                </Modal>
                {props.editable&&[
                    <Label key={0} as="label" htmlFor="proPicUpload" circular className="u-bg--primaryGradient">
                        <Icon name="upload" className='u-margin-right--0' size="large" inverted />
                    </Label>,
                    <input key={1} type="file" accept="image/*" id="proPicUpload" hidden={true}
                           onChange={(event) => {setTempProfilePicture(event.target.files[0]);setUploadModalOpen(true)}}/>,
                    <Modal key={2} basic size='mini' open={uploadModalOpen} onClose={() => {}}>
                        <UploadImage imageURL={tempProfilePicture} callback={(picture) => {uploadProfilePicture(picture, props.userID, URL.createObjectURL(picture), props.setItemAttribute);setUploadModalOpen(false);}}/>
                    </Modal>]
                }
            </div>
        );
    }
    else {
        return(
            <Dimmer inverted>
                <Spinner loading={true}/>
            </Dimmer>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setItemAttribute: (id, attributeName, attributeValue) => {
            dispatch(setItemAttribute(id, attributeName, attributeValue))
        }
    }
};

export default connect(null, mapDispatchToProps)(ProfileImage);
import React, {useState} from 'react';
import {Button, Icon} from "semantic-ui-react";
import AvatarEditor from "react-avatar-editor";

type Props = {
    imageURL: string,
    callback: (any) => void
};

/**
 * Handles the save button after the image has been edited by the react-avatar-editor library.
 *
 * @callback
 * @param {{getImageScaledToCanvas: function()}} editor The editor library that holds the edited image.
 * @param {function(*)} callback The call-back function for returning the final image.
 */
const onClickSave = (editor, callback) => {
    if (editor) {
        const dataURI = editor.getImageScaledToCanvas().toDataURL("image/jpeg");
        const binary = atob(dataURI.split(',')[1]);
        const array = [];
        for(let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        callback(new Blob([new Uint8Array(array)], {type: 'image/jpeg'}));
    }
};

/**
 * Allows the User to edit an image before uploading it. Also converts the image to a JPEG compressed file to save space
 * and time. TODO Maybe we want better quality images?
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const UploadImage = (props: Props) => {
    const [rotation, setRotation] = useState(0);
    const [editorRef, setEditorRef] = useState(null);
    return (
        <div>
            <AvatarEditor
                ref={setEditorRef}
                image={props.imageURL}
                width={250}
                height={250}
                border={50}
                rotate={rotation}
                scale={1.2}
            />
            <Button primary onClick={() => setRotation(p => (p + 90) % 360)}>
                <Icon name="arrow alternate circle right"/>
            </Button>
            <Button primary onClick={() => onClickSave(editorRef, props.callback)}>Upload</Button>
            <Button onClick={() => props.callback(null)}>Cancel</Button>
        </div>
    );
};

export default UploadImage;
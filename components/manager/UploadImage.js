import React, {useState} from 'react';
import {Button, Icon} from "semantic-ui-react";
import AvatarEditor from "react-avatar-editor";

type Props = {
    imageURL: string,
    callback: (any) => void
};

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
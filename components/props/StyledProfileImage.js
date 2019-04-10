import React from 'react';

type Props = {
    profileImage: any,
    type: string
};

const switchImageType = (image, type) => {
    switch (type) {
        case "Small":
            return <div className="u-avatar u-avatar--small" style={{backgroundImage: `url(${image})`}}/>;
        case "LargeCenter":
            return <div className="u-avatar u-avatar--large u-margin-bottom--neg2 u-margin-x--auto" style={{backgroundImage: `url(${image})`}}/>
        default:
            return <div className="u-avatar u-avatar--small" style={{backgroundImage: `url(${image})`}}/>;
    }
};

const StyledProfileImage = (props: Props) => switchImageType(props.profileImage, props.type);

export default StyledProfileImage;
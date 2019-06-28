import React from 'react';

type Props = {
  profileImage: any,
  type: string
};

/**
 * Creates the image based on the image and the type passed in as a prop.
 *
 * @param {*} image The image to display.
 * @param {string} type The
 * @return {*}
 */
const switchImageType = (image, type) => {
  switch (type) {
    case "Small":
      return <div className="u-avatar u-avatar--small" style={{backgroundImage: `url(${image})`}}/>;
    case "LargeCenter":
      return <div className="u-avatar u-avatar--large u-margin-bottom--neg2 u-margin-x--auto"
                  style={{backgroundImage: `url(${image})`}}/>
    default:
      return <div className="u-avatar u-avatar--small" style={{backgroundImage: `url(${image})`}}/>;
  }
};

/**
 * A styled profile image to switch through various ways of displaying and laying out a profile image.
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const StyledProfileImage = (props: Props) => switchImageType(props.profileImage, props.type);

export default StyledProfileImage;
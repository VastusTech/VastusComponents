import React from 'react';
import {Label, Grid, Button} from 'semantic-ui-react'
import {Player} from "video-react";
import Breakpoint from "react-socks";

type Props = {
  userID: string,
  message: {
    from: string,
    name: string,
    message: string,
    type: string,
    messageURL: string,
    profilePicture: any
  }
};

/**
 * Component for displaying a single Message inside of a Message board. Styled like a normal text message looks like.
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
export default (props: Props) => {
  if (!props.message) {
    return null;
  }
  const from = props.message.from;
  const name = props.message.name;
  const message = props.message.message;
  const messageURL = props.message.messageURL;
  const profilePicture = props.message.profilePicture;
  const type = props.message.type;
  const ifSelf = from === props.userID;
  if (type) {
    // Image or video message
    if (type === "picture") {
      if (ifSelf) {
        // Self picture
        return (
          <div>
            <div>
              <Button labelPosition='right' floated='right'>
                <Label className='ui right fluid' pointing='right' color='purple'>
                  <div className="u-avatar u-avatar--large u-margin-x--auto u-margin-top--neg4"
                       style={{backgroundImage: `url(${messageURL})`}}>
                  </div>
                </Label>
              </Button>
            </div>
            <br/><br/><br/></div>
        );
      } else {
        // Other picture
        return (
          <Grid class="ui computer vertically reversed equal width grid">
            <Grid.Column width={2}>
              <div align="center" className="ui u-avatar tiny"
                   style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}/>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <strong>{name}</strong>
              </Grid.Row>
              <Grid.Row>
                <Label className='ui left fluid' pointing='left'>
                  <div className="u-avatar u-avatar--large u-margin-x--auto u-margin-top--neg4"
                       style={{backgroundImage: `url(${messageURL})`}}>
                  </div>
                </Label>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        );
      }
    } else if (type === "video") {
      if (ifSelf) {
        // Self video
        return (
          <div>
            <div>
              <Button labelPosition='right' floated='right'>
                <Label className='ui right fluid' pointing='right' color='purple'>
                  <Player>
                    <source src={messageURL} type="video/mp4"/>
                  </Player>
                </Label>
              </Button>
            </div>
            <br/><br/><br/></div>
        );
      } else {
        // Other video
        return (
          <Grid class="ui computer vertically reversed equal width grid">
            <Grid.Column width={6}>
              <div align="center" className="ui u-avatar tiny"
                   style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}/>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <strong>{name}</strong>
              </Grid.Row>
              <Grid.Row>
                <Label className='ui left fluid' pointing='left'>
                  <Player>
                    <source src={messageURL} type="video/mp4"/>
                  </Player>
                </Label>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        );
      }
    } else {
      alert("Unrecognized message type = " + type);
    }
  } else {
    // Normal message
    if (ifSelf) {
      // Self text
      return (
        <div>
          <div>
            <Button labelPosition='right' floated='right'>
              <Label pointing='right' size='large' color='purple'>
                {message}
              </Label>
            </Button>
          </div>
          <br/><br/><br/></div>
      );
    } else {
      // Other text
      return (
        <div>
          <Breakpoint medium up>
            <Grid columns={2}>
              <Grid.Column width={1}>
                <div className="ui u-avatar mini"
                     style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}/>
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <strong>{name}</strong>
                </Grid.Row>
                <Grid.Row>
                  <Label pointing='left' size='large'>
                    {message}
                  </Label>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Breakpoint>


          <Breakpoint small down>
            <Grid columns={2}>
              <Grid.Column width={3} style={{marginRight: '10px'}}>
                <div className="ui u-avatar mini"
                     style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}/>
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <strong>{name}</strong>
                </Grid.Row>
                <Grid.Row>
                  <Label pointing='left' size='large' color='white'>
                    {message}
                  </Label>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Breakpoint>
          <br/><br/>
        </div>
      );
    }
  }
}

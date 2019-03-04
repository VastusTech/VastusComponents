 import React, { Component } from 'react';
import { Label, Grid, Icon, Container, Divider, Message } from 'semantic-ui-react'
import {Player} from "video-react";

export default (props: {message: any, userID: string}) => {
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
                    <Grid class="ui computer vertically reversed equal width grid" celled>
                        <Label className='ui right fluid' pointing='right' color='purple'>
                            <div className="u-avatar u-avatar--large u-margin-x--auto u-margin-top--neg4"
                                 style={{backgroundImage: `url(${messageURL})`}}>
                                {/*<Label as="label" htmlFor="proPicUpload" circular className="u-bg--primaryGradient">*/}
                                    {/*<Icon name="upload" className='u-margin-right--0' size="large" inverted/>*/}
                                {/*</Label>*/}
                                {/*<input type="file" accept="video/*;capture=camcorder" id="proPicUpload" hidden={true}*/}
                                       {/*onChange={this.setPicture}/>*/}
                            </div>
                        </Label>
                        <Grid.Column width={6} style={{rightMargin: '5px', leftMargin: '5px'}}>
                            <div avatar align="center" className="ui u-avatar tiny" style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}></div>
                        </Grid.Column>
                    </Grid>
                );
            }
            else {
                // Other picture
                return (
                    <Grid class="ui computer vertically reversed equal width grid" celled>
                        <Grid.Column width={6}>
                            <div avatar align="center" className="ui u-avatar tiny" style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}></div>
                        </Grid.Column>
                        <Label className='ui left fluid' pointing='left'>
                            <div className="u-avatar u-avatar--large u-margin-x--auto u-margin-top--neg4"
                                 style={{backgroundImage: `url(${messageURL})`}}>
                                {/*<Label as="label" htmlFor="proPicUpload" circular className="u-bg--primaryGradient">*/}
                                    {/*<Icon name="upload" className='u-margin-right--0' size="large" inverted/>*/}
                                {/*</Label>*/}
                                {/*<input type="file" accept="video/*;capture=camcorder" id="proPicUpload" hidden={true}*/}
                                       {/*onChange={this.setPicture}/>*/}
                            </div>
                        </Label>
                    </Grid>
                );
            }
        }
        else if (type === "video") {
            if (ifSelf) {
                // Self video
                return (
                    <Grid class="ui computer vertically reversed equal width grid" celled>
                        <Label className='ui right fluid' pointing='right' color='purple'>
                            <Player>
                                <source src={messageURL} type="video/mp4"/>
                            </Player>
                        </Label>
                        <Grid.Column width={6}>
                            <div avatar align="center" className="ui u-avatar tiny" style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}></div>
                        </Grid.Column>
                    </Grid>
                );
            }
            else {
                // Other video
                return (
                    <Grid class="ui computer vertically reversed equal width grid" celled>
                        <Grid.Column width={6}>
                            <div avatar align="center" className="ui u-avatar tiny" style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}></div>
                        </Grid.Column>
                        <Label className='ui left fluid' pointing='left'>
                            <Player>
                                <source src={messageURL} type="video/mp4"/>
                            </Player>
                        </Label>
                    </Grid>
                );
            }
        }
        else {
            alert("Unrecognized message type = " + type);
        }
    }
    else {
        // Normal message
        if (ifSelf) {
            // Self text
            return (
            <Grid celled>
                {/*<Grid>
                    <Grid.Column floated='right' width={10}>
                        <div>
                            <Label pointing='right' size='large' color='purple'>
                                <Grid>
                                    <Grid.Row centered>
                                        <b>{name}</b>
                                    </Grid.Row>
                                    <Grid.Row centered>
                                        <Container size='mini' color='purple'>
                                        {message}
                                        </Container>
                                    </Grid.Row>
                                </Grid>
                            </Label>
                        </div>
                    <Grid.Column floated='right' width={1}>
                        <div avatar align="center" className="ui u-avatar tiny" style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}></div>
                    </Grid.Column>
                </Grid>*/}
                <Grid.Column floated='right' width={10}>
                    <Grid floated='right'>
                        <Grid.Column style={{width: '70%'}}>
                            <Grid.Row centered>
                                <strong>{name}</strong>
                            </Grid.Row>
                            <div>
                                <Label pointing='right' size='large' color='purple'>
                                    {message}
                                </Label>
                            </div>
                        </Grid.Column>
                        <Grid.Column style={{width: '10%'}}>
                            <div avatar className="ui u-avatar mini" style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}></div>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
        );
        }
        else {
            // Other text
            return (
                <Grid celled>
                {/*<Grid style={{marginLeft: '10px'}}>
                    <Grid.Column floated='left' width={1}>
                        <div avatar align="center" className="ui u-avatar tiny" style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}></div>
                    </Grid.Column>
                    <Grid.Column floated='left' width={10}>
                        <div>
                            <Label pointing='left' size='large'>
                                <Grid>
                                    <Grid.Row centered>
                                        {name}
                                    </Grid.Row>
                                    <Grid.Row centered>
                                        {message}
                                    </Grid.Row>
                                </Grid>
                            </Label>
                        </div>
                    </Grid.Column>
                </Grid>*/}
                    <Grid.Column floated='left' width={10}>
                        <Grid floated='left'>
                            <Grid.Column style={{width: '30%'}}>
                                <div avatar className="ui u-avatar mini" style={{backgroundImage: `url(${profilePicture})`, width: '50px', height: '50px'}}></div>
                            </Grid.Column>
                            <Grid.Column style={{width: '70%'}} floated='right'>
                                <Grid.Row centered>
                                    <strong>{name}</strong>
                                </Grid.Row>
                                <div>
                                    <Label pointing='left' size='large' color='white'>
                                        {message}
                                    </Label>
                                </div>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                </Grid>

        );
        }
    }
}

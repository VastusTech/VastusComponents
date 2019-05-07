import React, {Component, Fragment} from 'react'
import {Grid, Button, Message, Image, Card, Icon, Form, Container, Header} from 'semantic-ui-react';
import { Storage } from 'aws-amplify';
import {connect} from "react-redux";
import {setError} from "../../redux/actions/infoActions";
import {
    fetchPost,
} from "../../redux/convenience/cacheItemTypeActions";
import PostFunctions from "../../database_functions/PostFunctions";
import {Player} from "video-react";
import {err, log} from "../../../Constants";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

// TODO UHHH THIS SHOULD BE HOOKS FOR SURE
// TODO Also documentation is clearly stolen...
// TODO Rewrite based on new Design and refactor

/*
* Create Event Prop
*
* This is the modal for creating events. Every input is in the form of a normal text input.
* Inputting the time and date utilizes the Semantic-ui Calendar React library which isn't vanilla Semantic.
 */
class CreatePostProp extends Component {
    state = {
        checked: false,
        checkedRest: false,
        isSubmitLoading: false,
        showModal: false,
        submitError: "",
        showSuccessModal: false,
        showSuccessLabel: false,
        showSuccessLabelTimer: 0,
        description: "",
        title: "",
        access: "public",
        picturesLoading: false,
        videosLoading: false,
        pictures: [],
        videos: [],
        tempPictureURLs: [],
        tempVideoURLs: [],

    };

    constructor(props) {
        super(props);
        this.changeStateText = this.changeStateText.bind(this);
    }

    toggle = () => this.setState({ checked: !this.state.checked });
    toggleRest = () => this.setState({ checkedRest: !this.state.checkedRest });

    changeStateText(value) {
        // TODO Sanitize this input
        // TODO Check to see if this will, in fact, work.!
        this.setState({ description: value });
        log&&console.log(value);
    }

    handleAccessSwitch = () => {
        if(this.state.access === 'public') {
            this.setState({access: 'private'});
        }
        else if (this.state.access === 'private') {
            this.setState({access: 'public'});
        }
        else {
            err&&console.error("Event access should be public or private");
        }
    };

    getLatestPicture() {
        const pictures = {};
        for (let i = 0; i < this.state.pictures.length; i++) {
            pictures["pictures/" + i] = this.state.pictures[i];
        }
        if (this.state.pictures.length > 0) {
            return [pictures[pictures.length - 1]];
        }
        return null;
    }

    getVideos() {
        const videos = {};
        for (let i = 0; i < this.state.videos.length; i++) {
            videos["videos/" + i] = this.state.videos[i];
        }
        if (this.state.videos.length > 0) {
            return videos;
        }
        return null;
    }

    setVideo = (event) => {
        const index = this.state.videos.length;
        this.state.videos.push(event.target.files[0]);
        const path = "/" + this.props.user.id + "/temp/videos/" + index;
        Storage.put(path, event.target.files[0], { contentType: "video/*;image/*" })
            .then(() => {
                Storage.get(path).then((url) => {
                    this.state.tempVideoURLs.push(url);
                    this.setState({});
                }).catch((error) => {
                    err&&console.error(error);
                })
            }).catch((error) => {
            err&&console.error(error);
        });
        this.setState({});
    };

    setPicture = (event) => {
        const index = this.state.pictures.length;
        this.state.pictures.push(event.target.files[0]);
        const path = "/" + this.props.user.id + "/temp/pictures/" + index;
        Storage.put(path, event.target.files[0], { contentType: "video/*;image/*" })
            .then(() => {
                Storage.get(path).then((url) => {
                    this.state.tempPictureURLs.push(url);
                    this.setState({});
                }).catch((error) => {
                    err&&console.error(error);
                })
            }).catch((error) => {
            err&&console.error(error);
        });
        this.setState({});
    };

    displaySubmission() {
        if(this.state.notifySubmission) {
            return (
                <Message positive>
                    <Message.Header>Success!</Message.Header>
                    <p>
                        You submitted a video to the challenge!
                    </p>
                </Message>
            );
        }
    }

    displayCurrentVideo() {
        if (this.state.tempVideoURLs && this.state.tempVideoURLs.length > 0) {
            //console.log("Running cur video");
            return(
                <Player>
                    <source src={this.state.tempVideoURLs[0]} type="video/mp4"/>
                </Player>
            );
        }
        return null;
    }

    displayCurrentImage() {
        if (this.state.tempPictureURLs && this.state.tempPictureURLs.length > 0) {
            //console.log("Running cur image");
            return(
                <Image src={this.state.tempPictureURLs[0]} />
            );
        }
        return null;
    }

    handleSubmit = () => {

        this.setState({isSubmitLoading: true});

        // TODO Check to see if valid inputs!
        if (this.state.description) {
            PostFunctions.createPostOptional(this.props.user.id, this.props.user.id, this.state.description, this.state.access, this.getLatestPicture(), this.getVideos(), (returnValue) => {
                console.log("Successfully Created Post!");
                console.log(JSON.stringify(returnValue));
            }, (error) => {
                err&&console.error(error);
            });
            //     PostFunctions.createPostOptional(this.props.user.id, this.props.user.id, this.state.description, this.state.access, this.getPicturePaths(), this.getVideoPaths(), (returnValue) => {
            //         console.log("Successfully Created Post!");
            //         console.log(JSON.stringify(returnValue));
            //         const id = returnValue.data;
            //         let numPicturesLoaded = 0;
            //         let picturesLength = this.state.pictures.length;
            //         for (let i = 0; i < picturesLength; i++) {
            //             const picturePath = id + "/pictures/" + i;
            //             Storage.put(picturePath, this.state.pictures[i], { contentType: "video/*;image/*" }).then((result) => {
            //                 numPicturesLoaded++;
            //                 console.log(result);
            //                 if (numPicturesLoaded >= picturesLength) {
            //                     this.setState({videosLoading: false});
            //                 }
            //             }).catch((error) => {
            //                 numPicturesLoaded++;
            //                 console.log(error);
            //                 if (numPicturesLoaded >= picturesLength) {
            //                     this.setState({videosLoading: false});
            //                 }
            //             });
            //         }
            //         let numVideosLoaded = 0;
            //         let videosLength = this.state.videos.length;
            //         for (let i = 0; i < videosLength; i++) {
            //             Storage.put(id + "/videos/" + i, this.state.videos[i], { contentType: "video/*;image/*" }).then((result) => {
            //                 numVideosLoaded++;
            //                 console.log(result);
            //                 if (numVideosLoaded >= videosLength) {
            //                     this.setState({videosLoading: false});
            //                 }
            //             }).catch((error) => {
            //                 numVideosLoaded++;
            //                 console.log(error);
            //                 if (numVideosLoaded >= videosLength) {
            //                     this.setState({videosLoading: false});
            //                 }
            //             });
            //         }
            //         // Storage.put(id + "/")
            //         this.setState({isSubmitLoading: false});
            //         this.setState({showSuccessLabel: true});
            //         this.setState({showModal: false});
            //     }, (error) => {
            //         err&&console.error(error);
            //         this.setState({submitError: "*" + JSON.stringify(error)});
            //         this.setState({isSubmitLoading: false});
            //     });
            // }
            // else {
            //     this.setState({isSubmitLoading: false, submitError: "All fields need to be filled out!"});
            // }
        }
    };

    closeModal = () => {
        this.setState({ showModal: false })
    };

    createSuccessLabel() {
        if(this.state.showSuccessLabel && this.state.showModal) {
            this.setState({showSuccessLabel: false});
        }
        else if(this.state.showSuccessLabel) {
            return (<Message positive>
                <Message.Header>Success!</Message.Header>
                <p>
                    You just created a new post!
                </p>
            </Message>);
        }
        else {
            return null;
        }
    }

    closeSuccessModal = () => {
        this.setState({showSuccessModal: false});
    };

    displayError() {
        if(this.state.submitError !== "") {
            return (<Message negative>
                <Message.Header>Sorry!</Message.Header>
                <p>{this.state.submitError}</p>
            </Message>);
        }
    }

    render() {

        return (
            <div align='center'>
                <Header align='center' style={{marginTop: '20px'}}>Write New Post</Header>
                <div align='center'>
                    <Container align='center'>
                        <Grid centered>
                            <Grid.Row>
                                <Grid.Column width={12} className="segment centered" align='center'>
                                    <Form onSubmit={this.handleSubmit}>
                                        <ReactQuill value={this.state.description}
                                                    onChange={this.changeStateText} />
                                        <div>{this.displayError()}{this.createSuccessLabel()}</div>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                    <Card color='purple' align='center'>
                        <Card.Header align='center' className="u-bg--bg">Add photo or video to post</Card.Header>
                        <div align='center' className="u-bg--bg">
                            {this.displayCurrentVideo()}
                            {this.displayCurrentImage()}
                            <Fragment align='center'>
                                <div className="uploadImage u-flex u-flex-align--center u-margin-top--2" align='center'>
                                    <Button primary fluid as="label" htmlFor="picUpload" className="u-bg--primaryGradient" style={{marginRight: '-5px'}}>
                                        <Icon name="camera" className='u-margin-right--0' inverted />
                                        Upload Photo/Video
                                    </Button>
                                    <input type="file" accept="image/*;capture=camcorder" id="picUpload" hidden={true} onChange={this.setPicture}/>
                                </div>
                            </Fragment>
                        </div>
                        <div>{this.displaySubmission()}</div>
                    </Card>
                </div>
                <Button loading={this.state.isSubmitLoading} style={{marginTop: '10px'}}
                        disabled={this.state.isSubmitLoading} primary size="big" type='button'
                        onClick={() => { this.handleSubmit()}}>Submit</Button>
                {this.createSuccessLabel()}
            </div>
        );
    }
}

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
        fetchPost: (id, variablesList) => {
            dispatch(fetchPost(id, variablesList));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostProp);

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
CreatePostProp.modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
CreatePostProp.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]
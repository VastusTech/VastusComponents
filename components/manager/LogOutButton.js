import React, {Component} from 'react';
import {Button} from "semantic-ui-react";
import {connect} from "react-redux";
import {logOut} from "../../redux/actions/authActions";

/**
 * The log out button to allow the User to sign out of their account. Handles the logic of it too.
 *
 * @param {{}} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const LogOutButton = (props) => (
    <Button circular inverted size="large" onClick={() => props.logOut()} width={5}>Log Out</Button>
);

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => { return { logOut: () => { dispatch(logOut());} } };
export default connect(mapStateToProps, mapDispatchToProps)(LogOutButton);
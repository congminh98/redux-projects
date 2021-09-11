import React from 'react';
import firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import PropTypes from 'prop-types';

// Configure FirebaseUI.
const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/photos',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //   firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // callbacks: {
    //   // Avoid redirects after sign-in.
    //   signInSuccessWithAuthResult: () => false,
    // },
};

function SignIn(props) {
    return (
        <div>
            <div className="text-center">
                <h2>Login Form</h2>
                <p>or login with social accounts</p>
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

SignIn.propTypes = {

}

export default SignIn;


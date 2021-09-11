import React, { Suspense, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMe } from 'app/userSlice';
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.scss';
import NotFound from 'components/NotFound';
import Header from 'components/Header';
import SignIn from 'features/Auth/pages/SignIn';
import ProductApi from 'api/productApi';
// firebase

// Configure Firebase.
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app(); // if already initialized, use that one
}


// lazy load - code splitting
const Photo = React.lazy(() => import('./features/Photo'));

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [productList, setProductList] = useState([]);
    const [userFirebase, setuserFirebase] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await ProductApi.getAll(params);
                console.log(response);
                setProductList(response.data);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        // fetchProductList();
    }, []);
   
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
            setIsSignedIn(!!user);
            localStorage.setItem('firebaseui:remmeberedAccounts', JSON.stringify(user));
            // 
            try {
                const resultAction = await dispatch(getMe());
                const currentUser = unwrapResult(resultAction);
                setuserFirebase(currentUser);
                // showToast('success', `Fetched ${user.name}`);
            } catch (err) {
                console.log('Failed to login ', err.message);
                // showToast('error', `Fetch failed: ${err.message}`);
            }
        });
        return () => unregisterAuthObserver();
        // 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="photo-app">
            <Suspense fallback={<h1>Loading profile...</h1>}>
                <Router>
                    <Header />
                    <Switch>
                        <Redirect exact from='/' to="/photos"></Redirect>
                        <Route path="/photos" component={Photo} />
                        <Route path="/signin" component={SignIn} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Suspense>
        </div>
    );
}

export default App;

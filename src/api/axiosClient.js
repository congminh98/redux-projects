import axios from "axios";
import queryString from 'querystring';
import firebase from 'firebase';

const getFirebaseToken = async () => {
    const currentUser = firebase.auth().currentUser;
    if(currentUser) return currentUser.getIdToken();
    // 
    const remmeberedAccount = localStorage.getItem("firebaseui:remmeberedAccounts");
    console.log(remmeberedAccount);
    if(!remmeberedAccount) return null;
    // 
    return new Promise((resolve,reject) => {
        const waitTimer = setTimeout(() => {
            reject(null);
        }, 10000);
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
            if(!user){
                reject(null);
            }
            const token = await user.getIdToken();
            resolve(token);
            unregisterAuthObserver();
            clearTimeout(waitTimer);
        });
    });
}
// 
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(async (config) => {
    //Handle token here
    const token = await getFirebaseToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use((response) => {
    if(response && response.data){
        return response.data;
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosClient;
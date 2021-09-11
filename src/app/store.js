import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import photoReducer from 'features/Photo/photoSlide';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import userReducer from "./userSlice";


const rootReducer = combineReducers({
    photos: photoReducer,
    user: userReducer
});
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});


export default store;
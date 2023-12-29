import { configureStore, combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { encryptTransform } from "redux-persist-transform-encrypt"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import loginSlice from "../slices/loginSlice"
// import usersSlice from "../slices/usersSlice"

//////////////////
declare module "redux-persist-transform-encrypt" {
  export function encryptTransform(config: any): any
}
///////////////
const reducers = combineReducers({
  loginSlice: loginSlice,
  // userSlice: userSlice,
})

//////////////
const persistConfig: any = {
  /////////////
  key: "root",
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY || "my-fallback-secret-key",
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

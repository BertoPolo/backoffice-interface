import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

import { Provider } from "react-redux"
import configureStore from "./store"

import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

let persistor = persistStore(configureStore)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={configureStore}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

reportWebVitals()

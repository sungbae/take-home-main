import * as React from "react"
import * as ReactDOM from "react-dom"
import { hot } from "react-hot-loader"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { applyMiddleware, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import Home from "./Containers/Home"
import reducers from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

const WrappedHome = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <div id="error-page">
              <h1>Oops 404!</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
)

// Fixed the react routing and react hot loader issue with @hot-loader/react-dom package
// https://github.com/gaearon/react-hot-loader/issues/1311
const HotHome = hot(module)(WrappedHome)

ReactDOM.render(<HotHome />, document.getElementById("home"))

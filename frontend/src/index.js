import * as React from "react"
import * as ReactDOM from "react-dom"
import { hot } from "react-hot-loader"
import { Provider } from "react-redux"
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
    <Home />
  </Provider>
)

const HotHome = hot(module)(WrappedHome)

ReactDOM.render(<HotHome />, document.getElementById("home"))

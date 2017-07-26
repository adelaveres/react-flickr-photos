import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk';


let finalCreateStore = compose(
  applyMiddleware(logger(), thunk)
)(createStore)


export default function configureStore(initialState = { todos: [] }) {
  const state = Object.assign({}, window.__REDUX_DEVTOOLS_EXTENSION__(), initialState);
  return finalCreateStore(reducer, state);
}

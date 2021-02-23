import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { courseListReducer, courseDetailsReducer } from './reducers/courseReducers'

const reducer = combineReducers({
    courseList: courseListReducer,
    courseDetails: courseDetailsReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
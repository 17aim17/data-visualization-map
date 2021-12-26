import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { LOAD_AREAS, LOAD_USERS } from '../action';

const userReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case LOAD_USERS:
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}

const areaReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case LOAD_AREAS:
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}

const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        users: userReducer,
        areas: areaReducer,
    }),
    composeEnhanchers(applyMiddleware(thunk))
)

export default store
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { LOAD_AREAS, LOAD_USERS, AREAS_BY_ID, USER_ANALYTICS, userAnalytics } from '../action';
import _ from 'lodash'

const userReducer = (state = [], action) => {
    const { type, payload } = action

    switch (type) {
        case LOAD_USERS:
            return payload
        default:
            return state
    }
}

const areaReducer = (state = null, action) => {
    const { type, payload } = action

    switch (type) {
        case LOAD_AREAS:
            return payload
        default:
            return state
    }
}

const analyticsReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case AREAS_BY_ID:
            return {
                ...state,
                areas_by_id: payload
            }
        case USER_ANALYTICS:
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
        analytics: analyticsReducer
    }),
    composeEnhanchers(applyMiddleware(thunk))
)

export default store
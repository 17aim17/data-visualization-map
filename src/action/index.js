import axios from 'axios'

export const LOAD_USERS = "LOAD_USERS"
export const LOAD_AREAS = "LOAD_AREAS"

const API_URL = "https://kyupid-api.vercel.app/api"


export const getUsers = () => (dispatch) => {
    axios.get(`${API_URL}/users`).then(res => {
        console.log(res);
        dispatch({
            type: LOAD_USERS,
            payload: res.data.users
        })
    })
}

export const getAreas = () => (dispatch) => {
    axios.get(`${API_URL}/areas`).then(res => {
        console.log(res);
        dispatch({
            type: LOAD_AREAS,
            payload: res.data
        })
    })
}
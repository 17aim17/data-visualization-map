import axios from 'axios'
import colors from 'nice-color-palettes/500'
export const LOAD_USERS = "LOAD_USERS"
export const LOAD_AREAS = "LOAD_AREAS"
export const AREAS_BY_ID = "AREAS_BY_ID"
export const USER_ANALYTICS = "USER_ANALYTICS"

const API_URL = "https://kyupid-api.vercel.app/api"

export const getUsers = () => (dispatch) => {
    axios.get(`${API_URL}/users`).then(res => {
        const { users } = res.data

        // total
        let totalUsers = users.length;
        let totalMales = 0;
        let totalFemales = 0;

        let totalProUsers = 0;
        let totalProMales = 0;
        let totalProFemales = 0;

        for (let user of users) {
            if (user.gender == 'M') {
                totalMales += 1
                if (user.is_pro_user) {
                    totalProUsers += 1
                    totalProMales += 1
                }
            }
            if (user.gender == 'F') {
                totalFemales += 1
                if (user.is_pro_user) {
                    totalProUsers += 1
                    totalProFemales += 1
                }
            }
        }

        dispatch({
            type: LOAD_USERS,
            payload: users
        })

        const total = {
            user: totalUsers,
            males: totalMales,
            females: totalFemales,
            proUsers: totalProUsers,
            proMales: totalProMales,
            proFemales: totalProFemales
        }

        dispatch(userAnalytics({ total }))
    })
}

export const getAreas = () => (dispatch) => {
    axios.get(`${API_URL}/areas`).then(res => {
        const payload = JSON.parse(JSON.stringify(res.data));
        const areas_by_id = {}
        res.data.features.forEach((feature, index) => {
            areas_by_id[feature.properties.area_id] = feature;
            const reversedCoordinates = []
            feature.geometry.coordinates[0].forEach(coordinate => {
                reversedCoordinates.push([coordinate[1], coordinate[0]])
            })
            payload.features[index].geometry.coordinates = reversedCoordinates;
        })


        payload.features.forEach((feature, index) => {
            areas_by_id[feature.properties.area_id] = feature;
        })


        dispatch({
            type: LOAD_AREAS,
            payload
        })

        dispatch(areasById(areas_by_id))
    })
}

export const areasById = (data) => {
    return {
        type: AREAS_BY_ID,
        payload: data
    }
}

export const calculateUserAnalytics = () => (dispatch, getState) => {
    const currentState = getState();
    const { users, areas, analytics } = currentState
    const { areas_by_id } = currentState.analytics;

    const user_area_analytics = {};
    for (let areaId in areas_by_id) {

        // area sepecific
        let totalUsersByArea = 0;
        let totalMalesByArea = 0
        let totalFemalesByArea = 0;

        let proUsersByArea = 0;
        let proMalesByArea = 0;
        let proFemalesByArea = 0;

        for (let user of users) {
            if (user.area_id == areaId) {
                totalUsersByArea += 1
                if (user.gender === 'M') {
                    totalMalesByArea += 1
                    if (user.is_pro_user) {
                        proUsersByArea += 1
                        proMalesByArea += 1
                    }
                }
                if (user.gender === 'F') {
                    totalFemalesByArea += 1
                    if (user.is_pro_user) {
                        proUsersByArea += 1
                        proFemalesByArea += 1
                    }
                }

            }
        }

        user_area_analytics[areaId] = {
            totalUsersByArea,
            totalMalesByArea,
            totalFemalesByArea,
            proUsersByArea,
            proMalesByArea,
            proFemalesByArea,
            color: colors[areaId][2]
        }
    }
    dispatch(userAnalytics({ user_area_analytics }))
}

export const userAnalytics = (data) => {
    return {
        type: USER_ANALYTICS,
        payload: data
    }
}


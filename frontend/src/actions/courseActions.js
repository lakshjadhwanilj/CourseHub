import axios from 'axios'
import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL
} from '../constants/courseConstants'

export const listCourses = () => async (dispatch) => {
    try {
        dispatch({ type: COURSE_LIST_REQUEST })
        const { data } = await axios.get('/api/courses')
        dispatch({
            type: COURSE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COURSE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listCourseDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/courses/${id}`)
        dispatch({
            type: COURSE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COURSE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })        
    }
}
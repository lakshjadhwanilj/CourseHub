import axios from 'axios'
import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    COURSE_DELETE_REQUEST,
    COURSE_DELETE_SUCCESS,
    COURSE_DELETE_FAIL,
    COURSE_CREATE_REQUEST,
    COURSE_CREATE_SUCCESS,
    COURSE_CREATE_FAIL,
    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL,
    COURSE_CREATE_REVIEW_REQUEST,
    COURSE_CREATE_REVIEW_SUCCESS,
    COURSE_CREATE_REVIEW_FAIL,
    COURSE_TOP_REQUEST,
    COURSE_TOP_SUCCESS,
    COURSE_TOP_FAIL
} from '../constants/courseConstants'

export const listCourses = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: COURSE_LIST_REQUEST })
        const { data } = await axios.get(`/api/courses?keyword=${keyword}&pageNumber=${pageNumber}`)
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

export const deleteCourse = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COURSE_DELETE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/courses/${id}`, config)
        
        dispatch({
            type: COURSE_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: COURSE_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createCourse = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: COURSE_CREATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/courses`, {}, config)
        
        dispatch({
            type: COURSE_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: COURSE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateCourse = (course) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COURSE_UPDATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/courses/${course._id}`, course, config)
        
        dispatch({
            type: COURSE_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: COURSE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createCourseReview = (courseId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COURSE_CREATE_REVIEW_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/courses/${courseId}/reviews`, review, config)
        
        dispatch({
            type: COURSE_CREATE_REVIEW_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: COURSE_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listTopCourses = () => async (dispatch) => {
    try {
        dispatch({ type: COURSE_TOP_REQUEST })
        const { data } = await axios.get(`/api/courses/top`)
        dispatch({
            type: COURSE_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COURSE_TOP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
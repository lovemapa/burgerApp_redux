import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {

    return {
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (token, userId) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}


export const authFail = (error) => {

    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthExpired = (expirationTime) => {
    console.log(expirationTime);

    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }

}


export const auth = (email, password, isSignUp) => {

    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOiZUXSMt_JWhYjwmDuReIl5NHDgIRehc'
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOiZUXSMt_JWhYjwmDuReIl5NHDgIRehc'

        }


        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthExpired(response.data.expiresIn))
            }).catch(error => {

                dispatch(authFail(error.response.data.error.message))
            })
    }

} 
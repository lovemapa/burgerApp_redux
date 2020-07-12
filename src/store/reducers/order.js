import * as actionTypes from '../../store/actions/actionTypes'


const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false
}


const reducer = (state = initialState, action) => {

    switch (action.type) {



        case actionTypes.PURCHASE_INIT: {

            return {
                ...state,
                purchased: false
            }
        }
        case actionTypes.PURCHASE_BURGER_START: {

            return {
                ...state,
                loading: true
            }
        }

        case actionTypes.PURCHASE_BURGER_SUCCESS: {

            const newObj = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newObj),
                purchased: true
            }
        }

        case actionTypes.PURCHASE_BURGER_FALSE: {

            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.FETCH_ORDER_INIT: {

            return {
                ...state,
                loading: true
            }
        }

        case actionTypes.FETCH_ORDER_SUCCESS: {

            return {
                ...state,
                orders: action.orders,
                error:false,
                loading: false
            }

        }

        case actionTypes.FETCH_ORDER_FAIL: {

            return {
                ...state,
                error: action.error,
                loading: false
            }
        }
        default: return state
    }
}


export default reducer
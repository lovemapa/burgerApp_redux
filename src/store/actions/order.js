import * as actionTypes from '../../store/actions/actionTypes'
import axios from '../../axios-order'


export const purchaseBurgerSuccess = (id, orderData) => {

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}



export const purchaseBurgerFail = error => {

    return {
        type: actionTypes.PURCHASE_BURGER_FALSE,
        error: error
    }
}


export const purchaseBurgerStart = () => {

    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}


export const purchaseInit = () => {

    return {
        type: actionTypes.PURCHASE_INIT,
    }
}


export const purchaseBurger = orderData => {

    return dispatch => {

        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData).then(response => {

            console.log(response.data);

            dispatch(purchaseBurgerSuccess(response.data.name, orderData))

        }).catch(err => {
            dispatch(purchaseBurgerFail(err))

        })
    }
}
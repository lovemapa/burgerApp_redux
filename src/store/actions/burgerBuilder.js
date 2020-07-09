import * as actionTypes from '../../store/actions/actionTypes'



export const addIngredient = (ingName) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}




export const removeIngredient = (ingName) => {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}


export const setIngredient = (ingredients) => {

    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchFailed = () => {

    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,

    }
}





export const initIngredients = () => {
    return dispatch => {
        // axios.get('https://fir-a21e3.firebaseio.com/orders/-MBnUjT7vNhoIuqHSN45/ingredients.json')
        //     .then(response => {
        // console.log(response.data);
        // dispatch(setIngredient(response.data))
        dispatch(setIngredient({
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }))

        // }).catch(e => {
        //     console.log(e);
        //     dispatch(fetchFailed())
        // })
    }
}
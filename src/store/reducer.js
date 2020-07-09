import * as actionTypes from './actions'


const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    price: 4,
}


const PRICES = {
    salad: 0.5,
    bacon: 1.4,
    cheese: 1.2,
    meat: 1.8
}



const reducer = (state = initialState, action) => {

    console.log(action);
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + PRICES[action.ingredientName]

            }
        }

        case actionTypes.REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - PRICES[action.ingredientName]


            }
        }

        // default: { return state }

    }
    return state
}

export default reducer
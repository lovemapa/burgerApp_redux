import * as actionTypes from '../actions/actionTypes'


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

        case actionTypes.SET_INGREDIENTS: {
            return {
                ...state,
                // ingredients: {
                //     ...state.ingredients,
                //     [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                // },
                ingredients: {
                    ...state.ingredients
                },
                price: 4,


            }
        }

        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredients: action.ingredients,


            }
        }

        default: return state

    }

}

export default reducer
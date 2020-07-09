import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'



class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchased: false,
        loading: false
    }


    componentDidMount() {

        this.props.onInitIngredients()
    }

    purchasedHandler = () => {
        this.setState({ purchased: true })
    }

    modalClosedHandler = () => {
        this.setState({ purchased: false })
    }

    setPurchasable(ingredients) {
        const values = { ...ingredients }
        const sum = Object.keys(values).map(keys => {
            return values[keys]
        }).reduce((sum, cur) => {

            return sum + cur
        }, 0)

        return sum > 0
    }



    purchaseContinue = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }




    render() {

        let disabled = {
            ...this.props.ings
        }
        for (let key in disabled)
            disabled[key] = disabled[key] <= 0



        let Ordersummary = <OrderSummary
            price={this.props.price.toFixed(2)}
            ingredients={this.props.ings}
            purchasedContinue={this.purchaseContinue}
            purchasedCancel={this.modalClosedHandler}

        />

        return (
            <Aux>
                <Modal show={this.state.purchased}
                    modalClosed={this.modalClosedHandler} >
                    {Ordersummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    disable={disabled}
                    ingredientAdded={this.props.onIngredientsAdded}
                    ingredientDeleted={this.props.onIngredientsRemoved}
                    price={this.props.price}
                    purchased={this.purchasedHandler}
                    isPurchasable={this.setPurchasable(this.props.ings)}
                />
            </Aux>
        )
    }
}

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        purchasable: state.burgerBuilder.purchasable
    }
}

const dispatchStatetoProps = dispatch => {

    return {
        onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => { dispatch(actions.purchaseInit()) }

    }

}

export default connect(mapStateToProps, dispatchStatetoProps)(BurgerBuilder)
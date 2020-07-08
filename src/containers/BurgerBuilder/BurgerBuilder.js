import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'



const PRICES = {
    salad: 0.5,
    bacon: 1.4,
    cheese: 1.2,
    meat: 1.8
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        price: 4,
        purchasable: false,
        purchased: false,
        loading: false
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

        this.setState({ purchasable: sum > 0 })
    }



    purchaseContinue = () => {
        // alert('Continue to payment')

        let queyParams = []
        for (let i in this.state.ingredients) {
            queyParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queyParams.push('price=' + this.state.price)

        const queryString = queyParams.join('&');
        // console.log(queryString);


        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }


    addIngredientHandler = (type) => {
        const oldCOunt = this.state.ingredients[type]
        const updatedCount = oldCOunt + 1;
        const updatedBurger = {
            ...this.state.ingredients
        }
        updatedBurger[type] = updatedCount

        const oldPrice = this.state.price
        const updatedPrice = oldPrice + PRICES[type]
        this.setState({ price: updatedPrice, ingredients: updatedBurger })
        this.setPurchasable(updatedBurger)

    }


    removeIngredientHandler = (type) => {
        const oldCOunt = this.state.ingredients[type]
        if (oldCOunt <= 0)
            return;
        const updatedCount = oldCOunt - 1;
        const updatedBurger = {
            ...this.state.ingredients
        }
        updatedBurger[type] = updatedCount

        const oldPrice = this.state.price
        const updatedPrice = oldPrice - PRICES[type]
        this.setState({ price: updatedPrice, ingredients: updatedBurger })
        this.setPurchasable(updatedBurger)

    }



    render() {

        let disabled = {
            ...this.state.ingredients
        }
        for (let key in disabled)
            disabled[key] = disabled[key] <= 0



        let Ordersummary = <OrderSummary
            price={this.state.price.toFixed(2)}
            ingredients={this.state.ingredients}
            purchasedContinue={this.purchaseContinue}
            purchasedCancel={this.modalClosedHandler}

        />

        return (
            <Aux>
                <Modal show={this.state.purchased}
                    modalClosed={this.modalClosedHandler} >
                    {Ordersummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    disable={disabled}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientDeleted={this.removeIngredientHandler}
                    price={this.state.price}
                    purchased={this.purchasedHandler}
                    isPurchasable={this.state.purchasable}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'


class Checkout extends Component {


    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')

    }


    render() {
        let purchaseRidirect = this.props.purchased ? <Redirect to='/' /> : null
        return (
            <div>
                {purchaseRidirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutContinue={this.checkoutContinueHandler}
                    checkoutCancel={this.checkoutCancelHandler}
                />
                <Route path={this.props.match.url + '/contact-data'}
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}





export default connect(mapStateToProps)(Checkout)
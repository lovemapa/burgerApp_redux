import React, { Component } from 'react'
import { connect } from "react-redux";
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Orders.css'

import * as actions from '../../store/actions/index'

class Orders extends Component {



    componentDidMount() {
        this.props.onFetchOrder(this.props.token)
    }


    render() {
        let orders = <Spinner />


        if (!this.props.loading || !this.props.error) {

            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        }
        let errorMessage = null
        if (this.props.error && !this.props.loading) {
            errorMessage = (<div className={classes.Error}>
                {this.props.error}
            </div>)
            orders = []
        }

        return (
            <div>
                {errorMessage}
                {orders}

            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onFetchOrder: (token) => dispatch(actions.fetchOrders(token))
    }
}


const mapStateToProps = state => {

    return {
        orders: state.order.orders,
        error: state.order.error,
        loading: state.order.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
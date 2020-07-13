
import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Nav from './hoc/Nav'
import CheckOut from './containers/Checkout/Checkout'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from "react-redux";
import * as actions from './store/actions/index'




class App extends Component {


  componentDidMount() {
    this.props.onTryAutoSignup()
  }


  render() {
    let router = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )


    if (this.props.isAuthenticated) {
      router = (
        <Switch>
          <Route path="/checkout" component={CheckOut} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }


    return (
      < div >
        <Layout>
          <Nav />
          {router}
        </Layout>
      </div >
    )
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch => {

  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Nav from './hoc/Nav'
import CheckOut from './containers/Checkout/Checkout'
function App() {

  // let checkout = null

  return (
    <div >
      <Layout>
        <Nav />
        <Switch>
          <Route path="/checkout" component={CheckOut} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;

import React, { Component } from 'react'
import Aux from './Aux'
import Toolbar from '../components/Navigation/Toolbar/Toolbar'
import { connect } from 'react-redux'

class Nav extends Component {
    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} />
            </Aux>
        )
    }
}

const mapStateToProp = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProp)(Nav)
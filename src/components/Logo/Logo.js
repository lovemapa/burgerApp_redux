import React from 'react'
import classes from './Logo.css'


import BurgerLogo from '../../assets/images/27.1 burger-logo.png'

export default function Logo(props) {
    return (
        <div className={classes.Logo}>
            <img src={BurgerLogo} alt="My Burger App"></img>
        </div>
    )
}

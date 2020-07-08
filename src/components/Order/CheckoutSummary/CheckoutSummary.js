import React from 'react'
import classes from './CheckoutSummary.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

export default function CheckoutSummary(props) {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you gobble it whole</h1>
            <div style={{ margin: 'auto', width: '100%' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Success" clicked={props.checkoutContinue}> CONTINUE</Button>
            <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>

        </div>
    )
}

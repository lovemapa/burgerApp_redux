import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'


export default function OrderSummary(props) {

    const ingredientsSummry = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}>
                <span style={{ textTransform: 'capitalize', color: 'blue' }} >{key}</span> : {props.ingredients[key]}
            </li>
        })
    return (
        <Aux>
            <h2>Order Summary</h2>
            <p>A delicious burger with following ingredients</p>
            <ul>
                {ingredientsSummry}
            </ul>
            <p><strong>Total Price :${props.price}</strong></p>
            <p>Continue to Checkout</p>
            <Button clicked={props.purchasedContinue} btnType="Success" > CONTINUE</Button>
            <Button clicked={props.purchasedCancel} btnType="Danger">CANCEL</Button>

        </Aux>
    )
}

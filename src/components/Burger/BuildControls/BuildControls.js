import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const control = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },

]

export default function BuildControls(props) {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price :$<strong>{props.price.toFixed(2)}</strong></p>
            {
                control.map((ctrl) => (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        disabled={props.disable[ctrl.type]}
                        added={() => props.ingredientAdded(ctrl.type)}
                        deleted={() => props.ingredientDeleted(ctrl.type)}
                    />
                ))}

            <button onClick={props.purchased} disabled={!props.isPurchasable}
                className={classes.OrderButton}>
                ORDER NOW
                </button>
        </div>
    )
}

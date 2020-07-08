import React from 'react'
import classes from './Order.css'

export default function Order(props) {
    const ingredients = []
    for (let ingredientsName in props.ingredients) {
        ingredients.push({
            name: ingredientsName,
            amount: props.ingredients[ingredientsName]
        })
    }


    const ingredientsSolo = ingredients.map(ig => {
        return <span key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #eee',
                padding: '5px',
                color: 'blue'
            }}
        >{ig.name}: {ig.amount}</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients {ingredientsSolo} </p>
            <p>Price : $<strong style={{ color: '#430358' }}>{props.price}</strong></p>
        </div>
    )
}

import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'


export default function Burger(props) {

    let warningStyle = {
        color: 'red'
    }
    let transformedArray = Object.keys(props.ingredients)
        .map(igKey => {

            return [...Array(props.ingredients[igKey])]
                .map((_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />
                })

        }).reduce((cur, val) => {
            return cur.concat(val)
        }, [])

    if (transformedArray.length === 0)
        transformedArray = <p style={warningStyle}>Kindly start adding the burgers</p>
    return (
        <div className={classes.Burger}>

            <BurgerIngredient type="bread-top" />
            {transformedArray}
            <BurgerIngredient type="bread-bottom" />

        </div>
    )
}

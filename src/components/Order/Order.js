import React from 'react'
import classes from './Order.css';


export default function order() {
  return (
    <div className={classes.Order}>
      <p>Ingredients: Salad(1)</p>
      <p>Price: <string>USD 5.45</string></p>
    </div>
  )
}

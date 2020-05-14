import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((el) => {
    return (
      <li key={el}>
        <span style={{textTransform: 'capitalize'}}>{el}</span>: {props.ingredients[el]}
      </li>
    )
  })

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue To Checkout?</p>
      <button>CANCEL</button>
      <button>CONTINUE</button>
    </Aux>
  )
};

export default orderSummary;
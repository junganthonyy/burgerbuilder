import React from 'react';
import Button from '../../UI/Button/Button';
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
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue To Checkout?</p>
      <Button clicked={props.purchaseCanceled} btnType="Danger">CANCEL</Button>
      <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>
    </Aux>
  )
};

export default orderSummary;
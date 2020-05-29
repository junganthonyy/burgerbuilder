import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';
// want preview of burger
// buttons to continue or cancel


function checkoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes great!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button 
        btnType="Danger"
        clicked={props.onCheckoutCanceled}
        >CANCEL</Button>
      <Button 
        btnType="Success"
        clicked={props.onCheckoutContinued}
        >CONTINUE</Button>
    </div>
  )
}

export default checkoutSummary;

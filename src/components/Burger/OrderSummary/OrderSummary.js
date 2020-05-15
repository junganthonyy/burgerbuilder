import React from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux';

class OrderSummary extends React.Component {
  // this could be a functional component
  componentWillUpdate() {
    console.log('[OrderSummary] Will Update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((el) => {
      return (
        <li key={el}>
          <span style={{textTransform: 'capitalize'}}>{el}</span>: {this.props.ingredients[el]}
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
      <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
      <p>Continue To Checkout?</p>
      <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
      <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
    </Aux>
    );
  }
}
export default OrderSummary;
import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {

  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  componentDidMount() {
    this.setState({
      ingredients: this.props.history.location.state[0]
    });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }


  render() {

    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCanceled={this.checkoutCanceledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    )
  }
}

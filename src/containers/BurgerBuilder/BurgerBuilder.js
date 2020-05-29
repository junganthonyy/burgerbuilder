import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-43fa8.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      })
  }


  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients
    }
    const sum = Object.values(ingredients).reduce((acc, curr) => {
      return acc + curr
    }, 0);

    this.setState({
      purchasable: sum > 0
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = priceAddition + oldPrice;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    }, this.updatePurchaseState);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    }, this.updatePurchaseState);
  }

  purchaseHandler =() => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCanceledHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    // alert('You continued!');

    console.log('THIS IS THE CONTINUED PROPS');
    console.log(this.props.history);

    this.props.history.push('/checkout', [this.state.ingredients]);

    // this.setState({loading: true})
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Example Guy',
    //     address: {
    //       street: 'teststreet',
    //       zipCode: '41351'
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }

    // axios.post('/orders', order)
    //   .then(res => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   })

  }

  render() {
    const disabledInfo = {
      ...this.state.ingredientsingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCanceledHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

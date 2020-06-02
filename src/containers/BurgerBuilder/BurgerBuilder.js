import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

  state = {
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
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.props.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });

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
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCanceledHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

import React, {
  useEffect,
  useState
} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

export const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((acc, curr) => {
      return acc + curr
    }, 0);
    
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
    
  }

  const purchaseCanceledHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchased();
    props.history.push('/checkout');

  }

  const disabledInfo = {
    ...props.ings
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings}/>
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );

    orderSummary = <OrderSummary 
      ingredients={props.ings}
      purchaseCanceled={purchaseCanceledHandler}
      purchaseContinued={purchaseContinueHandler}
      price={props.price}
    />
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCanceledHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );

}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchased: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));

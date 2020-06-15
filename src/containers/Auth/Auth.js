import React, {
  useEffect,
  useState
} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

import * as actions from '../../store/actions/index';

import classes from './Auth.css';

const auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const [isSignup, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const inputChangedHandler = (e, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: e.target.value,
        valid: checkValidity(e.target.value, controls[controlName].validation),
        touched: true
      })
    })

    setControls(updatedControls);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignup);
  }

  if (props.isAuth) {
    return <Redirect to={props.authRedirectPath}/>
  }

  const formElementsArray = [];

  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }
  
  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType} 
      elementConfig={formElement.config.elementConfig}  
      value={formElement.config.value}
      changed={(e) => inputChangedHandler(e, formElement.id)}
      shouldValidate={formElement.config.validation}
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
    />))

  if (props.loading) {
    form = <Spinner/>;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p style={{color: 'red'}}>{props.error.message}</p>
  }

  return (
    <div className={classes.Auth}>
      {errorMessage}
      <form onSubmit={submitHandler}>
        { form }
        <Button btnType="Success">{isSignup ? 'SIGN UP' : 'LOGIN'}</Button>
      </form>
      <Button 
        btnType="Danger"
        clicked={switchAuthModeHandler}
      >SWITCH TO {isSignup ? 'LOGIN' : 'SIGN UP'}</Button>
    </div>
  )
  
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);
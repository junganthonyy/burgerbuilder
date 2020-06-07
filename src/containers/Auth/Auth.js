import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './Auth.css';

export default class Auth extends Component {
  state = {
    controls: {
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
      },
    }
  }

  checkValidity = (value, rules) => {
    console.log(value, rules);
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    }

    return isValid;
  }

  inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }

    this.setState({
      controls: updatedControls
    });
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    
    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType} 
        elementConfig={formElement.config.elementConfig}  
        value={formElement.config.value}
        changed={(e) => this.inputChangedHandler(e, formElement.id)}
        shouldValidate={formElement.config.validation}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
      />))

    return (
      <div className={classes.Auth}>
        <form>
          { form }
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    )
  }
}
import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

export default class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
          <input className={classes.Input} type='text' name='email' placeholder='Your Email'/>
          <input className={classes.Input} type='text' name='street' placeholder='Your Street'/>
          <input className={classes.Input} type='text' name='postal' placeholder='Your Postal'/>
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    )
  }
}

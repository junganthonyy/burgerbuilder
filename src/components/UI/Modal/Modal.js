import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
      >
      {props.children}
    </div>
  </Aux>
);
/**
 * Doing inline stylings to handle dynamic display
 * of the modal. translateY lets it slide in and out.
 * vh units are relative to the viewport.
 * opacity handles the actual changing of the visiblity
 */

export default modal;
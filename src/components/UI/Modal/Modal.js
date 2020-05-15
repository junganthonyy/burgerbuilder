import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
    console.log('[Modal] will update')
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
          >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
/**
 * Doing inline stylings to handle dynamic display
 * of the modal. translateY lets it slide in and out.
 * vh units are relative to the viewport.
 * opacity handles the actual changing of the visiblity
 */

export default Modal;
import React from 'react';
import classes from './buildControl.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div>{props.label}</div>
    <button>Less</button>
    <button>More</button>
  </div>
);

export default buildControl;
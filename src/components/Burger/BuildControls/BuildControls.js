import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
// import PropTypes from 'prop-types';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map((control) => (
      <BuildControl label={control.label} key={control.label}/>
    ))}
  </div>
)

export default buildControls;
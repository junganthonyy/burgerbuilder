import React from 'react'
import classes from './DrawerToggle.css';

export default function drawerToggle(props) {
  return (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
      <div/>
      <div/>
      <div/>
    </div>
  )
}

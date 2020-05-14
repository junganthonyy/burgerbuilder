import React from 'react'
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

export default function navigationItems() {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem active link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  )
};
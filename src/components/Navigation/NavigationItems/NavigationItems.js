import React from 'react'
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

export default function navigationItems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      {!props.isAuthenticated 
        ? <NavigationItem link="/auth">Authentication</NavigationItem> 
        : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
  )
};

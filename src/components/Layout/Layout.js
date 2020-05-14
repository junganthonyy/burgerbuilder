import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
  <Aux>
    <Toolbar/>
    <SideDrawer/>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;

/**
 * Layout is just meant to be the base layer for the app
 * We have the top bar stuff that we expect to see on
 * all pages of the app (toolbar, drawer, backdrop).
 * When we actually use this component, we'll have the 
 * children be passed into the <main>. Makes it easier
 * for organization purposes.
 */
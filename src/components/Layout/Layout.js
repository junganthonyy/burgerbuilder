import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component{

  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  render() {
    return (
      <Aux>
        <Toolbar/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  } 
}
  

export default Layout;

/**
 * Layout is just meant to be the base layer for the app
 * We have the top bar stuff that we expect to see on
 * all pages of the app (toolbar, drawer, backdrop).
 * When we actually use this component, we'll have the 
 * children be passed into the <main>. Makes it easier
 * for organization purposes.
 */
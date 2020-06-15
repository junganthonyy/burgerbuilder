import React, {
  useCallback,
  useState
} from 'react';
import Aux from '../Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';

const layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerToggleHandler = useCallback(() => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  }, [setSideDrawerIsVisible]);

  const sideDrawerClosedHandler = useCallback(() => {
    setSideDrawerIsVisible(false);
  }, [setSideDrawerIsVisible]);


  return (
    <Aux>
      <Toolbar 
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer 
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );

}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(layout);

/**
 * Layout is just meant to be the base layer for the app
 * We have the top bar stuff that we expect to see on
 * all pages of the app (toolbar, drawer, backdrop).
 * When we actually use this component, we'll have the 
 * children be passed into the <main>. Makes it easier
 * for organization purposes.
 */
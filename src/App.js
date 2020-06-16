import React, {
  Suspense,
  useEffect
} from 'react';
import {
  Route,
  Redirect,
  Switch 
} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const app = (props) => {
  const { onTryAutoSignIn } = props;

  useEffect(() => {
    onTryAutoSignIn()
  }, [onTryAutoSignIn]);

  let routes = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path='/' exact component={BurgerBuilder}/>
      <Redirect to='/'/>
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' render={(props) => <Checkout {...props} />}/>
        <Route path='/orders' render={(props) => <Orders {...props} />}/>
        <Route path='/auth' render={(props) => <Auth {...props} />}/>
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    );
  }
  
  return (
    <Layout>
      <Suspense
        fallback={<p>Loading...</p>}
      >
        { routes }
      </Suspense>
    </Layout>
  );
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(app);

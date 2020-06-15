import React, {
  Component,
  useEffect,
  useState
} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState();

    /**
     * The below was in a 'willMount' block so we want this
     * to execute before rendering. Putting it in the function
     * body is basically the same thing
     */
    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);

      return req;
    });

    const resInterceptor = axios.interceptors.response.use(res => res, err => {
      setError(err);
    });

    /**
     * Return it in useEffect in a function because that callback
     * will be used during unmounting
     */
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    }

    return (
      <Aux>
        <Modal 
          show = {error}
          modalClosed={errorConfirmedHandler}
        >
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    )
    
  }
}

export default withErrorHandler;
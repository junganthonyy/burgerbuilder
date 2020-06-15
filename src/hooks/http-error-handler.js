import { useEffect, useState } from 'react';

export default (httpClient) => {
  const [error, setError] = useState();

  /**
   * The below was in a 'willMount' block so we want this
   * to execute before rendering. Putting it in the function
   * body is basically the same thing
   */
  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);

    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
    setError(err);
  });

  /**
   * Return it in useEffect in a function because that callback
   * will be used during unmounting
   */
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    }
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  }

  return [error, errorConfirmedHandler];
}
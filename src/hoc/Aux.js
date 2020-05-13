/**
 * This is a HOC (Higher Order Component)
 * It's purpose is to simply act as a wrapper
 * around it's children components so that
 * we can send the component out without an 
 * extra wrapping div
 * 
 * A glorified react.fragment
 */

const aux = (props) => props.children;

export default aux;
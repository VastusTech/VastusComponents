export default ({dispatch, getState}) => next => action => {
  return new Promise((resolve) => resolve(next(action)))
};
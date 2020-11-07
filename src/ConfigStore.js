import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../src/reducers';
import rootSaga from '../src/sagas';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  //  middlewares.push(logger);
  }

export default function configureStore() {
    const store = createStore(
        rootReducer, applyMiddleware(...middlewares)
    )
    sagaMiddleware.run(rootSaga);
    return store;
}
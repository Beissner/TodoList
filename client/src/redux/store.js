import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import Reducers from './reducers';

export const store = createStore(Reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));
import { combineReducers } from 'redux';

/*      Reducer List        */
import AuthReducer from './authReducer';
import TaskReducer from './taskReducer';
import ModalReducer from './modalReducer';
import ProjectReducer from './projectReducer';

const Reducers = combineReducers({
    auth: AuthReducer,
    task: TaskReducer,
    modal: ModalReducer, 
    project: ProjectReducer 
});

export default Reducers;
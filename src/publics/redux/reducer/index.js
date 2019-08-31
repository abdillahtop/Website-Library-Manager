import { combineReducers } from 'redux';

import book from './book';
import loaning from './loaning'
import users from './users'

const appReducer = combineReducers({
    book,
    loaning,
    users
});

export default appReducer;
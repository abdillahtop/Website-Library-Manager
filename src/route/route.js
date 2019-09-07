import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Home from '../page/home'
import Detail from '../page/detail'
import Loaning from '../page/loaning'
import LoanUser from '../page/loaningUser'
import User from '../page/user'
import Register from '../page/register'

import store from '../publics/redux/store'

export default class link extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route exact path='/' component={Home} />
                    <Route path='/alluser' component={User} />
                    <Route path='/book/:bookid' component={Detail} />
                    <Route exact path='/loan' component={Loaning} />
                    <Route path='/loan/:cardid' component={LoanUser} />
                    <Route path='/register' component={Register} />
                </Router>
            </Provider>

        )
    }
}
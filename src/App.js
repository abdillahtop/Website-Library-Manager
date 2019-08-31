import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import Detail from './components/detail/detail'
import Routing from './route/route'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
  render() {
    axios.defaults.headers.common['authorization'] = 'ThisIsHeader'
    return (
      <div>
        <Routing />
      </div>
    )
  }
}

export default App
import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom"

import addReference from './components/add-reference.js'
import searchReference from './components/search-reference.js'
import Navbar from './components/navbar.js'

class App extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Router>
                <div>
                    <Navbar/>
                    <br/>
                    <Route path='/add' component={addReference}/>
                    <Route path='/search' component={searchReference}/>
                </div>
            </Router>
        )
    }
}
export default App
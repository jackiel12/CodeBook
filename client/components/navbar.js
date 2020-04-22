import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import '../css/navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }



    render() {
        return (
            <div className="nav-container">
                <h1>Menu</h1>
                <nav className="main-nav">
                    <ul>
                        <li>
                        <Link to='/add'>Add a Reference</Link> 
                        </li>
                        <li>
                        <Link to='/search'>Search for a Reference</Link>
                        </li>
                    
                    </ul>
                    
                </nav>
            </div>
        )
    }




}

export default Navbar
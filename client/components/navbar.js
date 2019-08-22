import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }



    render() {
        return (
            <nav>
                <ul>
                    <li>
                    <Link to='/add'>Add a Reference</Link> />
                    </li>
                    <li>
                    <Link to='/search'>Search for a Reference</Link>/>
                    </li>
                
                </ul>
                
            </nav>
        )
    }




}

export default Navbar
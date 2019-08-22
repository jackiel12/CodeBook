import React, {Component} from 'react';
import '../css/reference.css'


class Reference extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className='container'>
                <label>Name:</label>
                    <div>{this.props.name}</div>
                <label>Url:</label>
                    <div>
                    <a href={this.props.url}>{this.props.url}</a>
                    </div>
                <label>Description:</label>
                    <div>{this.props.description}</div>
                <label>Tags:</label>
                    <div>{this.props.tags}</div>
            </div>
        )
    }


}

export default Reference
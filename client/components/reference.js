import React, {Component} from 'react'


class Reference extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
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
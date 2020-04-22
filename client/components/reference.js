import React, {Component} from 'react';
import '../css/reference.css'


class Reference extends Component {
    constructor(props) {
        super(props)

        this.deleteReference = this.deleteReference.bind(this);
    }

    deleteReference(e) {

        fetch('/data/deleteRecord', {
            method: 'DELETE',
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({id: this.props.id})
        })
        .then(res => res.json())
        .then(data => {
            //console.log("This record has been deleted:", data)
            this.props.refresh();
        })
        .catch(err => {
            console.log('There was an error deleting the reference. Err:', err)
        })

    }

    render() {
        return(
            <div className='reference-container'>
                <div className="ref-name-container"><div>{this.props.name}</div></div>
                <br/>
                <div className="ref-info-container">
                    <label>Url:</label>
                        <div>
                        <a href={this.props.url}>{this.props.url}</a>
                        </div>
                    <label>Description:</label>
                        <div>{this.props.description}</div>
                    <label>Tags:</label>
                        <div>{this.props.tags}</div>
                    <button className='deleteButton' onClick={(e) => this.deleteReference(e)}>Delete</button>
                </div>
            </div>
        )
    }


}

export default Reference

// onClick={() => this.props.deleteFunction(event, this.props.url)}
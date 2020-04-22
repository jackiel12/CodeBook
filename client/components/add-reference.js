import React, { Component } from 'react';
import Reference from './reference.js'
import '../css/add-reference.css'

class addReference extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            url: '',
            description: '',
            tags:'',
            existingRefs: []
        };

        this.onChangeName = this.onChangeName.bind(this);        
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getExistingReferences = this.getExistingReferences.bind(this);
        this.displayReferences = this.displayReferences.bind(this);
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        })
    }

    onChangeUrl(event) {
        this.setState({
            url: event.target.value
        })
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    onChangeTags(event) {
        this.setState({
            tags: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();

        const reference = {
            name: this.state.name,
            url: this.state.url,
            description: this.state.description,
            tags: this.state.tags
        }

        //fetch with type post
        fetch('/data/add',{
            method: 'POST',
            body: JSON.stringify(reference),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            res.json()
        })
        .then(() => {
            this.getExistingReferences()
        })
        .catch((err) => {
            if(err) console.log('there was an error');
        })
    }

    getExistingReferences() {

        fetch('/data/getRecords', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({existingRefs: [...data]})
        })
        .catch((err) => {
            if(err) console.log(err);
        })

    }

    displayReferences() {
        let currentRefs = [...this.state.existingRefs]

        let refList = currentRefs.map((el)=> {
            return <Reference key={el._id.toString()} 
            id={el._id} name={el.name} 
            tags={el.tags.join()} 
            description={el.description} 
            url={el.url}
            refresh={this.getExistingReferences}/>
        })
        
        return refList;
    }

    componentDidMount() {
        this.getExistingReferences();
    }

    render() {
        //create a function here that adds different references to an array to display with returned information from the db

        return (
            <div className="add-reference-container">
                <div className="add-form">
                    <h3>Add a Reference</h3>
                    <form className='formContainer' onSubmit={this.onSubmit}>
                        <label>
                            Name: 
                            <input className="add-form-input" type='text' value={this.state.name} onChange={this.onChangeName}/>
                        </label>
                        <label>
                            URL: 
                            <input className="add-form-input" type='text' value={this.state.url} onChange={this.onChangeUrl}/>
                        </label>
                        <label>
                            Description: 
                            <textarea className="add-form-input description-box" wrap="soft" name='text' value={this.state.description} onChange={this.onChangeDescription}/>
                        </label>
                        <label>
                            Tags: 
                            <input className="add-form-input" type='text' value={this.state.tags} onChange={this.onChangeTags}/>
                        </label>
                        <div>
                            <input className ='addRefButton' type='submit' value='Add Reference'/>
                        </div>
                    </form>
                </div>
                <br/>
                <div className="saved-reference-container">
                    <h3>Saved References</h3>
                    <br/>
                    <div>{this.displayReferences()}</div>
                </div>
            </div>
        )
    }
    
}

export default addReference
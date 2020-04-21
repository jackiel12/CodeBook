import React, { Component } from 'react';
import Reference from './reference.js'

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
            console.log(res);
        })
        .catch((err) => {
            if(err) console.log(this.state);
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
            this.setState({existingRefs: data})
        })
        .catch((err) => {
            if(err) console.log(err);
        })

    }

    displayReferences() {
        let refList = this.state.existingRefs.map((el)=> {
            return <Reference key={el._id.toString()} name={el.name} tags={el.tags.join()} description={el.description} url={el.url}/>
        })
        
        return refList;
    }

    componentDidMount() {
        this.getExistingReferences();
    }

    render() {
        //create a function here that adds different references to an array to display with returned information from the db

        return (
            <div>
                <h3>Add a Reference</h3>
                <form className='formContainer' onSubmit={this.onSubmit}>
                    <label>
                        Name: 
                        <input type='text' value={this.state.name} onChange={this.onChangeName}/>
                    </label>
                    <label>
                        URL: 
                        <input type='text' value={this.state.url} onChange={this.onChangeUrl}/>
                    </label>
                    <label>
                        Description: 
                        <input type='text' value={this.state.description} onChange={this.onChangeDescription}/>
                    </label>
                    <label>
                        Tags: 
                        <input type='text' value={this.state.tags} onChange={this.onChangeTags}/>
                    </label>
                    <div>
                        <input className ='addRefButton' type='submit' value='Add Reference'/>
                    </div>
                </form>
                <br/>
                <h3>Saved References</h3>
                <div>{this.displayReferences()}</div>
            </div>
        )
    }
    
}

export default addReference
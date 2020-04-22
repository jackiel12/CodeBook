import React, {Component} from 'react';
import Reference from './reference.js';
import '../css/search-reference.css'

class searchReference extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchVal: '',
            results: []
        };

        this.onChangeSearchVal = this.onChangeSearchVal.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.renderExistingReferences = this.renderExistingReferences.bind(this)
        this.getExistingReferences = this.getExistingReferences.bind(this)
        }

    onChangeSearchVal (event) {
        this.setState({
            searchVal: event.target.value
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
            this.setState({results: [...data]})
        })
        .catch((err) => {
            if(err) console.log(err);
        })

    }

    onSubmit(event) {
        event.preventDefault();

        const tags = this.state.searchVal

        fetch('/data/search/'+tags,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => 
            res.json())
        .then(data  => {
            console.log('response from mongodb', data)
            this.setState({
                results: [...data]
            })
        })
        .catch((err, res)=> {
            console.log('There was an ERROR getting the data. err:', err)
            console.log('response from db',res)
        })

    }

    renderExistingReferences() {
        const currentRefs = [...this.state.results]

        let refList = currentRefs.map((el) => {
            return <Reference key={el._id.toString()} 
            id={el._id} 
            name={el.name} 
            tags={el.tags.join()} 
            description={el.description} 
            url={el.url} 
            refresh={this.getExistingReferences}/>
        })

        return refList;
    }

    componentDidMount() {
        this.getExistingReferences()
    }

    render() {

        return(
            <div className="search-reference-container">
                <form onSubmit={this.onSubmit}>
                    <label>
                        Search by Tag:
                        <input className="search-box" type='text' value={this.state.searchVal} onChange={this.onChangeSearchVal}/>
                    </label>
                    <br/>
                    <br/>
                    <div>
                        <input type='submit' value='Search'/>
                    </div>
                </form>
                <br/>
                <h3>References</h3>
                <br/>
                <div>
                    {this.renderExistingReferences()}
                </div>

            </div>
        )
    }

}

export default searchReference;

//deleteFunction={this.deleteRecord}
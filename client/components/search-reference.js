import React, {Component} from 'react';
import Reference from './reference.js'

class searchReference extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchVal: '',
            results: []
        };

        this.onChangeSearchVal = this.onChangeSearchVal.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        // this.presentResults = this.presentResults.bind(this)
    }

    onChangeSearchVal (event) {
        this.setState({
            searchVal: event.target.value
        })
    }

    // presentResults (res) {
    //     this.setState({
    //         results: res //should be an array of objects
    //     })
    // }

    onSubmit(event) {
        event.preventDefault();
        //make a fetch with type get to search for items by tag


        const tags = this.state.searchVal

        fetch('/data/search/'+tags,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('response from mongodb', data)
            this.setState({
                results: data
            })

            console.log('this.state.resultssssss:',this.state.results)
        })
        .catch((err, res)=> {
            console.log('There was an ERROR getting the data!!! err:', err)
            console.log('response from db',res)
        })

    }

    render() {

        const results = []

        for(let i = 0;i < this.state.results.length;i++) {
            let currentObj = this.state.results[i]
            results.push(<Reference name={currentObj.name} tags={currentObj.tags.join()} description={currentObj.description} url={currentObj.url}/>)
        }

        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Search by Tag:
                        <input type='text' value={this.state.searchVal} onChange={this.onChangeSearchVal}/>
                    </label>
                    <div>
                        <input type='submit' value='Search'/>
                    </div>
                </form>

                <div>
                    {results}
                </div>

            </div>
        )
    }

}

export default searchReference;
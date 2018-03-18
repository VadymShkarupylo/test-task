import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './App.css';
import 'react-table/react-table.css';

class App extends Component {

	handleClick() {
		axios.get('https://itunes.apple.com/search?term='+this._inputElement.value)
			.then(response => this.setState({
				artistName: response.data.results[0].artistName,
				resultCount: response.data.resultCount,
				results: response.data.results
			}));
	}

	constructor() {
		super();
		this.state = {
			artistName: '',
			resultCount: '',
			results: []
		}
		this.handleClick = this.handleClick.bind(this);
	}

	render() {
		const columns = [
			{
    Header: '',
		Cell: row => (
			<div>
				//<img height={30} src={'http://is1.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/30x30bb.jpg'} />
				<img height={30} src="{$'artworkUrl30'}" />
			</div>
		)

  }, {
    Header: 'Artist',
    accessor: 'artistName'
  }, {
    Header: 'Track',
    accessor: 'trackName'
  }, {
    Header: 'Collection',
    accessor: 'collectionName'
  },
	{
    Header: 'Genre',
    accessor: 'primaryGenreName'
  },
	{
    Header: '',
		Cell: row => (
			<div>
				<button type = "push"><span className="glyphicon glyphicon-plus"></span></button>
			</div>
		)
  }
]

		return (
			<div className = 'button_container'>
				<p id = "submission">
				<input ref = {(a) => this._inputElement = a}
					placeholder = "enter the keyword">
				</input>
				<button className = 'button' type = "submit" onClick = {this.handleClick}>
					<span className="glyphicon glyphicon-search"></span>
				</button>
				</p>
				<ReactTable
    			data={this.state.results}
    			columns={columns}
					defaultPageSize={10}
					className="-striped -highlight"
  			/>
			</div>
		)
	}
}

export default App;

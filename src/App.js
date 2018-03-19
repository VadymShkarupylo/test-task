import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './App.css';
import 'react-table/react-table.css';
import TrackDetails from './TrackDetails';

const columns = [
	{
Header: '',
Cell: row => (
	<div>
		<img height={100} src={row.original.artworkUrl100} />
	</div>
)}, {
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
expander: true
}
]

class App extends Component {

	handleClick() {
		axios.get('https://itunes.apple.com/search?term='+this._inputElement.value)
			.then(response => this.setState({
				artistName: response.data.results[0].artistName,
				resultCount: response.data.resultCount,
				results: response.data.results,
				collectionPrice: response.data.results[1].collectionPrice,
				trackPrice: response.data.results[1].trackPrice,
				trackCount: response.data.results[1].trackCount,
			}));
	}

	constructor() {
		super();
		this.state = {
			artistName: '',
			resultCount: '',
			collectionPrice: '',
			trackPrice: '',
			trackCount: '',
			results: [],
			expanded: {}
		}
		this.handleClick = this.handleClick.bind(this);
	}

	renderSubComponent = row => {
        return <TrackDetails trackData={row.trackData}/>;
    };

  renderExpandedComponent = row => {
        return (
            <div>
                <button type="push">
                    <span className="glyphicon glyphicon-plus"></span>
                </button>
            </div>
        );
  };

  onExpandChange = (newExpanded, index, event) => {
        this.setState({
            expanded: {
                [index]: true
            },
        });
  };

	render() {
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
					SubComponent={this.renderSubComponent}
          ExpanderComponent={this.renderExpandedComponent}
          onExpandedChange={this.onExpandChange}
          expanded={this.state.expanded}
  			/>
			</div>
		)
	}
}

export default App;

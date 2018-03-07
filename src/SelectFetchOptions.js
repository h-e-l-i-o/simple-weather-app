import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import fetch from 'isomorphic-fetch';

class SelectFetchOptions extends Component {
	constructor(props) {
		super(props);
		this.state = {multi: false, backspaceRemoves: true, creatable: false,};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange (value) {
		this.props.onChange(value);
	}

	getOptions (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}
		return fetch(`http://vrijeme.xyz:3003/?q=${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json };
		});
	}

	render () {
		const AsyncComponent = Select.Async;
		return (
			<AsyncComponent value={this.props.value} onChange={this.handleChange} valueKey="id" labelKey="name" loadOptions={this.getOptions} backspaceRemoves={this.state.backspaceRemoves} />
		);
	}
};


export default SelectFetchOptions;
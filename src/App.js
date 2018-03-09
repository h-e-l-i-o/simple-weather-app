import React, { Component } from 'react';
import logo from './TheEarth.png';
import './App.css';
import SelectFetchOptions from './SelectFetchOptions';

import apiKey from './apiKey';

// apiKey is set in apiKey.js file, here's the source:
//
// const apiKey = 'your-api-key-here'
// export default apiKey;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {title: 'Temperature for any city', temperature: '', city: '', result: '', showSubmit: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (value) {
    if (value===null){
        this.setState({
        city: '',
        title: 'Temperature for any city',
        value: value,
        showSubmit: false,
        result: '', 
      })
    } else {
      this.setState({
          city: value.name,
          title: value.name,
          value: value, 
          result: '', 
          showSubmit: true,    
      })
    }
  }
 
  handleSubmit(event) {
    fetch('http://api.openweathermap.org/data/2.5/weather?&appid=' + apiKey + '&units=metric&q='+this.state.city)
    .then(response => response.json())
    .then(
      (data) => {
        if (data.cod===200) {
          this.setState({ 
            temperature: data.main.temp, 
            title: this.state.city.toUpperCase()+', '+data.sys.country, 
            result: data.main.temp + String.fromCharCode(0xB0)+'C, '+data.weather[0].description,
            showSubmit: false
          })
        } else {
          this.setState({ 
            temperature: '', 
            title: 'City not found', 
            result: ''

          })          
        }
      }
    );
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.title}</h1>
        </header>
          <form onSubmit={this.handleSubmit}>
          <label>
            City:
            
          </label>
          <SelectFetchOptions onChange={this.handleChange} value={this.state.value} />
            {
              this.state.showSubmit ?
                <input style={{ marginTop: '15px' }} type="submit" value="Show me" />
              :
                null
            }
        </form>
        <p className="App-intro">
          {this.state.result}
        </p>
        </div>
      </div>
    );
  }
}


export default App;
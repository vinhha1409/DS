import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/search-bar';
import Content from './components/content';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history:[],
      movies: [
        
      ]
    }
  }
  componentDidMount(){
    axios({
      method: "get",
      url: `http://192.168.1.178:1998/default-recommendation`
    })
      .then(respone => {
        this.setState({
          movies: respone.data.hits.hits,
        });
      })
      .catch(error => {
        console.log(error);
      });
      this.setState({
        history: JSON.parse(localStorage.getItem('movies'))
      })
  }
  onAddHis = (movie) =>{
    let historY = this.state.history;
    historY.push(movie);
    this.setState({
      history: historY
    })
    localStorage.setItem('movies', JSON.stringify(historY));
  }
  onSearch = (keyword) => {
    axios({
      method: "get",
      url: `http://192.168.1.178:1998/auto/${keyword}`
    })
      .then(respone => {
        this.setState({
          movies: respone.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  onRecommend = () => {
    const films = JSON.parse(localStorage.getItem('movies'))
    const payload = {}
    if (!films) {
      return;
    }
    films.forEach(film => {
      payload[film._source.id] = 4
    })
    axios({
      method: "post",
      url: `http://192.168.1.178:1998/logs/`,
      data: payload
    })
      .then(response => {
        console.log(response)
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  onShowHis = () => {
    let movies = JSON.parse(localStorage.getItem("movies"));
    this.setState({
      movies: movies
    })
  }
  onClearHis = () => {
    localStorage.clear("movies");
    let movies = JSON.parse(localStorage.getItem("movies"));
    this.setState({
      movies: movies
    })
  }
  render() {

    return (
      <div className="App">
        <SearchBar onSearch={this.onSearch} onRecommend={this.onRecommend} onClearHis={this.onClearHis} onShowHis={this.onShowHis}></SearchBar>
        <Content movies={this.state.movies} onAddHis={this.onAddHis}></Content>
      </div>
    )
  }
}

export default App;

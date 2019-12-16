import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/search-bar';
import Content from './components/content';
import axios from "axios";


const BASE_URL = 'http://localhost:5000'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      movies: []
    }
  }

  componentDidMount(){
    this.defaultRecommend()
  }

  defaultRecommend() {
    axios({
      method: "get",
      url: `${BASE_URL}/default-recommendation`
    })
      .then(response => {
        this.setState({
          movies: response.data.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      logs: JSON.parse(localStorage.getItem('movies')) || []
    })
  }

  onAddHis = (movie) =>{
    let logs = this.state.logs;
    if (!logs.find(item => item.id === movie.id)) {
      logs.push(movie);
    }
    this.setState({
      logs: logs
    })
    localStorage.setItem('movies', JSON.stringify(logs));
  }

  onSearch = (keyword) => {
    if (keyword.trim()) {
      axios({
        method: "get",
        url: `${BASE_URL}/auto/${keyword.trim()}`
      })
        .then(response => {
          this.setState({
            movies: response.data.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.defaultRecommend()
    }
  }

  onRecommend = () => {
    const films = JSON.parse(localStorage.getItem('movies'))
    const payload = {}
    if (!films) {
      return;
    }
    films.forEach(film => {
      if (film && film.id) {
        payload[film.id] = 4
      }
    })
    axios({
      method: "post",
      url: `${BASE_URL}/logs/`,
      data: payload
    })
      .then(response => {
        console.log(response)
        this.setState({
          movies: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onShowHis = () => {
    let movies = JSON.parse(localStorage.getItem("movies"));
    console.log(movies)
    this.setState({
      movies: movies
    })
  }

  onClearHis = () => {
    localStorage.removeItem("movies");
    this.setState({
      movies: []
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

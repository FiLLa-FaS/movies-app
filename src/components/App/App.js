import React, { Component } from 'react'

import CardList from '../CardList'
import SwapiService from '../../services/apiService'

class App extends Component {
  swapiService = new SwapiService()

  constructor() {
    super()
    this.state = {
      movies: [],
    }
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies() {
    this.swapiService.getSearchMovies().then((moviesArr) => {
      this.setState({
        movies: moviesArr,
      })
    })
  }

  render() {
    const { movies } = this.state
    return (
      <div className="app">
        <CardList movies={movies} />
      </div>
    )
  }
}

export default App

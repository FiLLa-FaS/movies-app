import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'

import Spinner from '../Spinner'
import Error from '../Error'
import CardList from '../CardList'
import ApiService from '../../services/apiService'

import './App.css'

class App extends Component {
  apiService = new ApiService()

  constructor() {
    super()
    this.state = {
      movies: [],
      isLoading: true,
      hasError: false,
    }
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies() {
    this.apiService
      .getSearchMovies()
      .then((moviesArr) => {
        this.setState({
          movies: moviesArr,
          isLoading: false,
        })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({ hasError: true, isLoading: false })
  }

  render() {
    const { movies, isLoading, hasError } = this.state
    const errorMessage = hasError ? <Error text="Failed to download movies" /> : null
    const hasData = !(isLoading || hasError)
    const spinner = isLoading ? <Spinner /> : null
    const content = hasData ? <CardList movies={movies} /> : null
    return (
      <div className="app">
        <Online>
          {errorMessage}
          {spinner}
          {content}
        </Online>
        <Offline>
          <div className="app__offline-container">
            <Error text="You're offline right now. Check your connection." />
          </div>
        </Offline>
      </div>
    )
  }
}

export default App

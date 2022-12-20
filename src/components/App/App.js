import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import _debounce from 'lodash/debounce'

import CustomInput from '../CustomInput'
import CustomPagination from '../CustomPagination'
import Spinner from '../Spinner'
import Error from '../Error'
import CardList from '../CardList'
import ApiService from '../../services/apiService'

import './App.css'

class App extends Component {
  apiService = new ApiService()

  debounceLabelChange = _debounce(() => {
    const { queryString } = this.state
    this.setState({ isLoading: true })
    this.getMovies(queryString)
  }, 1000)

  constructor() {
    super()
    this.state = {
      movies: [],
      isLoading: false,
      hasError: false,
      queryString: null,
      currPage: 1,
      pages: null,
    }
  }

  componentDidMount() {
    const { queryString } = this.state
    if (!queryString) {
      return
    }
    this.getMovies(queryString, 1)
  }

  componentDidUpdate(prevProps, prevState) {
    const { queryString, currPage } = this.state
    if (prevState.currPage === currPage) {
      return
    }
    this.getMovies(queryString, currPage)
  }

  getMovies = (query, page) => {
    if (!query) {
      return
    }
    this.apiService
      .getSearchMovies(query, page)
      .then((results) => {
        this.setState({
          movies: results.results,
          isLoading: false,
          currPage: results.page,
          pages: results.total_pages,
        })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({ hasError: true, isLoading: false })
  }

  onLabelChange = (e) => {
    const label = e.target.value
    this.setState({ queryString: label })
    this.debounceLabelChange()
  }

  onPaginationChange = (page) => {
    this.setState({ currPage: page })
  }

  renderCards = () => {
    const { movies, isLoading, hasError, currPage, pages } = this.state
    if (!(isLoading || hasError || movies.length === 0)) {
      return (
        <>
          <CardList movies={movies} />
          <CustomPagination currPage={currPage} onChange={this.onPaginationChange} pages={pages} />
        </>
      )
    }
    return null
  }

  renderErrorMessage = () => {
    const { pages, movies, hasError, queryString } = this.state

    if (hasError) {
      return <Error text="Failed to download movies" />
    }
    if (pages === 0 && movies.length === 0 && queryString !== null) {
      return <Error text="No movies found" />
    }
    return null
  }

  render() {
    const { isLoading, queryString } = this.state
    const { onLabelChange, renderCards, renderErrorMessage } = this
    const spinner = isLoading ? <Spinner /> : null
    return (
      <div className="app">
        <Online>
          <div className="app__online-container">
            <CustomInput onLabelChange={onLabelChange} label={queryString} />
            {renderErrorMessage()}
            {spinner}
            {renderCards()}
          </div>
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

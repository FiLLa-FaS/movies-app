import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import _debounce from 'lodash/debounce'

import CustomInput from '../CustomInput'
import CustomPagination from '../CustomPagination'
import CustomTabs from '../CustomTabs'
import Spinner from '../Spinner'
import Error from '../Error'
import CardList from '../CardList'
import ApiService from '../../services/apiService'
import { GenresProvider } from '../../genres-context'

import './App.css'

class App extends Component {
  apiService = new ApiService()

  debounceLabelChange = _debounce(() => {
    const { queryString } = this.state
    if (queryString !== '') {
      this.setState({ isLoading: true })
    }
    this.getMovies(queryString)
  }, 1000)

  constructor() {
    super()
    this.state = {
      movies: [],
      isLoading: false,
      hasError: false,
      queryString: null,
      searchMovieCurrPage: 1,
      searchMoviePages: null,
      ratedMovies: [],
      ratedMovieCurrPage: 1,
      ratedMoviePages: null,
      tab: 'search',
      guestSessionId: null,
      genres: [],
    }
  }

  componentDidMount() {
    this.apiService
      .createGuestSession()
      .then((results) => {
        this.setState({
          guestSessionId: results.guest_session_id,
        })
      })
      .then(this.getAllGenres())
      .catch(this.onError)
  }

  componentDidUpdate(prevProps, prevState) {
    const { queryString, searchMovieCurrPage, ratedMovieCurrPage, tab } = this.state
    if (prevState.searchMovieCurrPage === searchMovieCurrPage && prevState.ratedMovieCurrPage === ratedMovieCurrPage) {
      return
    }
    if (prevState.tab === tab) {
      if (prevState.searchMovieCurrPage !== searchMovieCurrPage) {
        this.getMovies(queryString, searchMovieCurrPage)
      } else if (prevState.ratedMovieCurrPage !== ratedMovieCurrPage) {
        this.getMoviesWithRating(ratedMovieCurrPage)
      }
    }
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
          searchMovieCurrPage: results.page,
          searchMoviePages: results.total_pages,
        })
      })
      .catch(this.onError)
  }

  getMoviesWithRating = (page) => {
    const { guestSessionId } = this.state
    this.apiService
      .getRatedMovies(guestSessionId, page)
      .then((results) => {
        this.setState({
          ratedMovies: results.results,
          ratedMovieCurrPage: results.page,
          ratedMoviePages: results.total_pages,
        })
      })
      .catch(this.onError)
  }

  getAllGenres = () => {
    this.apiService
      .getGenres()
      .then((results) => {
        this.setState({ genres: results.genres })
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
    const { tab } = this.state
    if (tab === 'search') {
      this.setState({ searchMovieCurrPage: page })
    } else {
      this.setState({ ratedMovieCurrPage: page })
    }
  }

  onTabChange = (key) => {
    this.setState({ tab: key })
    if (key === 'rated') {
      this.getMoviesWithRating()
    }
  }

  setMovieRating = (movieId, e) => {
    const { guestSessionId } = this.state
    this.apiService
      .rateMovie(movieId, guestSessionId, e)
      .then(() => this.getMoviesWithRating())
      .catch(this.onError)
    return null
  }

  renderCards = () => {
    const {
      movies,
      isLoading,
      hasError,
      searchMovieCurrPage,
      searchMoviePages,
      ratedMovies,
      ratedMovieCurrPage,
      ratedMoviePages,
      tab,
    } = this.state
    const currentMovies = tab === 'search' ? movies : ratedMovies
    const currentCurrPage = tab === 'search' ? searchMovieCurrPage : ratedMovieCurrPage
    const currentPages = tab === 'search' ? searchMoviePages : ratedMoviePages

    if (!(isLoading || hasError || currentMovies.length === 0)) {
      return (
        <>
          <CardList ratedMovies={ratedMovies} movies={currentMovies} setMovieRating={this.setMovieRating} />
          <CustomPagination currPage={currentCurrPage} onChange={this.onPaginationChange} pages={currentPages} />
        </>
      )
    }
    return null
  }

  renderErrorMessage = () => {
    const { searchMoviePages, movies, hasError, queryString } = this.state

    if (hasError) {
      return <Error text="Failed to download movies" />
    }
    if (searchMoviePages === 0 && movies.length === 0 && queryString !== null) {
      return <Error text="No movies found" />
    }
    return null
  }

  renderContent = () => {
    const { tab, isLoading, queryString } = this.state
    const spinner = isLoading ? <Spinner /> : null

    return (
      <>
        <CustomTabs onTabChange={this.onTabChange} />
        {tab === 'search' ? <CustomInput onLabelChange={this.onLabelChange} label={queryString} /> : null}
        {this.renderErrorMessage()}
        {spinner}
        {this.renderCards()}
      </>
    )
  }

  render() {
    const { genres } = this.state
    return (
      <div className="app">
        <Online>
          <GenresProvider value={genres}>
            <div className="app__online-container">{this.renderContent()}</div>
          </GenresProvider>
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

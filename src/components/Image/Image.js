import React, { Component } from 'react'

import Spinner from '../Spinner'
import Error from '../Error'
import './Image.css'

export default class Image extends Component {
  static posterUrl = 'https://image.tmdb.org/t/p/original'

  constructor() {
    super()
    this.state = {
      isLoading: true,
      hasError: false,
    }
  }

  onImageLoaded = () => {
    this.setState({ isLoading: false })
  }

  onImageError = () => {
    this.setState({ hasError: true, isLoading: false })
  }

  render() {
    const { isLoading, hasError } = this.state
    const { path } = this.props

    return (
      <>
        <img
          className="card__image"
          src={`${Image.posterUrl}${path}`}
          alt="постер фильма"
          onLoad={this.onImageLoaded}
          onError={this.onImageError}
          style={isLoading || hasError ? { display: 'none' } : { display: 'block' }}
        />
        {isLoading && <Spinner />}
        {hasError && <Error text="Failed to download image" />}
      </>
    )
  }
}

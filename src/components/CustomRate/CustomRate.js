import React, { Component } from 'react'
import { Rate } from 'antd'

import './CustomRate.css'

export default class CustomRate extends Component {
  constructor(props) {
    super()
    this.state = {
      rating: props.rating,
    }
  }

  setRating = (id, event) => {
    const { setMovieRating } = this.props
    this.setState({ rating: event })
    setMovieRating(id, event)
  }

  render() {
    const { rating } = this.state
    const { movieId } = this.props
    return (
      <Rate
        value={rating}
        count="10"
        className="custom-rate"
        onChange={(e) => this.setRating(movieId, e)}
        allowClear={false}
      />
    )
  }
}

// import { Rate } from 'antd'
// import PropTypes from 'prop-types'

// import './CustomRate.css'

// function CustomRate({ rating, setMovieRating, movieId }) {
//   return (
//     <Rate
//       value={rating}
//       count="10"
//       className="custom-rate"
//       onChange={(e) => setMovieRating(movieId, e)}
//       allowClear={false}
//     />
//   )
// }

// CustomRate.defaultProps = {
//   rating: 0,
// }

// CustomRate.propTypes = {
//   rating: PropTypes.number,
//   setMovieRating: PropTypes.func.isRequired,
//   movieId: PropTypes.number.isRequired,
// }

// export default CustomRate

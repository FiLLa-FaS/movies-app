import { Rate } from 'antd'
import PropTypes from 'prop-types'

import './CustomRate.css'

function CustomRate({ rating, setMovieRating, movieId }) {
  return (
    <Rate
      value={rating}
      count="10"
      className="custom-rate"
      onChange={(e) => setMovieRating(movieId, e)}
      allowClear={false}
    />
  )
}

CustomRate.defaultProps = {
  rating: 0,
}

CustomRate.propTypes = {
  rating: PropTypes.number,
  setMovieRating: PropTypes.func.isRequired,
  movieId: PropTypes.number.isRequired,
}

export default CustomRate

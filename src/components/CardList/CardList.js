import PropTypes from 'prop-types'

import Card from '../Card'
import './CardList.css'

function CardList({ ratedMovies, movies, setMovieRating }) {
  const getRating = (id) => {
    const filteredMovie = ratedMovies.filter((task) => task.id === id)
    if (filteredMovie.length === 0) return null
    return filteredMovie[0].rating
  }

  return (
    <ul className="app__list cards">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Card rating={getRating(movie.id)} movie={movie} setMovieRating={setMovieRating} />
        </li>
      ))}
    </ul>
  )
}

CardList.defaultProps = {
  ratedMovies: [],
  movies: [],
}

CardList.propTypes = {
  ratedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      voteAverage: PropTypes.number,
    })
  ),
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      voteAverage: PropTypes.number,
    })
  ),
  setMovieRating: PropTypes.func.isRequired,
}

export default CardList

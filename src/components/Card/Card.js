import { parseISO, format } from 'date-fns'
import PropTypes from 'prop-types'

import cutString from '../../helpers/cutString'
import Image from '../Image'
import './Card.css'
import CustomRate from '../CustomRate'
import { GenresConsumer } from '../../genres-context'

function Card({ rating, movie, setMovieRating }) {
  const {
    id,
    title,
    release_date: releaseDate,
    overview,
    poster_path: posterPath,
    genre_ids: genreIds,
    vote_average: voteAverage,
  } = movie

  function formatDate(releaseD) {
    if (releaseD && releaseD !== '') {
      return format(parseISO(releaseD), 'MMMM d, y')
    }
    return false
  }

  function getRatingClasses(vote) {
    let modifier
    if (vote <= 3) {
      modifier = 'card__rating_type_bad'
    } else if (vote > 3 && vote <= 5) {
      modifier = 'card__rating_type_average'
    } else if (vote > 5 && vote <= 7) {
      modifier = 'card__rating_type_good'
    } else if (vote > 7) {
      modifier = 'card__rating_type_best'
    }
    return `card__rating ${modifier}`
  }

  function renderGenres(genres, movieGenresId) {
    const finalArray = []
    let croppedArray
    movieGenresId.map((movieGenreId) => {
      const resultGenre = genres.filter((genre) => genre.id === movieGenreId)
      finalArray.push(...resultGenre)
      return false
    })
    if (finalArray.length > 3) {
      croppedArray = [...finalArray.slice(0, 3)]
    } else {
      croppedArray = [...finalArray]
    }
    return (
      <ul className="card__genres">
        {croppedArray.map((item) => (
          <li key={item.id}>
            <button type="button" className="card__genre">
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="card">
      <Image path={posterPath} />
      <p className={getRatingClasses(voteAverage)}>{voteAverage}</p>
      <div className="card__column">
        <div className="card__info">
          <h2 className="card__title">{cutString(title, 37)}</h2>
          <p className="card__date">{formatDate(releaseDate)}</p>
          <GenresConsumer>{(value) => renderGenres(value, genreIds)}</GenresConsumer>
        </div>

        <p className="card__text">{cutString(overview, 198)}</p>
        <CustomRate rating={rating} setMovieRating={setMovieRating} movieId={id} />
      </div>
    </div>
  )
}

Card.defaultProps = {
  rating: 0,
  movie: {
    id: 0,
    title: 'Название фильма',
    release_date: '',
    overview: 'Описание фильма',
    poster_path: '',
    genre_ids: [],
    voteAverage: 0,
  },
}

Card.propTypes = {
  rating: PropTypes.number,
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    voteAverage: PropTypes.number,
  }),
  setMovieRating: PropTypes.func.isRequired,
}

export default Card

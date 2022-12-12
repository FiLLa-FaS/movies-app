import { parseISO, format } from 'date-fns'

import cutString from '../../helpers/cutString'
import './Card.css'

function Card({ movie }) {
  const { title, release_date: releaseDate, overview, poster_path: posterPath } = movie
  const posterUrl = 'https://image.tmdb.org/t/p/original'
  return (
    <div className="card">
      <img className="card__image" src={`${posterUrl}${posterPath}`} alt="постер фильма" />
      <div className="card__column">
        <div className="card__info">
          <h2 className="card__title">{cutString(title, 45)}</h2>
          <p className="card__date">{format(parseISO(releaseDate), 'MMMM d, y')}</p>
          <div className="card__genres">
            <button type="button" className="card__genre">
              Action
            </button>
            <button type="button" className="card__genre">
              Action
            </button>
          </div>
        </div>

        <p className="card__text">{cutString(overview, 220)}</p>
      </div>
    </div>
  )
}

export default Card

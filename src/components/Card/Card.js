import { parseISO, format } from 'date-fns'

import cutString from '../../helpers/cutString'
import Image from '../Image'
import './Card.css'

function Card({ movie }) {
  const { title, release_date: releaseDate, overview, poster_path: posterPath } = movie

  return (
    <div className="card">
      <Image path={posterPath} />
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

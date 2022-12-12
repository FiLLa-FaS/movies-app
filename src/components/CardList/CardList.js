import Card from '../Card'

import './CardList.css'

function CardList({ movies }) {
  return (
    <ul className="cards">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Card movie={movie} />
        </li>
      ))}
    </ul>
  )
}

export default CardList

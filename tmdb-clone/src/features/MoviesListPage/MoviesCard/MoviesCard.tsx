import { posterUrl } from '../../../configuration/configuration';
import defaultMovie from '../../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { MovieDiscoverDto } from './../../../models/MovieDiscoverDto';
import './moviesCard.css';
import { Link } from 'react-router-dom';
type MoviesCardProps = {
  movie: MovieDiscoverDto
}
export default function MoviesCard(props: MoviesCardProps) {
  const { movie } = props;
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="film-container" key={movie.id}>
        <img
          className='film-image'
          src={`${posterUrl}/w300/${movie.poster_path}`}
          onError={(e: any) => {
            if (e.target.src !== defaultMovie) {
              e.target.src = defaultMovie;
            }
          }}
          alt="movieImage" />
        <div className="film-heading">
          {movie.title}
        </div>
        <div className='file-voting'> {`${movie.vote_average * 10}%`}</div>
        {movie.release_date}
      </div>
    </Link>
  )
}

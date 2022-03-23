import React from 'react';
import { Link } from 'react-router-dom';
import defaultMovie from '../../assets/img/glyphicons-basic-38-picture-grey.svg';
import './accordionCard.css';
import getPosterUrl from '../../common/helpers';
import defaultPerson from '../../assets/img/defaultPerson.svg';

interface AccordionCardProps {
  id: number | string,
  poster_path?: string | null;
  title?: string;
  vote_average?: number;
  name?: string;
  character?: string;
  profile_path?: string | null;
  job?: string;
}

export default function AccordionCard(props: AccordionCardProps) {
  return (
    <div className="accordionCard" key={props.id}>
      <Link to={props.title ? `/movies/${props.id}` : `/person/${props.id}`}>
        {props.title && (
          <div
            className="accordionCard-inform"
            style={{
              backgroundImage: `url(${!props.poster_path ? defaultMovie : getPosterUrl(props.poster_path)})`,
            }}
          />
        )}
        {props.name && (
          <div
            className="accordionCard-inform"
            style={{
              backgroundImage: `url(${!props.profile_path ? defaultPerson : getPosterUrl(props.profile_path)})`,
            }}
          />
        )}
        <div className="accordionCard-name">{props.title || props.name}</div>
        <div className="accordionCard-character">
          {props.vote_average && `${Math.round(props.vote_average * 10)}%`}
          {props.character}
          {props.job}
        </div>
      </Link>
    </div>
  );
}

AccordionCard.defaultProps = {
  poster_path: null,
  vote_average: null,
  title: null,
  name: null,
  character: null,
  profile_path: null,
  job: null,
};

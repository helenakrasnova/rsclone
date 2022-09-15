import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './personPageTableItem.css';

type PersonPageTableItemProps = {
  id: number,
  release_date: string,
  vote_average: number,
  title: string,
  character?: string,
  job?: string,
};

export default function PersonPageTableItem(props: PersonPageTableItemProps) {
  return (
    <Table.Row key={props.id}>
      <Table.Cell width={1}>
        <span className="personInform-table">
          {props.release_date !== '3000-1-1' ? props.release_date?.slice(0, 4) : '—'}
        </span>
      </Table.Cell>
      <Table.Cell width={1}>
        <span className="personInform-table">
          {props.vote_average > 0 ? `${Math.round(props.vote_average * 10)}%` : '—'}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="personInform-table">
          <Link to={`/movies/${props.id}`}>
            <b className="personInform-title">{props.title}</b>
          </Link>
          <span className="personInform-character">
            {props.character && ` as ${props.character}`}
            {props.job && ` as ${props.job}`}
          </span>
        </span>
      </Table.Cell>
    </Table.Row>
  );
}

PersonPageTableItem.defaultProps = {
  job: null,
  character: null,
};

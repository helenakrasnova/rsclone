import React from "react";
import { Dropdown } from "semantic-ui-react";
import { sortOptions } from "../../../configuration/configuration";
import './moviesOrdering.css';

// type MoviesOrderingProps = {
//   total: Array<MovieDiscoverDto>
// }

export default function MoviesOrdering(
  // props: MoviesOrderingProps
) {
  return (
    <div className="moviesOrdering">
      <p className="moviesOrdering-heading">Sort</p>
      <Dropdown
        placeholder='Sort Results By'
        fluid
        selection
        options={sortOptions}
      />
    </div>
  );
}

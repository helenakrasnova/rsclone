import React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { sortOptions } from "../../../configuration/configuration";
import './moviesOrdering.css';

type MoviesOrderingProps = {
  onOrderChanged: (value: string) => void;
  selectedValue: string;
}
export default function MoviesOrdering(props: MoviesOrderingProps) {
  return (
    <div className="moviesOrdering">
      <p className="moviesOrdering-heading">Sort Results By</p>
      <Dropdown
        fluid
        selection
        value={props.selectedValue}
        options={sortOptions}
        onChange={
          (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => props.onOrderChanged(data.value as string)
        }
      />
    </div>
  );
}

import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import './preloader.css';


export default function Preloader() {
  return (
    <Segment>
      <Dimmer active>
        <Loader />
      </Dimmer>
    </Segment>
  );
}

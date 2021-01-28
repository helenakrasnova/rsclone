import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import './preloader.css';


export default function Preloader() {
  return (
    <Dimmer active >
      <Loader size='massive' />
    </Dimmer>
  );
}

import React from 'react';
import './notFound.css';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default function NotFound() {
  return (
    <div className="notFound">
      <h2>Oops! We can not find the page you are looking for.</h2>
      <p>You tried to request a page that does not exist.</p>
      <Link to="/">
        <Button className="homePage" color="blue">Home page</Button>
      </Link>
    </div>
  );
}

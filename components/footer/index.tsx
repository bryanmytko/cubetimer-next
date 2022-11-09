import React from 'react';

import './style.css';

const Footer = () => {
  return <footer className="grey darken-4">
    <div className="container center-align white-text">
      <p>&copy; 2014-{new Date().getFullYear()} &hearts; <a href="http://github.com/bryanmytko">Bryan Mytko</a>
      </p>
    </div>
  </footer>
};

export default Footer;

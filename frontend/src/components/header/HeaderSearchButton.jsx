// HeaderSearchButton.js
import React from 'react';

const HeaderSearchButton = ({ onClick }) => {
  return (
    <div className="headerSearchItem">
      <button className="headerBtn" onClick={onClick}>
        Search
      </button>
    </div>
  );
};

export default HeaderSearchButton;

// HeaderSearchInput.js
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// HeaderSearchInput.js

import React from 'react';

const HeaderSearchInput = ({ value, onChange, onClick, options }) => {
    return (
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faBed} className="headerIcon" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="headerSearchInput"
          value={value}
          onChange={onChange}
          onClick={onClick}
        />
        {options && options} {/* Render options if options is defined */}
      </div>
    );
  };

export default HeaderSearchInput;


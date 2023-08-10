// HeaderListItem.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderListItem = ({ icon, text }) => {
  return (
    <div className="headerListItem">
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </div>
  );
};

export default HeaderListItem;

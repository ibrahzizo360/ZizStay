// HeaderTitle.js
import React from 'react';

const HeaderTitle = ({ title, description }) => {
  return (
    <>
      <h1 className="headerTitle">{title}</h1>
      <p className="headerDesc">{description}</p>
    </>
  );
};

export default HeaderTitle;

// HeaderDateRange.js

import React from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const HeaderDateRange = ({ dates, onChange, toggleOpenComponent, isOpen }) => {
  return (
    <div className="headerSearchItem">
      <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
      <span
        className="headerSearchText"
        onClick={() => toggleOpenComponent('date')}
      >
        {`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
          dates[0].endDate,
          'MM/dd/yyyy'
        )} `}
      </span>
      {isOpen && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => {
            // toggleOpenComponent('date'); // Close the date range when a selection is made
            onChange([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={dates}
          className="date"
        />
      )}
    </div>
  );
};

export default HeaderDateRange;
// HeaderOptions.js
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const HeaderOptions = ({ options, handleOption, toggleOpenComponent, isOpen }) => {
  return (
    <div className="headerSearchItem">
      <FontAwesomeIcon icon={faPerson} className="headerIcon" />
      <span
        className="headerSearchText"
        onClick={() => toggleOpenComponent('options')}
      >{`${options.adult} adult . ${options.children} children . ${options.rooms} rooms`}</span>
      {isOpen && (
        <div className="options">
          <div className="optionItem">
            <span className="optionText">Adults</span>
            <div className="optionCounter">
                <button
                className="optionCounterBtn"
                disabled={options.adult <= 1}
                onClick={() =>
                    handleOption('adult', 'd')
                }
                >
                -
                </button>
                <span className="optionCounterNumber">
                {options.adult}
                </span>
                <button
                className="optionCounterBtn"
                onClick={() =>
                    handleOption('adult', 'i')
                }
                >
                +
                </button>
            </div>
            </div>
            <div className="optionItem">
            <span className="optionText">
                Children
            </span>
            <div className="optionCounter">
                <button
                className="optionCounterBtn"
                disabled={options.children <= 0}
                onClick={() =>
                    handleOption('children', 'd')
                }
                >
                -
                </button>
                <span className="optionCounterNumber">
                {options.children}
                </span>
                <button
                className="optionCounterBtn"
                onClick={() =>
                    handleOption('children', 'i')
                }
                >
                +
                </button>
            </div>
            </div>
            <div className="optionItem">
            <span className="optionText">Rooms</span>
            <div className="optionCounter">
                <button
                className="optionCounterBtn"
                disabled={options.rooms <= 1}
                onClick={() =>
                    handleOption('rooms', 'd')
                }
                >
                -
                </button>
                <span className="optionCounterNumber">
                {options.rooms}
                </span>
                <button
                className="optionCounterBtn"
                onClick={() =>
                    handleOption('rooms', 'i')
                }
                >
                +
                </button>
            </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default HeaderOptions;

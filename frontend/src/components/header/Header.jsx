import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { useContext, useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { getHotelCities } from '../../utils/hotel';

const Header = ({ type }) => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: 'selection',
    },
  ]);
  const [destination, setDestination] = useState('');
  const [openComponent, setOpenComponent] = useState(null);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    rooms: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const toggleOpenComponent = (component) => {
    if (openComponent === component) {
      setOpenComponent(null); // Close the same component if already open
    } else {
      setOpenComponent(component); // Open the clicked component
    }
  };

  const handleClickOutside = (event) => {
    if (
      openComponent &&
      !event.target.closest('.headerSearchItem') &&
      !event.target.closest('.date') &&
      !event.target.closest('.options')
    ) {
      setOpenComponent(null);
    }
  };

  useEffect(() => {
    const fetchDestinationOptions = async () => {
      try {
        const data = await getHotelCities(destination); // Await the result of the async function
        setDestinationOptions(data.hotelCities);
      } catch (error) {
        console.error('Error fetching destination options:', error);
      }
    };

    if (destination && openComponent === 'destination') {
      fetchDestinationOptions();
    }
  }, [destination, openComponent]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openComponent]);

  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch({
      type: 'NEW_SEARCH',
      payload: { destination, dates, options },
    });
    navigate('/hotels', { state: { destination, dates, options } });
  };

  return (
    <>
      <div className="header">
        <div
          className={
            type === 'list'
              ? 'headerContainer listMode'
              : 'headerContainer'
          }
        >
          <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faBed} />
              <span>stays</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport Taxis</span>
            </div>
          </div>
          {type !== 'list' && (
            <>
              <h1 className="headerTitle">
                A lifetime of discount? It's genius
              </h1>
              <p className="headerDesc">
                Search deals on hotels, homes, and much more...
              </p>
              <div className="headerSearch">
                <div className="headerSearchItem">
                  <FontAwesomeIcon
                    icon={faBed}
                    className="headerIcon"
                  />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="headerSearchInput"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      toggleOpenComponent('destination');
                    }}
                  />
                  {openComponent === 'destination' &&
                    destinationOptions.length > 0 && (
                      <div className="destinationOptionsModal">
                        {destinationOptions.map((option) => (
                          <div
                            key={option}
                            className="destinationOption"
                            onClick={() => {
                              setDestination(option);
                              setOpenComponent(null);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="headerIcon"
                    onClick={() => toggleOpenComponent('date')}
                  />
                  <span
                    className="headerSearchText"
                    onClick={() => toggleOpenComponent('date')}
                  >
                    {`${format(
                      dates[0].startDate,
                      'MM/dd/yyyy'
                    )} to ${format(
                      dates[0].endDate,
                      'MM/dd/yyyy'
                    )} `}
                  </span>
                  {openComponent === 'date' && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) =>
                        setDates([item.selection])
                      }
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                    />
                  )}
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon
                    icon={faPerson}
                    className="headerIcon"
                    onClick={() => toggleOpenComponent('options')}
                  />
                  <span
                    className="headerSearchText"
                    onClick={() => toggleOpenComponent('options')}
                  >{`${options.adult} adult . ${options.children} children . ${options.rooms} rooms`}</span>
                  {openComponent === 'options' && (
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
                <div className="headerSearchItem">
                  <button
                    className="headerBtn"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

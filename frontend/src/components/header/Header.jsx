// Header.js
import React, { useState, useEffect, useContext } from 'react';
import HeaderListItem from './HeaderListItem';
import HeaderTitle from './HeaderTitle';
import HeaderSearchInput from './HeaderSearchInput';
import HeaderDateRange from './HeaderDateRange';
import HeaderOptions from './HeaderOptions';
import HeaderSearchButton from './HeaderSearchButton';
import { SearchContext } from '../../context/SearchContext';
import { getHotelCities } from '../../utils/hotel';
import { useNavigate } from 'react-router-dom';
import { faBed, faCar, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import './header.css'

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
  const [showDestinationOptions, setShowDestinationOptions] = useState(false);
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
        const data = await getHotelCities(destination);
        setDestinationOptions(data.hotelCities);
      } catch (error) {
        console.error('Error fetching destination options:', error);
      }
    };

    if (destination && showDestinationOptions) {
      fetchDestinationOptions();
    }
  }, [destination, showDestinationOptions]);

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
        <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
          <div className="headerList">
            <HeaderListItem icon={faBed} text="stays" />
            <HeaderListItem icon={faPlane} text="Flights" />
            <HeaderListItem icon={faCar} text="Car rentals" />
            <HeaderListItem icon={faBed} text="Attractions" />
            <HeaderListItem icon={faTaxi} text="Airport Taxis" />
          </div>
          {type !== 'list' && (
            <>
              <HeaderTitle
                title="A lifetime of discount? It's genius"
                description="Search deals on hotels, homes, and much more..."
              />
              <div className="headerSearch">
                <HeaderSearchInput
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    toggleOpenComponent('destination');
                  }}
                  onClick={() => setShowDestinationOptions(true)}
                  options={
                    openComponent === 'destination' &&
                    destinationOptions.length > 0 && (
                      <div className="destinationOptionsModal">
                        {destinationOptions.map((option) => (
                          <div
                            key={option}
                            className="destinationOption"
                            onClick={() => {
                              setDestination(option);
                              setShowDestinationOptions(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )
                  }
                />
                <HeaderDateRange
                  dates={dates}
                  onChange={setDates}
                  toggleOpenComponent={toggleOpenComponent}
                  isOpen={openComponent === 'date'}
                />
                <HeaderOptions
                  options={options}
                  handleOption={handleOption}
                  toggleOpenComponent={toggleOpenComponent}
                  isOpen={openComponent === 'options'}
                />
                <HeaderSearchButton onClick={handleSearch} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
